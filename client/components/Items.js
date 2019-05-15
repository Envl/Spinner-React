import {withFirebase, RequireLogin} from './firebase'
import React, {useState, useEffect} from 'react'
import ItemGrid from './ItemGrid'
import {Link} from 'react-router-dom'
import {ROUTES, TRANSAC_API} from '../constants'

const Items = props => {
  const [items, setItems] = useState([])
  useEffect(() => {
    props.firebase.fs
      .collection('items')
      .get()
      .then(rsl => {
        let itemArr = []
        rsl.forEach(e => itemArr.push({...e.data(), id: e.id}))
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
    Promise.all([
      props.firebase
        .user(props.firebase.currentUser.uid)
        .get()
        .then(doc => doc.data()),
      props.firebase
        .user(item.ownerId)
        .get()
        .then(doc => doc.data())
    ]).then(users => {
      console.log('usrs', users)

      fetch(TRANSAC_API + '?id=' + item.id + props.firebase.currentUser.uid, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          consumerId: props.firebase.currentUser.uid,
          consumer: users[0],
          providerId: item.ownerId,
          provider: users[1],
          itemId: item.id,
          item,
          status: 'waiting',
          timestamp: Date.now()
        })
      })
        .then(rst => {
          if (rst.ok) {
            return rst.json()
          }
        })
        .then(data => {
          console.log(data)
        })
        .catch(err => console.log('failed', err))
      console.log('me', props.firebase.currentUser.uid, 'you', item.ownerId)

      props.firebase.user(props.firebase.currentUser.uid).update({
        transactions: props.firebase.app.firestore.FieldValue.arrayUnion(
          item.id + props.firebase.currentUser.uid
        )
      })
      props.firebase.user(item.ownerId).update({
        transactions: props.firebase.app.firestore.FieldValue.arrayUnion(
          item.id + props.firebase.currentUser.uid
        )
      })
    })
  }

  return (
    <div className="product-page">
      {items.map(item => {
        console.log('item', item)

        return <ItemGrid item={item} key={item.id} onRequest={onRequest} />
      })}
      {[1, 2, 3, 4].map(() => (
        <div className="zero-height product-item" key={Math.random()} />
      ))}
      <a href="/upload" className="btn btn-add">
        Upload
      </a>
    </div>
  )
}

export default withFirebase(Items)
