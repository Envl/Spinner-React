import React, { useState } from 'react'
import { withFirebase } from './firebase'
import { responseHandler } from '../utilities'
import { AUTH_API } from '../constants'
import { ROUTES } from '../constants'

const SignUp = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { firebase, history } = props
  const handleSignUpSubmit = () => {
    fetch(AUTH_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(responseHandler)
      .then(() => {
        firebase.auth.createUserWithEmailAndPassword(email, password)
        console.log('ok')
      })
      .catch(error => {
        console.log(`${error.message}`)
      })
  }

  const handleSignInSubmit = () => {
    firebase.auth
      .signInWithEmailAndPassword(email, password)
      .catch(({ code, message }) => {
        alert(code, message)
      })
      .then(res => {
        console.log(res)
        // history.push('/products')
        history.push(ROUTES.items)
      })
  }

  return (
    <div className='sign-up-form-group'>
      <input
        id='register-email-input'
        type='text'
        value={email}
        className='form-control'
        placeholder='Email: *'
        onChange={event => {
          event.preventDefault()
          setEmail(event.target.value)
        }}
      />
      <input
        id='register-password-input'
        type='password'
        value={password}
        className='form-control'
        placeholder='Password'
        onChange={event => {
          event.preventDefault()
          setPassword(event.target.value)
        }}
      />
      <button type='submit' className='sign-up-button' onClick={handleSignUpSubmit}>
        Sign up now
      </button>
      <button type='submit' className='sign-in-button' onClick={handleSignInSubmit}>
        Sign In
      </button>
    </div>
  )
}

export default withFirebase(SignUp)
