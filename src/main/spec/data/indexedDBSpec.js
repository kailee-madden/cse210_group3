/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { IndexedDBKVStore } from '../../js/data/core/indexedDBKVStore.js'
import 'fake-indexeddb/auto'

// testing IndexedDBKVStore
describe('IndexedDBKVStore:', function () {
  let kvStore
  const db = 'trips'
  const metaDataStore = 'trip_metadata'
  const dataStore = 'trip_data'
  const tripMetadataSchema = { keyPath: 'id', autoIncrement: true }
  const tripDataSchema = { keyPath: 'id' }

  beforeAll(async function () {
    kvStore = new IndexedDBKVStore()
    await kvStore.deleteAll(db, metaDataStore)
    await kvStore.deleteAll(db, dataStore)
  })

  afterEach(async function () {
    // console.log('delete1')
    await kvStore.deleteAll(db, metaDataStore)
    // console.log('delete2')
    await kvStore.deleteAll(db, dataStore)
  })

  it('should be defined', async function () {
    const trip1 = {
      location: 'newTest',
      startDate: '2022-11-22',
      endDate: '2022-11-24'
    }

    // console.log('finished creating store')
    const keyTrip1 = await kvStore.put(db, metaDataStore, trip1)

    // console.log('trip1 inputted')
    const rstKey1 = await kvStore.get(db, metaDataStore, keyTrip1)

    // console.log(rstKey1)
    expect(trip1).toMatchTripDetails(rstKey1)
  })
})
