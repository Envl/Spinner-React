import React, {useState, useEffect} from 'react'
import {CurrentUserGlobal} from '../store'
import {withFirebase, RequireLogin} from './firebase'
import {ROUTES, TRANSAC_API} from '../constants'
import {FirebaseDataGlobal} from '../store'

const HistoryMsg = ({msg, myUid, firebase}) => {
  const [showOptions, setShowOptions] = useState(true)
  const [status, SetStatus] = useState(msg.status)
  const {setPoints} = CurrentUserGlobal.useContainer()

  const setTransacStatus = status => {
    const {
      provider: {points: providerPoints},
      providerId,
      item: {price, id: itemId},
      id,
      consumerId,
      consumer: {points: consumerPoints}
    } = msg
    setShowOptions(false)
    switch (status) {
      case 'accepted':
        console.log(
          firebase.transaction(id).update({status}) instanceof Promise
        )
        Promise.all([
          firebase.transaction(id).update({status}),
          firebase.user(providerId).update({
            points: providerPoints + price
          }),
          firebase.item(itemId).delete()
        ])
          .then(() => {
            setPoints(providerPoints + price)
            SetStatus(status)
          })
          .catch(error => {
            alert('please try again')
            setShowOptions(true)
            console.log(error)
          })
        break
      case 'declined':
        console.log(
          firebase.transaction(id).update({status}) instanceof Promise
        )
        Promise.all([
          firebase.transaction(id).update({status}),
          firebase.user(consumerId).update({
            points: consumerPoints + price
          })
        ])
          .then(() => {
            SetStatus(status)
          })
          .catch(error => {
            alert('please try again')
            setShowOptions(true)
            console.log(error)
          })
        break
      default:
        console.log('unknown ')
        break
    }
  }

  return (
    <div className="msg-item" key={msg.id}>
      <img src={msg.item.photoUrls && msg.item.photoUrls[0]} alt="" />
      <div className="info">
        <h3>{msg.item.title}</h3>
        <div className="status">{status}</div>
        <div className="people">
          {status === 'accepted' &&
            (myUid !== msg.consumerId ? (
              <a href={`mailto:${msg.consumer.email}`}>{msg.consumer.email}</a>
            ) : (
              <a href={`mailto:${msg.provider.email}`}>{msg.provider.email}</a>
            ))}
        </div>
        {//-----Operation Btns ---------------
        myUid === msg.providerId && msg.status === 'waiting' && showOptions && (
          <div className="operation">
            <button
              className="btn btn-yes"
              onClick={() => setTransacStatus('accepted')}>
              Accept
            </button>
            <button
              className="btn btn-no"
              onClick={() => setTransacStatus('declined')}>
              Decline
            </button>
          </div>
        )
        //---------------------------
        }
      </div>
    </div>
  )
}

const HistoryPage = props => {
  // const [firebaseMounted, setMounted] = useState(false)
  // const [msgs, setMsgs] = useState([])
  const {FirebaseData, setFirebaseData} = FirebaseDataGlobal.useContainer()
  console.log('HistoryPage rendered')

  useEffect(() => {
    props.firebase
      .user(props.firebase.auth.currentUser.uid)
      .get()
      .then(doc =>
        Promise.all(
          doc.data().transactions.map(t => props.firebase.transaction(t).get())
        )
      )
      .then(transacs => {
        // debugger
        console.log(transacs)
        const processedTransacs = transacs
          .filter(t => t.data())
          .map(tt => {
            return {...tt.data(), id: tt.id}
          })
        // setMsgs(processedTransacs)
        setFirebaseData({histories: processedTransacs})
      })
  }, [])

  return (
    <div className="history-page">
      {FirebaseData &&
        FirebaseData.histories &&
        FirebaseData.histories
          //  msgs.
          .map(msg => (
            <HistoryMsg
              msg={msg}
              key={msg.id}
              myUid={props.firebase.auth.currentUser.uid}
              firebase={props.firebase}
            />
          ))}
    </div>
  )
}

export default RequireLogin(HistoryPage)
