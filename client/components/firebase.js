import React from 'react'
import _app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '../../config'
// import { CurrentUserGlobal } from '../store'

// const { currentUser, setCurrentUser } = CurrentUserGlobal.useContainer()

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
fb.user = uid => _app.firestore().doc(`users/${uid}`)
fb.transaction = id => _app.firestore().doc(`transactions/${id}`)

const googleAuthProvider = new _app.auth.GoogleAuthProvider()

// returns a promise
fb.authWithGoogle = () => _app.auth().signInWithPopup(googleAuthProvider)

const localUsr = JSON.parse(localStorage.getItem('currentUser'))
if (localUsr) {
  fb.currentUser = localUsr
}
console.log('eeeeeevvvvvvvn', process.env.NODE_ENV)

const withFirebase = Component => props => <Component {...props} firebase={fb} />
const RequireLogin = Component => props =>
  props.firebase && props.firebase.currentUser ? Component : <Redirect to={{ pathname: ROUTES.signup }} />

export { withFirebase, RequireLogin }
