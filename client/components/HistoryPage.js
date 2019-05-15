import React, {useState, useEffect} from 'react'

import {withFirebase, RequireLogin} from './firebase'
import {ROUTES, TRANSAC_API} from '../constants'

const HistoryPage = props => {
  const [firebaseMounted, setMounted] = useState(false)

  const [msgs, setMsgs] = useState([])
  useEffect(() => {
    console.log('before', props.firebase.currentUser)
    console.log('props', props)
    props.firebase
      .user(props.firebase.currentUser.uid)
      .get()
      .then(doc =>
        Promise.all(
          doc.data().transactions.map(t => props.firebase.transaction(t).get())
        )
      )
      .then(transacs => {
        setMsgs(
          transacs
            .filter(t => t.data())
            .map(tt => {
              return {...tt.data(), id: tt.id}
            })
        )
      })
  }, [])

  const setTransacStatus = status => {
    console.log(status, msg)

    props.firebase.transaction(msg.id).update({status: status})
    // msgs.filter(msg=>)
  }

  return (
    <div className="history-page">
      {msgs.map(msg => (
        <div className="msg-item" key={msg.id}>
          <img src={msg.item.photoUrls && msg.item.photoUrls[0]} alt="" />
          <div className="info">
            <h3>{msg.item.title}</h3>
            <div className="status">{msg.status}</div>
            <div className="people">
              {props.firebase.currentUser.uid !== msg.consumerId
                ? msg.consumer.email
                : msg.provider.email}
            </div>
            {//-----Operation Btns ---------------
            props.firebase.currentUser.uid === msg.providerId &&
              msg.status === 'waiting' && (
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
      ))}
    </div>
  )
}

export default RequireLogin(HistoryPage)
