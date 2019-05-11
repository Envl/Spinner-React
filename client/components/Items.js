import { withFirebase } from './firebase'
import React, { useState, useEffect } from 'react'
import ItemGrid from './ItemGrid'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants'

const Items = props => {
  const [items, setItems] = useState([])
  useEffect(() => {
    props.firebase.db
      .collection('items')
      .get()
      .then(rsl => {
        let itemArr = []
        rsl.forEach(e => {
          itemArr.push(Object.assign(e.data(), { id: e.id }))
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
    <div className='product-page'>
      <Link to={ROUTES.upload}>
        <button> Upload New Item </button>
      </Link>
      {items.map(item => (
        <ItemGrid item={item} key={item.id} onRequest={onRequest} />
      ))}
    </div>
  )
}

export default withFirebase(Items)
