import React, {useState, useEffect} from 'react'

import {withFirebase, RequireLogin} from './firebase'
import '../constants'
import {ITEM_API, ROUTES} from '../constants'
import {uploadPictureToFirebase} from '../utilities'

const UploadPage = ({history, firebase}) => {
  const [title, setItemTitle] = useState('')
  const [price, setItemPrice] = useState('')
  const [description, setItemDescription] = useState('')
  const [photoUrls, setImgUrls] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleItemUploadSubmit = event => {
    event.preventDefault()
    if (!(uploadProgress === 100)) {
      return
    }
    fetch(ITEM_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        price,
        title,
        description,
        photoUrls,
        ownerId: firebase.auth.currentUser.uid
      })
    })
      .then(rst => {
        console.log('result', rst)
        if (rst.ok) {
          history.push(ROUTES.items)
        }
      })
      .catch(err => console.log('failed', err))
  }

  const handleImageUpload = event => {
    uploadPictureToFirebase(
      event.target.files[0],
      'item_images',
      firebase,
      url => {
        const oldUrls = photoUrls.slice()
        setImgUrls(oldUrls.concat(url))
      },
      status => {
        setUploadProgress(status * 100)
      }
    )
  }

  const renderProgress = () => {
    if (uploadProgress === 0) return null
    else if (uploadProgress == 100) return <h5>Image Uploaded</h5>
    else return <h5>Uploading ... {uploadProgress} % ... </h5>
  }

  return (
    <form
      action="upload"
      className="upload-form"
      onSubmit={handleItemUploadSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title*"
        required
        value={title}
        onChange={event => {
          setItemTitle(event.target.value)
        }}
      />
      <input
        type="number"
        name="price"
        placeholder="Price*"
        required
        value={price}
        onChange={event => {
          event.target.value >= 0 && setItemPrice(event.target.value)
        }}
      />
      <textarea
        name="description"
        placeholder="Description*"
        value={description}
        required
        onChange={event => {
          setItemDescription(event.target.value)
        }}
      />
      <input
        type="file"
        name="upload-img"
        id="upload-img"
        required
        onChange={handleImageUpload}
      />
      <label htmlFor="upload-img" id="upload-label" />
      {renderProgress()}
      <button
        type="submit"
        className="upload-btn btn"
        // disabled={!(uploadProgress === 100)}
        // onClick={evt => {

        // }}
      >
        Publish
      </button>
    </form>
  )
}

export default RequireLogin(UploadPage)
