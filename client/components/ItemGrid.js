import React from 'react'

const ProductGridItem = ({item, onRequest}) => {
  const {title, price, description, photoUrls} = item
  return (
    <div className="product-item">
      <div className="text-info">
        <h2 className="title">
          <a>{title}</a>
        </h2>
        <sup>SEK {price}</sup>
      </div>
      <a className="product-img">
        <img src={photoUrls && photoUrls[0]} alt="" />
      </a>
      <span className="label label-warning">New</span>
      <span className="product-description">{description}</span>
      <button className="btn btn-add" onClick={() => onRequest(item)}>
        Request
      </button>
    </div>
  )
}

export default ProductGridItem
