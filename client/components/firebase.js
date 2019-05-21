import React from 'react'
import { Redirect } from 'react-router-dom'
import _app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '../../config'
import { ROUTES } from '../constants'
import { CurrentUserGlobal } from '../store'

let fb = {}
// init
_app.initializeApp(config)
_app.auth().onAuthStateChanged(authUser => {
  localStorage.setItem('currentUser', JSON.stringify(authUser))
  authUser &&
    fb
      .user(authUser.uid)
      .get()
      .then(doc => {
        fb.myProfile = {
          ...doc.data(),
          emailVerified: authUser.emailVerified,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL,
        }
        console.log(fb.myProfile, 'ssss', authUser)
      })
})
// shortcuts
fb.app = _app
_app.auth().languageCode = 'en'
fb.auth = _app.auth()
fb.fs = _app.firestore()
fb.storage = _app.storage
fb.user = uid => fb.fs.collection('users').doc(uid)
fb.transaction = id => _app.firestore().doc(`transactions/${id}`)
fb.allItem = id => fb.fs.doc(`allItems/${id}`)
fb.item = id => fb.fs.doc(`items/${id}`)

const googleAuthProvider = new _app.auth.GoogleAuthProvider()

// returns a promise
fb.authWithGoogle = () => _app.auth().signInWithPopup(googleAuthProvider)

console.log('eeeeeevvvvvvvn', process.env.NODE_ENV)

const withFirebase = Component => props => <Component {...props} firebase={fb} />

const RequireLogin = Component => props => {
  const { currentUser, setCurrentUser } = CurrentUserGlobal.useContainer()

  console.log('in require login', currentUser)
  return currentUser || JSON.parse(localStorage.getItem('currentUser')) ? (
    currentUser ? (
      <Component firebase={fb} {...props} />
    ) : (
      'Loading '
    )
  ) : (
    <Redirect to={{ pathname: ROUTES.signup }} />
  )
}

export { withFirebase, RequireLogin }
