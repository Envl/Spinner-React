import {withFirebase} from './firebase'
import React, {useState, useEffect} from 'react'
import ProductGridItem from './ItemGrid'
import {Link} from 'react-router-dom'
import {TRANSAC_API, ROUTES} from '../constants'

const Products = props => {
  const [items, setItems] = useState([])
  useEffect(() => {
    props.firebase.db
      .collection('items')
      .get()
      .then(rsl => {
        let itemArr = []
        rsl.forEach(e => {
          itemArr.push(Object.assign(e.data(), {id: e.id}))
        })
        setItems(itemArr)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const onRequest = item => {
    if (!props.firebase.currentUser) {
      props.history.push(ROUTES.signup)
      return
    }
    fetch(TRANSAC_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        consumerId: props.firebase.currentUser.uid,
        providerId: '',
        itemId: item.id,
        item,
        status: 'waiting',
        timestamp: Date.now()
      })
    })
      .then(rst => {
        console.log('result', rst)
        if (rst.ok) {
          console.log('success', rst.id)
          return rst.json()
        }
      })
      .then(data => {
        console.log(data)
        // props.firebase.user()
      })
      .catch(err => console.log('failed', err))
  }

  return (
    <div className="product-page">
      {items.map(item => (
        <ProductGridItem item={item} key={item.id} onRequest={onRequest} />
      ))}
    </div>
  )
}

export default withFirebase(Products)
