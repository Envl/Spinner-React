import {withFirebase, RequireLogin} from './firebase'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {ROUTES, TRANSAC_API} from '../constants'
import {CurrentUserGlobal} from '../store'

const ItemGrid = ({item, onRequest, onDelete, btnState}) => {
  const [requestStatus, setRequestStatus] = useState(btnState)
  const {currentUser} = CurrentUserGlobal.useContainer()
  const {title, price, description, photoUrls} = item

  const RequestBtn = onRequest && (
    <button
      className={
        'btn btn-request ' +
        (requestStatus === 'requested'
          ? 'label-requested'
          : requestStatus === 'no money'
          ? 'label-warning'
          : '')
      }
      onClick={() => {
        if (requestStatus) {
          return
        }
        if (!currentUser) {
          onRequest(item)
        } else if (currentUser.points >= price) {
          console.log('before........')

          if (onRequest(item)) {
            setRequestStatus('requested')
          }
        } else {
          setRequestStatus('no money')
        }
      }}>
      {requestStatus === 'no money'
        ? 'Need more honey'
        : requestStatus === 'requested'
        ? 'Requested'
        : 'Request'}
    </button>
  )

  const DeleteBtn = onDelete && (
    <button
      className='btn btn-delete'
      onClick={() => {
        console.log('kkkkkkkkkk', item)

        onDelete(item.id)
      }}>
      Delete
    </button>
  )
  return (
    <div className='product-item'>
      <div className='text-info'>
        <h2 className='title'>
          <a>{title}</a>
        </h2>
        <sup>{price}Honey Muffin</sup>
      </div>
      <a className='product-img'>
        <img src={photoUrls && photoUrls[0]} alt='' />
      </a>
      <span className='label label-warning'>New</span>
      <span className='product-description'>{description}</span>
      {RequestBtn}
      {DeleteBtn}
    </div>
  )
}

const Items = ({items, onRequest, onDelete}) => {
  return (
    <div className='items-container'>
      {items &&
        items.map(item => {
          return (
            <ItemGrid
              item={item}
              key={item.id + Math.random()}
              onRequest={onRequest}
              onDelete={onDelete}
              btnState={item.btnState}
            />
          )
        })}
      {[1, 2, 3, 4].map(() => (
        <div className='zero-height product-item' key={Math.random()} />
      ))}
      <a href='/upload' className='btn btn-add'>
        Upload
      </a>
    </div>
  )
}

export default Items
