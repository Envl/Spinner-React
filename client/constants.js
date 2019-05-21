const ROUTES = {
  home: '/',
  upload: '/upload',
  signup: '/signup',
  history: '/history',
  homepage: '/homepage',
  landing: '/landing'
}

const AUTH_API = 'https://us-central1-spinner-stuff.cloudfunctions.net/api_user'
const TRANSAC_API =
  'https://us-central1-spinner-stuff.cloudfunctions.net/api_transaction'

const ITEM_API = 'https://us-central1-spinner-stuff.cloudfunctions.net/api_item'
const ALL_ITEM_API =
  'https://us-central1-spinner-stuff.cloudfunctions.net/api_all_items'

export {ROUTES, AUTH_API, ITEM_API, TRANSAC_API, ALL_ITEM_API}
