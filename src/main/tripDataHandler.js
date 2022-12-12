import { getDbService } from './js/data/service/kvStoreDbService.js'

const dbService = getDbService()

export async function handleAddTripData (event) {
  await dbService.put('trips', 'trip_data', event.data.tripData)
  window.postMessage({
    type: 'add trip data response',
    tripData: event.data.tripData
  })
}

export async function handleGetAllDaysData (event) {
  const tripDetails = await dbService.get('trips', 'trip_data', event.data.id)
  window.postMessage({
    type: 'get all days data response',
    tripData: tripDetails
  })
}

export async function handleDeleteTripEventData (event) {
  await dbService.put('trips', 'trip_data', event.data.tripData)
  window.postMessage({
    type: 'delete event response',
    tripData: event.data.tripData
  })
}

export async function handleDeleteTripData (event) {
  await dbService.delete('trips', 'trip_data', event.data.id)
  window.postMessage({
    type: 'delete trip data response',
    id: event.data.id
  })
}

export async function handleUpdateTripData (event) {
  await dbService.put('trips', 'trip_data', event.data.tripData)
  window.postMessage({
    type: 'update trip data response',
    tripData: event.data.tripData
  })
}

export async function handleGetAllDaysDataForNotification (event) {
  const tripDetailsNotif = await dbService.get('trips', 'trip_data', event.data.id)
  //   event.source.postMessage(tripDetailsNotif)
  window.postMessage({
    type: 'get all event details for notif',
    tripData: tripDetailsNotif
  })
}
