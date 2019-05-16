const ROUTES = {
  home: '/',
  items: '/items',
  upload: '/upload',
  signup: '/signup',
  history: '/history',
  homepage: '/homepage'
}

const AUTH_API = 'https://us-central1-spinner-stuff.cloudfunctions.net/api_user'
const TRANSAC_API =
  'https://us-central1-spinner-stuff.cloudfunctions.net/api_transaction'

const ITEM_API = 'https://us-central1-spinner-stuff.cloudfunctions.net/api_item'

export {ROUTES, AUTH_API, ITEM_API, TRANSAC_API}
