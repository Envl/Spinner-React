import React, { useState, useEffect } from 'react'
import { withFirebase } from './firebase'

const SignUp = props => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const handleSignUpSubmit = () => {
    console.log('aaa')
  }
  return (
    <div class='form-group'>
      <input
        id='register-email-input'
        type='text'
        value={email}
        class='form-control'
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
        class='form-control'
        placeholder='Password'
        onChange={event => {
          event.preventDefault()
          setPassword(event.target.value)
        }}
      />
      <button type='submit' onClick={handleSignUpSubmit}>
        Sign up now
      </button>
    </div>
  )
}

export default withFirebase(SignUp)
