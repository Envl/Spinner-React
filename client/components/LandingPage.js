import React from 'react'
import { ROUTES } from '../constants'
import { Link } from 'react-router-dom'
import '../scss/_LandingPage.scss'

const LandingPage = props => {
  return (
    <div>
      <div className='logo-top'> </div>
      <div className='poster-wrapper'>
        <div className='blue-path'> </div>
        <div className='items' />
        <div className='text-wrapper'>
          <h1>share</h1>
          <ul className='intro-list'>
            <li className='list-item'>Free of charge</li>
            <li className='list-item'>Sustainable living</li>
            <li className='list-item'>Global access</li>
          </ul>
          <Link to={ROUTES.items}>
            <button className='btn'>Start Explore</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
