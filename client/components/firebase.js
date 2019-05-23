import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import _app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '../../config'
import {ROUTES} from '../constants'
import {CurrentUserGlobal} from '../store'

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
fb.item = id => fb.fs.collection('items').doc(id)
fb.allItem = id => fb.fs.collection('allItems').doc(id)
fb.transaction = id => _app.firestore().doc(`transactions/${id}`)
fb.allItem = id => fb.fs.doc(`allItems/${id}`)
fb.item = id => fb.fs.doc(`items/${id}`)

const googleAuthProvider = new _app.auth.GoogleAuthProvider()

// returns a promise
fb.authWithGoogle = () => _app.auth().signInWithPopup(googleAuthProvider)

console.log('eeeeeevvvvvvvn', process.env.NODE_ENV)

const withFirebase = Component => props => (
  <Component {...props} firebase={fb} />
)

const RequireLogin = (Component, dest = ROUTES.signup) => props => {
  const {currentUser, setCurrentUser} = CurrentUserGlobal.useContainer()
  const [sendEmailText, setText] = useState('Resend verification link')
  console.log('in require login', currentUser)
  if (currentUser || JSON.parse(localStorage.getItem('currentUser'))) {
    if (currentUser) {
      if (currentUser.emailVerified) {
        return <Component firebase={fb} {...props} />
      } else {
        return (
          <div className='verify'>
            Please verify your email first
            <button
              className='btn'
              onClick={() => {
                console.log(fb.auth, fb.auth.currentUser)

                fb.auth.currentUser.sendEmailVerification({
                  url: `https://ehiver.netlify.com`,
                })
                setText('Email sent, check your inbox.')
              }}>
              {sendEmailText}
            </button>
          </div>
        )
      }
    } else {
      return <div>Loading</div>
    }
  } else {
    return <Redirect to={{pathname: dest}} />
  }
}

export {withFirebase, RequireLogin}
