import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import {withFirebase, RequireLogin} from './firebase'
import {CurrentUserGlobal} from '../store'
import {responseHandler} from '../utilities'
import {ROUTES, TRANSAC_API} from '../constants'
import Items from './Items'

const MainPage = props => {
  const [items, setItems] = useState([])
  // const {FirebaseData, setFirebaseData} = FirebaseDataGlobal.useContainer()
  const {currentUser, setPoints} = CurrentUserGlobal.useContainer()

  useEffect(() => {
    let myTrscIds = []
    let itms = []
    console.log('@##@', currentUser)

    if (currentUser) {
      console.log('***********')
      Promise.all([
        props.firebase.fs
          .collection('transactions')
          .where('consumerId', '==', props.firebase.auth.currentUser.uid)
          .get(),
        props.firebase.fs.collection('items').get(),
      ]).then(([snapshot1, snapshot2]) => {
        snapshot1.forEach(doc => {
          myTrscIds.push(doc.data().itemId)
        })
        snapshot2.forEach(e => itms.push({...e.data(), id: e.id}))
        itms.forEach(item => {
          if (myTrscIds.includes(item.id)) {
            item.btnState = 'requested'
          } else {
            item.btnState = 'request'
          }
        })
        console.log(itms)
        setItems(itms)
      })
    } else {
      props.firebase.fs
        .collection('items')
        .get()
        .then(rsl => {
          let itemArr = []
          rsl.forEach(e => itemArr.push({...e.data(), id: e.id}))
          setItems(itemArr)
        })
    }
  }, [currentUser])

  async function onRequest(item) {
    let flag = false
    if (!props.firebase.auth.currentUser) {
      console.log(',,,,,,,,,,,,,,,,,')

      props.history.push(ROUTES.signup)
      return flag
    }
    console.log('................')

    await Promise.all([
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
      if (
        !users[0].transactions
          .map(transac => transac.substring(0, 20))
          .includes(item.id)
      ) {
        console.log('yyyyyyyyyyyyyy', users[0])

        fetch(
          TRANSAC_API + '?id=' + item.id + props.firebase.auth.currentUser.uid,
          {
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
          },
        )
          .then(responseHandler)
          .then(data => {
            console.log(data)
            console.log(
              'me',
              props.firebase.auth.currentUser.uid,
              'you',
              item.ownerId,
            )
            setPoints(users[0].points - item.price)
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
        flag = true
      } else {
      }
    })
    return flag
  }

  return (
    <div className='product-page'>
      <Items items={items} onRequest={onRequest} />
    </div>
  )
}

export default withFirebase(MainPage)
