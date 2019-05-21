import React, {useState, useEffect} from 'react'

import {withFirebase, RequireLogin} from './firebase'
import {ROUTES, TRANSAC_API} from '../constants'
import {FirebaseDataGlobal} from '../store'

const HistoryMsg = ({msg, myUid, firebase}) => {
  const [showOptions, setShowOptions] = useState(true)
  const [status, SetStatus] = useState(msg.status)

  const setTransacStatus = status => {
    console.log(status, msg)
    SetStatus(status)
    setShowOptions(false)
    firebase.transaction(msg.id).update({status: status})
    // msgs.filter(msg=>)
  }
  return (
    <div className="msg-item" key={msg.id}>
      <img src={msg.item.photoUrls && msg.item.photoUrls[0]} alt="" />
      <div className="info">
        <h3>{msg.item.title}</h3>
        <div className="status">{status}</div>
        <div className="people">
          {myUid !== msg.consumerId ? msg.consumer.email : msg.provider.email}
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
  const [firebaseMounted, setMounted] = useState(false)
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
              myUid={props.firebase.auth.currentUser.uid}
              firebase={props.firebase}
            />
          ))}
    </div>
  )
}

export default RequireLogin(HistoryPage)
