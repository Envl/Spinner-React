import React from 'react'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '../../config'

class Firebase {
  constructor() {
    app.initializeApp(config)
    console.log(app, 'ddd')

    this.auth = app.auth()
    this.db = app.firestore()
    this.storage = app.storage
  }
}

const FirebaseContext = React.createContext(null)
const withFirebase = Component => props => (
  <FirebaseContext.Consumer>{firebase => <Component {...props} firebase={firebase} />}</FirebaseContext.Consumer>
)

export { Firebase, FirebaseContext, withFirebase }
