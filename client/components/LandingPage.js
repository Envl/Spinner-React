import React from 'react'
import {ROUTES} from '../constants'
import {Link} from 'react-router-dom'

const LandingPage = props => {
  return (
    <div className="landing-page">
      <div className="logo-top"> </div>
      <div className="poster-wrapper">
        <img
          className="blue-path"
          src={require('../assets/img/bluePath.svg')}
        />
        <img
          className="items"
          src={require('../assets/img/landingfront.png')}
        />
        <div className="text-wrapper">
          <h1>
            your shared <br />
            inventory
          </h1>
          <div className="intro-list">
            <li className="list-item">Free of charge</li>
            <li className="list-item">Sustainable living</li>
            <li className="list-item">Global access</li>
          </div>
          <Link to={ROUTES.items} className="btn btn-landing-explore">
            Start Explore
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
