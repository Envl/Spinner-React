// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// import { getCity } from './GeoLocation'
import Geocode from 'react-geocode'

Geocode.setApiKey('AIzaSyCLRX6mEHnbJe93s59loZNU4B0uHlMfUWg')
Geocode.enableDebug()

const gl = {
  Geocode: Geocode,
  setGeoLocation: (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      gl.latitude = latitude
      gl.longitude = longitude
      gl.Geocode.fromLatLng(latitude, longitude)
        .then(({ results }) => {
          gl.results = results
          resolve('Decode ok')
        })
        .catch(error => {
          reject(new Error('Failed to decode'))
          console.error(error)
        })
    })
  },
  getRegion: () => {
    const region = gl.results.find(r => r.types.includes('administrative_area_level_1')).formatted_address
    gl.region = region
    return region
  },
}

export default gl
