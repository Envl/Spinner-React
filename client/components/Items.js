import {withFirebase, RequireLogin} from './firebase'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {ROUTES, TRANSAC_API} from '../constants'

const ItemGrid = ({item, onRequest}) => {
  const {title, price, description, photoUrls} = item
  const [requested, setRequested] = useState(false)
  return (
    <div className="product-item">
      <div className="text-info">
        <h2 className="title">
          <a>{title}</a>
        </h2>
        <sup>{price}Honey Muffin</sup>
      </div>
      <a className="product-img">
        <img src={photoUrls && photoUrls[0]} alt="" />
      </a>
      <span className="label label-warning">New</span>
      <span className="product-description">{description}</span>
      <button
        className={'btn btn-request ' + (requested ? 'label-requested' : '')}
        onClick={() => {
          if (requested) {
            return
          }
          setRequested(true)
          onRequest(item)
        }}>
        {requested ? 'Requested' : 'Request'}
      </button>
    </div>
  )
}

const Items = ({items, onRequest}) => {
  return (
    <div className="items-container">
      {items &&
        items.map(item => {
          return <ItemGrid item={item} key={item.id} onRequest={onRequest} />
        })}
      {[1, 2, 3, 4].map(() => (
        <div className="zero-height product-item" key={Math.random()} />
      ))}
      <a href="/upload" className="btn btn-add">
        Upload
      </a>
    </div>
  )
}

export default Items
