import React from 'react'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '../../config'

class Firebase {
  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
    const usr = JSON.parse(localStorage.getItem('currentUser'))
    if (usr) {
      this.currentUser = usr
    }
    app.auth().onAuthStateChanged(authUser => {
      localStorage.setItem('currentUser', JSON.stringify(authUser))
      this.attachAuth(authUser)
      console.log(authUser)
    })

    this.db = app.firestore()
    this.storage = app.storage
    this.attachAuth = this.attachAuth.bind(this)
  }

  attachAuth(authUser) {
    this.currentUser = authUser
  }
}

const FirebaseContext = React.createContext(null)
const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export {Firebase, FirebaseContext, withFirebase}
