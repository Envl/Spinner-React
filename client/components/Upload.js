import React, { useState, useEffect } from 'react'
import { withFirebase } from './firebase'

const UploadPgae = props => {
  return (
    <div className='col-xs-6 col-sm-4 col-lg-3'>
      <article>
        <div className='info'>
          <span className='add-favorite'>
            <a href='javascript:void(0);' data-title='Add to favorites' data-title-added='Added to favorites list'>
              <i className='icon icon-heart' />
            </a>
          </span>
          <span>
            <a href='#productid1' className='mfp-open' data-title='Quick wiew'>
              <i className='icon icon-eye' />
            </a>
          </span>
        </div>
        <div className='btn btn-add'>
          <i className='icon icon-cart' />
        </div>
        <div className='figure-grid'>
          <span className='label label-warning'>New</span>
          <div className='image'>
            <a href='#productid1' className='mfp-open'>
              <img src='${item.photoUrls && item.photoUrls[0]}' alt='' width='360' />
            </a>
          </div>
          <div className='text'>
            <h2 className='title h4'>
              <a href='product.html'>${item.title}</a>
            </h2>
            <sup>SEK ${item.price}</sup>
            <span classNameName='description clearfix'>${item.description}</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default withFirebase(UploadPgae)
