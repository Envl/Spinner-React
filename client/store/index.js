import React, { useState } from 'react'
import { createContainer } from 'unstated-next'

const useCurrentUser = (init = 'hahahahhaha') => {
  const [currentUser, setCurrentUser] = useState(init)
  return { currentUser, setCurrentUser }
}
const CurrentUserGlobal = createContainer(useCurrentUser)

export { CurrentUserGlobal }
