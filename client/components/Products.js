import {withFirebase} from './firebase'
import React, {useState, useEffect} from 'react'
import ProductGridItem from './ProductGridItem'
import {Link} from 'react-router-dom'

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

  const onRequest = id => {
    // fetch()
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
