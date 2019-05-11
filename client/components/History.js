import { withFirebase } from './firebase'
import React, { useState, useEffect } from 'react'

const History = props => {
  const [msgs, setMsgs] = useState([])
  useEffect(() => {
    props.firebase.db
      .collection('items')
      .get()
      .then(rsl => {
        let msgs = []
        rsl.forEach(e => {
          msgs.push(e.data())
        })
        return msgs
      })
      .then(msgs => setMsgs(msgs))
  }, [])
  console.log(msgs)

  return 'hi'
}

export default withFirebase(History)
