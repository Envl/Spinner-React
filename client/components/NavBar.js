import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from './firebase'
import { ROUTES } from '../constants'
import { CurrentUserGlobal } from '../store'

const NavBar = ({ firebase }) => {
  const { currentUser } = CurrentUserGlobal.useContainer()
  console.log(currentUser)

  const handleSignOutClick = () => {
    firebase.auth
      .signOut()
      .then(() => {
        console.log('logged out')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <nav className='navbar'>
      <Link to={ROUTES.home}>
        <div>Logo here</div>
      </Link>
      {!currentUser && (
        <Link to={ROUTES.signup}>
          <div className='sign-in-out-btn'>
            <div>Log In</div>
          </div>
        </Link>
      )}
      {currentUser && (
        <div onClick={handleSignOutClick} className='sign-in-out-btn'>
          <div>Sign out</div>
        </div>
      )}
    </nav>
  )
}

export default withFirebase(NavBar)
