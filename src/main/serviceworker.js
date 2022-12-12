import { handleAddTripData, handleGetAllDaysData, handleUpdateTripData, handleDeleteTripEventData, handleDeleteTripData, handleGetAllDaysDataForNotification } from './tripDataHandler.js'
import { handleAddTripMetadata, handleDeleteTripMetadata, handleGetTripDetailsMetadata, handleGetAllTripsMetadata, handleUpdateTripMetadata } from './tripMetadataHandler.js'

/**
 * Listens for postMessage and responds with data from IndexedDB accordingly
 * @listens addNewTrip(), deleteTrip(), getTripData(), getTripDetails()
 * @todo implement the getTripData() and getTripDetails()
 */
self.addEventListener('message', function (event) {
  (async () => {
    switch (event.data.type) {
      case 'add trip metadata':
        await handleAddTripMetadata(event)
        break
      case 'delete trip metadata':
        await handleDeleteTripMetadata(event)
        break
      case 'get all trips metadata':
        await handleGetAllTripsMetadata(event)
        break
      case 'get trip metadata':
        await handleGetTripDetailsMetadata(event)
        break
      case 'update trip metadata':
        await handleUpdateTripMetadata(event)
        break
      case 'add trip data':
        await handleAddTripData(event)
        break
      case 'delete trip event data':
        await handleDeleteTripEventData(event)
        break
      case 'delete trip data':
        await handleDeleteTripData(event)
        break
      case 'get all days data':
        await handleGetAllDaysData(event)
        break
      case 'get trip data':
        await handleGetTripDetailsMetadata(event)
        break
      case 'update trip data':
        await handleUpdateTripData(event)
        break
      case 'get all days data for notification':
        await handleGetAllDaysDataForNotification(event)
        break
    }
  })()
})

const travel = 'div-travel-v1'
const assets = [
  '/',
  '/index.html',
  '/tripDataHandler.js',
  '/tripMetadataHandler.js',
  '/css/landing.css',
  '/css/main.css',
  '/css/main.css.map',
  '/css/main.scss',
  '/css/tripDetail.css',
  '/css/historical.css',
  '/js/app.js',
  '/js/tripDetail.js',
  '/js/historical.js',
  '/pages/components/landingButton.js',
  '/pages/components/logo.js',
  '/pages/tripDetail.html',
  '/pages/historical.html'
]

self.addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open(travel).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener('fetch', fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
