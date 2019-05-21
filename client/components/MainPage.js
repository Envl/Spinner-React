import { withFirebase, RequireLogin } from './firebase'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { responseHandler } from '../utilities'
import { ROUTES, TRANSAC_API } from '../constants'
import Items from './Items'

const MainPage = props => {
  const [items, setItems] = useState([])
  useEffect(() => {
    props.firebase.fs
      .collection('items')
      .get()
      .then(rsl => {
        let itemArr = []
        rsl.forEach(e => itemArr.push({ ...e.data(), id: e.id }))
        setItems(itemArr)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const onRequest = item => {
    if (!props.firebase.auth.currentUser) {
      props.history.push(ROUTES.signup)
      return
    }
    Promise.all([
      props.firebase
        .user(props.firebase.auth.currentUser.uid)
        .get()
        .then(doc => doc.data()),
      props.firebase
        .user(item.ownerId)
        .get()
        .then(doc => doc.data()),
    ]).then(users => {
      console.log('usrs', users)

      fetch(TRANSAC_API + '?id=' + item.id + props.firebase.auth.currentUser.uid, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consumerId: props.firebase.auth.currentUser.uid,
          consumer: users[0], //current user
          providerId: item.ownerId,
          provider: users[1], // owner
          itemId: item.id,
          item,
          status: 'waiting',
          timestamp: Date.now(),
        }),
      })
        .then(responseHandler)
        .then(data => {
          console.log(data)
          console.log('me', props.firebase.auth.currentUser.uid, 'you', item.ownerId)

          props.firebase.user(props.firebase.auth.currentUser.uid).update({
            transactions: props.firebase.app.firestore.FieldValue.arrayUnion(
              item.id + props.firebase.auth.currentUser.uid,
            ),
            points: users[0].points - item.price,
          })

          props.firebase.user(item.ownerId).update({
            transactions: props.firebase.app.firestore.FieldValue.arrayUnion(
              item.id + props.firebase.auth.currentUser.uid,
            ),
          })
        })
        .catch(err => console.log('failed', err))
    })
  }

  return (
    <div className='product-page'>
      <Items items={items} onRequest={onRequest} />
    </div>
  )
}

export default withFirebase(MainPage)
