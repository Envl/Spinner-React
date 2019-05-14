import React from 'react'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '../../config'

class Firebase {
  constructor() {
    app.initializeApp(config)

    this.attachAuth = this.attachAuth.bind(this)

    this.app = app
    this.auth = app.auth()
    this.db = app.firestore()
    this.storage = app.storage
    this.user = uid => app.firestore().doc(`users/${uid}`)
    this.transaction = id => app.firestore().doc(`transactions/${id}`)

    const usr = JSON.parse(localStorage.getItem('currentUser'))
    if (usr) {
      this.currentUser = usr
    }
    app.auth().onAuthStateChanged(authUser => {
      if (!authUser) {
        return
      }
      localStorage.setItem('currentUser', JSON.stringify(authUser))
      this.attachAuth(authUser)
      this.user(authUser.uid)
        .get()
        .then(doc => {
          this.myProfile = {
            ...doc.data(),
            emailVerified: authUser.emailVerified,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL
          }
          console.log(this.myProfile, 'ssss', authUser)
        })
    })
  }

  attachAuth(authUser) {
    this.currentUser = authUser
  }
}

const firebase = new Firebase()
const withFirebase = Component => props => (
  <Component {...props} firebase={firebase} />
)

export {Firebase, withFirebase}
