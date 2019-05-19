import React, { useState, useEffect } from 'react'
import { withFirebase } from './firebase'
import { ROUTES } from '../constants'

const SignUp = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //   const [username, setUsername] = useState('')
  const [valid, setValid] = useState(false)

  const emailRef = React.createRef()
  const passwordRef = React.createRef()

  const { firebase, history } = props

  const validateInput = () => /^\w+@(\w+\.)+\w+$/.test(email) && password.length > 0

  useEffect(() => {
    const emailInput = emailRef.current
    const passwordInput = passwordRef.current
    console.log(emailInput.value, passwordInput)
    setEmail(emailInput.value)
  }, [])

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
    if (validateInput()) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  const handleSignInSubmit = type => event => {
    event.preventDefault()
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
      <form autoComplete='on'>
        <label htmlFor='email'>Email </label>
        <input
          id='register-email-input'
          type='text'
          name='email'
          value={email}
          required
          autoComplete='on'
          ref={emailRef}
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
          autoComplete='on'
          ref={passwordRef}
          onChange={handleInput('password')}
        />
        <button type='submit' className='btn-signup btn' onClick={handleSignUpSubmit} disabled={!valid}>
          Sign up now
        </button>
        <button type='submit' className='btn-signin btn' onClick={handleSignInSubmit('email')} disabled={!valid}>
          Sign In
        </button>
        <button className='btn-signin-google btn' onClick={handleSignInSubmit('google')}>
          Or sign in with Google
        </button>
      </form>
    </div>
  )
}

export default withFirebase(SignUp)
