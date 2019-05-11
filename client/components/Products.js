import { withFirebase } from './firebase'
import React, { useState, useEffect } from 'react'
import ProductGridItem from './ProductGridItem'
// import { Link } from 'react-router-dom'

const Products = props => {
  const [items, setItems] = useState([])
  useEffect(() => {
    props.firebase.db
      .collection('items')
      .get()
      .then(rsl => {
        let itemArr = []
        rsl.forEach(e => {
          itemArr.push(e.data())
        })
        setItems(itemArr)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return items.map(item => <ProductGridItem item={item} key={Math.random()} />)
}

export default withFirebase(Products)
