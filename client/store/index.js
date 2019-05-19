import React, { useState } from 'react'
import { createContainer } from 'unstated-next'

const useCurrentUser = init => {
  const [currentUser, setCurrentUser] = useState(init)
  return { currentUser, setCurrentUser }
}
const CurrentUserGlobal = createContainer(useCurrentUser)

const useSelectedGeoLocation = init => {
  const [selectedGeoLocation, setSelectedGeoLocation] = useState(init)
  return { selectedGeoLocation, setSelectedGeoLocation }
}

const SelectedGeoLocationGlobal = createContainer(useSelectedGeoLocation)

export { CurrentUserGlobal, SelectedGeoLocationGlobal }
