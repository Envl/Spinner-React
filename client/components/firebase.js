import React from 'react'
import {Redirect} from 'react-router-dom'
import _app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '../../config'
import {ROUTES} from '../constants'

let fb = {}
// init
_app.initializeApp(config)
_app.auth().onAuthStateChanged(authUser => {
  fb.currentUser = authUser
  if (!authUser) {
    return
  }
  localStorage.setItem('currentUser', JSON.stringify(authUser))
  fb.user(authUser.uid)
    .get()
    .then(doc => {
      fb.myProfile = {
        ...doc.data(),
        emailVerified: authUser.emailVerified,
        displayName: authUser.displayName,
        photoURL: authUser.photoURL
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

const googleAuthProvider = new _app.auth.GoogleAuthProvider()

// returns a promise
fb.authWithGoogle = () => _app.auth().signInWithPopup(googleAuthProvider)

console.log('eeeeeevvvvvvvn', process.env.NODE_ENV)

fb.currentUser = JSON.parse(localStorage.getItem('currentUser'))

const withFirebase = Component => props => (
  <Component {...props} firebase={fb} />
)

const RequireLogin = Component => props => {
  console.log('in require login', fb, fb.currentUser)
  return fb.currentUser ? (
    <Component firebase={fb} {...props} />
  ) : (
    <Redirect to={{pathname: ROUTES.signup}} />
  )
}

export {withFirebase, RequireLogin}
