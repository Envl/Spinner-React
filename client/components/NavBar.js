import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {withFirebase} from './firebase'
import {ROUTES} from '../constants'
import {CurrentUserGlobal} from '../store'
import DropDown from './DropDown'

const NavBar = ({firebase}) => {
  const {currentUser} = CurrentUserGlobal.useContainer()
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
    <nav className="navbar">
      <div className="nav-up">
        <div className="nav-left">
          <button className="nav-location btn">
            <i class="fas fa-map-marker-alt" />
          </button>
          <button className="nav-search btn">
            <i class="fas fa-search" />
          </button>
        </div>
        <Link to={ROUTES.home} className="nav-logo" />
        {!currentUser && (
          <div className="nav-right">
            <Link to={ROUTES.signup}>
              <button className="btn nav-login">Login/Signup</button>
            </Link>
          </div>
        )}
        {currentUser && (
          <div className="nav-right">
            <button className="btn nav-add">
              <Link to={ROUTES.upload}>
                <i class="fas fa-plus-circle" />
              </Link>
            </button>
            <DropDown
              title={
                <button className="btn nav-user">
                  <i class="far fa-user" />
                </button>
              }>
              <Link to={ROUTES.homepage}>Homepage</Link>
              <div onClick={handleSignOutClick}>Sign out</div>
            </DropDown>
          </div>
        )}
      </div>
      <div className="nav-down nav-categories">
        {[
          'furniture',
          'lightning',
          'electronics',
          'kitchen supplies',
          'bathroom',
          'sports & outdoors',
          'others'
        ].map(c => (
          <span>{c}</span>
        ))}
      </div>
    </nav>
  )
}

export default withFirebase(NavBar)
