import React, { useState, useEffect } from 'react'

import { RequireLogin } from './firebase'
import '../constants'
import { ITEM_API, AUTH_API, ROUTES } from '../constants'
import { uploadPictureToFirebase, responseHandler, getId } from '../utilities'
import imageCompression from 'browser-image-compression'
import { SelectedGeoLocationGlobal } from '../store'

const UploadPage = ({ history, firebase }) => {
  const [title, setItemTitle] = useState('')
  const [price, setItemPrice] = useState('')
  const [description, setItemDescription] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [uploadCount, setUploadCount] = useState(0)
  const { selectedGeoLocation } = SelectedGeoLocationGlobal.useContainer()

  const handleItemUploadSubmit = event => {
    event.preventDefault()
    setSubmitted(true)
    const todo = []
    uploadedFiles.forEach(img => {
      todo.push(
        uploadPictureToFirebase(img, 'item_images', firebase, () => {
          setUploadCount(uploadCount + 1)
        }),
      )
    })

    Promise.all(todo)
      .then(photoUrls => {
        return fetch(ITEM_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            price: parseInt(price),
            title,
            description,
            photoUrls,
            ownerId: firebase.auth.currentUser.uid,
            location: selectedGeoLocation,
          }),
        })
      })
      .then(responseHandler)
      .then(({ message }) => {
        const newItemId = message.match(/(?<=document )[\w]+/)[0]
        console.log(newItemId)
        firebase.user(firebase.auth.currentUser.uid).update({
          items: firebase.app.firestore.FieldValue.arrayUnion(newItemId),
        })
        history.push(ROUTES.home)
      })

      .catch(error => {
        console.log(error)
      })
  }

  const handleImageUpload = event => {
    // console.log('aaa', event.target.files)
    if (event.target.files.length === 0) return
    const imageFile = event.target.files[0]
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    imageCompression(imageFile, options)
      .then(compressedFile => {
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
        const oldFiles = uploadedFiles.slice()
        setUploadedFiles(oldFiles.concat(compressedFile))
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const renderProgress = () => {
    if (uploadedFiles.length === 0) return <h5>choose a picture to upload</h5>
    const filenames = uploadedFiles.map(f => f.name)
    if (submitted) {
      if (uploadedFiles.length.length === uploadCount) {
        return <h5>almost finished, redirecting to the homepage...</h5>
      } else
        return (
          <h5>{`Uploading.... ${uploadedFiles.length} pictures to upload.. ${uploadCount} done... please wait`}</h5>
        )
    } else {
      return <h5>{`Files to upload: ${filenames.join(', ')}`}</h5>
    }
  }

  return (
    <form className='upload-form' onSubmit={handleItemUploadSubmit}>
      <input
        type='text'
        name='title'
        placeholder='Title*'
        required
        value={title}
        onChange={event => {
          setItemTitle(event.target.value)
        }}
      />
      <input
        type='number'
        name='price'
        placeholder='Price*'
        required
        value={price}
        onChange={event => {
          event.target.value >= 0 && setItemPrice(event.target.value)
        }}
      />
      <textarea
        name='description'
        placeholder='Description*'
        value={description}
        required
        onChange={event => {
          setItemDescription(event.target.value)
        }}
      />
      <input type='file' name='upload-img' id='upload-img' required onChange={handleImageUpload} />
      <label htmlFor='upload-img' id='upload-label' />
      {renderProgress()}
      <button type='submit' className='upload-btn btn'>
        Publish
      </button>
    </form>
  )
}

export default RequireLogin(UploadPage)
