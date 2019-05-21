import React, { useState, useEffect } from 'react'
import { withFirebase } from './firebase'
import { ROUTES } from '../constants'

const SignUp = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let btnType = 'email'
  //   const [username, setUsername] = useState('')

  // const emailRef = React.createRef()
  // const passwordRef = React.createRef()

  const { firebase, history } = props

  // useEffect(() => {
  //   const emailInput = emailRef.current
  //   const passwordInput = passwordRef.current
  //   console.log(emailInput.value, passwordInput)
  //   setEmail(emailInput.value)
  // }, [])

  const handleSignUpSubmit = () => {
    firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log(authUser)
        authUser.user.sendEmailVerification({
          url: `https://ehiver.netlify.com`,
        })
        firebase.user(authUser.user.uid).set(
          {
            email,
            // username: username,
            id: authUser.user.uid,
            transactions: [],
            items: [],
            points: 0,
          },
          { merge: true },
        )
      })
      .then(() => {
        console.log('aaaaaaaaaaaaaaafete')
        // debugger
        history.push(ROUTES.verify)
      })
      .catch(error => {
        console.log(`${error.message}`)
      })
  }

  const handleSignInSubmit = type => {
    switch (type) {
      case 'email':
        firebase.auth
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            console.log('login', res)
            history.push('/')
          })
          .catch(({ code, message }) => {
            alert(code, message)
          })
        break
      case 'google':
        firebase
          .authWithGoogle()
          .then(({ additionalUserInfo, user }) => {
            // console.log('12232323', res)
            if (additionalUserInfo.isNewUser) {
              firebase.user(user.uid).set(
                {
                  email: user.email,
                  // username: username,
                  id: user.uid,
                  transactions: [],
                  items: [],
                  points: 0,
                },
                { merge: true },
              )
            }
            history.push('/')
          })
          .catch(error => {
            alert(error)
          })
        break
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (btnType === 'signup') {
      handleSignUpSubmit()
    } else if (btnType === 'email') {
      console.log('++++++++++++')

      handleSignInSubmit('email')
    } else if (btnType === 'google') {
      handleSignInSubmit('google')
    }
  }

  return (
    <div className='sign-up-form-group'>
      <form autoComplete='on' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email </label>
        <input
          id='register-email-input'
          type='email'
          name='email'
          value={email}
          required
          autoComplete='on'
          // ref={emailRef}
          placeholder='Email: *'
          onChange={e => setEmail(e.target.value)}
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
          // ref={passwordRef}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit' className='btn-signin btn' onClick={() => (btnType = 'email')}>
          Sign In
        </button>
        <button
          type='submit'
          className='btn-signup btn'
          onClick={e => {
            btnType = 'signup'
          }}
        >
          Sign up now
        </button>
        <button className='btn-signin-google btn' onClick={() => (btnType = 'google')}>
          Or sign in with Google
        </button>
      </form>
    </div>
  )
}

export default withFirebase(SignUp)
