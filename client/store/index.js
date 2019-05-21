import React, {useState} from 'react'
import {createContainer} from 'unstated-next'

const CurrentUserGlobal = createContainer(init => {
  const [currentUser, setCurrentUser] = useState(init)
  return {currentUser, setCurrentUser}
})
// const CurrentUserGlobal = createContainer(useCurrentUser)

const SelectedGeoLocationGlobal = createContainer(init => {
  const [selectedGeoLocation, setSelectedGeoLocation] = useState(init)
  return {selectedGeoLocation, setSelectedGeoLocation}
})

const FirebaseDataGlobal = createContainer(() => {
  const [FirebaseData, _setFirebaseData] = useState({})
  const setFirebaseData = newState => {
    // newer be later, so to cover older
    _setFirebaseData({...FirebaseData, ...newState})
    console.log(FirebaseData, {...FirebaseData, ...newState})
  }
  return {FirebaseData, setFirebaseData}
})

export {CurrentUserGlobal, FirebaseDataGlobal, SelectedGeoLocationGlobal}
