import React, { useState } from 'react'
import { withFirebase } from './firebase'
import { ROUTES } from '../constants'

const SignUp = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //   const [username, setUsername] = useState('')
  const [valid, setValid] = useState(false)

  const { firebase, history } = props

  // const validateEmail = () => /\w+@(\w\.)+\w+/.test(email)

  const handleSignUpSubmit = () => {
    firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser =>
        firebase.user(authUser.user.uid).set(
          {
            email,
            // username: username,
            id: authUser.user.uid,
            transactions: [],
            items: [],
          },
          { merge: true },
        ),
      )
      .then(() => {
        history.push(ROUTES.items)
      })
      .catch(error => {
        console.log(`${error.message}`)
      })
  }

  const handleInput = type => event => {
    switch (type) {
      case 'email':
        setEmail(event.target.value)
        break
      case 'password':
        setPassword(event.target.value)
    }
  }

  const handleSignInSubmit = type => event => {
    switch (type) {
      case 'email':
        firebase.auth
          .signInWithEmailAndPassword(email, password)
          .catch(({ code, message }) => {
            alert(code, message)
          })
          .then(res => {
            console.log('login', res)
            history.push(ROUTES.items)
          })
        break
      case 'google':
        firebase
          .authWithGoogle()
          .then(res => {
            console.log(res)
            history.push(ROUTES.items)
          })
          .catch(error => {
            console.log(error)
          })
        break
    }
  }

  return (
    <div className='sign-up-form-group'>
      <label htmlFor='email'>Email </label>
      <input
        id='register-email-input'
        type='text'
        name='email'
        value={email}
        required
        placeholder='Email: *'
        onChange={handleInput('email')}
      />
      {/* <label htmlFor='password'>Username</label>
      <input
        id='register-username-input'
        type='text'
        name='username'
        value={username}
        placeholder='Username'
        onChange={event => {
          event.preventDefault()
          setUsername(event.target.value)
        }}
      /> */}
      <label htmlFor='password'>Password</label>
      <input
        id='register-password-input'
        name='password'
        type='password'
        value={password}
        required
        placeholder='Password'
        onChange={handleInput('password')}
      />
      <button type='submit' className='btn-signup btn' onClick={handleSignUpSubmit}>
        Sign up now
      </button>
      <button type='submit' className='btn-signin btn' onClick={handleSignInSubmit('email')}>
        Sign In
      </button>
      <button onClick={handleSignInSubmit('google')}>Or sign in with Google</button>
    </div>
  )
}

export default withFirebase(SignUp)
