/* eslint-disable prefer-const */
import { getDbService } from './js/data/service/kvStoreDbService.js'

const dbService = getDbService()

export async function handleAddTripMetadata (event) {
  const newTrip = {
    location: event.data.location,
    startDate: event.data.startDate,
    endDate: event.data.endDate
  }
  let putRes = await dbService.put('trips', 'trip_metadata', newTrip)
  window.postMessage({
    type: 'add trip metadata response',
    id: putRes,
    location: event.data.location,
    startDate: event.data.startDate,
    endDate: event.data.endDate
  })
}

export async function handleDeleteTripMetadata (event) {
  const id = parseInt(event.data.id)
  await dbService.delete('trips', 'trip_metadata', id)
  window.postMessage({
    type: 'delete trip metadata response',
    id
  })
}

export async function handleGetAllTripsMetadata (event) {
  const getAllRes = await dbService.getAll('trips', 'trip_metadata')
  window.postMessage({
    type: 'get all trips metadata response',
    trips: getAllRes
  })
}

export async function handleGetTripDetailsMetadata (event) {
  const tripDetails = await dbService.get('trips', 'trip_metadata', event.data.id)
  window.postMessage({
    type: 'get trip metadata response',
    trip: tripDetails
  })
}

export async function handleUpdateTripMetadata (event) {
  const updateRes = await dbService.put('trips', 'trip_metadata', event.data.values)
  window.postMessage({
    type: 'update trip metadata response',
    id: updateRes,
    values: event.data.values
  })
}
