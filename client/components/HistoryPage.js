import {withFirebase} from './firebase'
import React, {useState, useEffect} from 'react'
import {ROUTES, TRANSAC_API} from '../constants'

const HistoryPage = props => {
  const [msgs, setMsgs] = useState([])
  useEffect(() => {
    props.firebase.db
      .collection('transactions')
      .get()
      .then(rsl => {
        let msgs = []
        rsl.forEach(e => msgs.push({...e.data(), id: e.id}))
        setMsgs(msgs)
      })
  }, [])
  console.log(msgs)

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
                    onClick={() => {
                      console.log('acc', msg)

                      props.firebase
                        .transaction(msg.id)
                        .update({status: 'accepted'})
                    }}>
                    Accept
                  </button>
                  <button
                    className="btn btn-no"
                    onClick={() =>
                      props.firebase
                        .transaction(msg.id)
                        .update({status: 'declined'})
                    }>
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

export default withFirebase(HistoryPage)
