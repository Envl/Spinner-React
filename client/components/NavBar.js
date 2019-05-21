import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from './firebase'
import { ROUTES } from '../constants'
import { CurrentUserGlobal, SelectedGeoLocationGlobal } from '../store'
import DropDown from './DropDown'
import geoLocation from './GeoLocation'

const NavBar = ({ firebase }) => {
  const { currentUser } = CurrentUserGlobal.useContainer()
  // console.log(currentUser)
  const { setSelectedGeoLocation } = SelectedGeoLocationGlobal.useContainer()

  const [region, setRegion] = useState('')

  // init selected Region to current Region
  useEffect(() => {
    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(position => {
        const {
          coords: { latitude, longitude },
        } = position
        setSelectedGeoLocation([latitude, longitude])
        geoLocation
          .setGeoLocation(latitude, longitude)
          .then(() => {
            console.log(geoLocation.getRegion())
            setRegion(geoLocation.region)
          })
          .catch(error => {
            console.log(error)
          })
      })
    } else {
      return
    }
  }, [])

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
      <div className='nav-up'>
        <div className='nav-left'>
          <button className='nav-location btn'>
            <i className='fas fa-map-marker-alt' />
            {region}
          </button>
          <button className='nav-search btn'>
            <i className='fas fa-search' />
          </button>
        </div>
        <Link to={ROUTES.home} className='nav-logo' />
        {!currentUser && (
          <div className='nav-right'>
            <Link to={ROUTES.signup}>
              <button className='btn nav-login'>Login/Signup</button>
            </Link>
          </div>
        )}
        {currentUser && (
          <div className='nav-right'>
            <button className='btn nav-add'>
              <Link to={ROUTES.upload}>
                <i className='fas fa-plus-circle' />
              </Link>
            </button>
            <DropDown
              title={
                <button className='btn nav-user'>
                  <i className='far fa-user' />
                </button>
              }
            >
              <div>{currentUser.points} Honey Muffin</div>
              <Link to={ROUTES.history}>My Stuff</Link>
              <div onClick={handleSignOutClick}>Sign out</div>
            </DropDown>
          </div>
        )}
      </div>
      <div className='nav-down nav-categories'>
        {['furniture', 'lightning', 'electronics', 'kitchen supplies', 'bathroom', 'sports & outdoors', 'others'].map(
          (c, i) => (
            <span key={i}>{c}</span>
          ),
        )}
      </div>
    </nav>
  )
}

export default withFirebase(NavBar)
