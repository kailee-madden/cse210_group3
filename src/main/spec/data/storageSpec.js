/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
import { getDbService } from '../../js/data/service/kvStoreDbService.js'
import 'fake-indexeddb/auto'

let dbService = getDbService()

// check all object field for the two object
function checkAllDetails (objA, objB) {
  var keys = Object.keys(objA)
  for (var i = 0; i < keys.length; i++) {
    expect(objA[keys[i]]).toEqual(objB[keys[i]])
  }
}

function allKeys (objArray) {
  let rst = []
  for (var i = 0; i < objArray.length; i++) {
    rst.push(objArray[i].id)
  }
  return rst
}

describe('storage:', function () {
  let db
  let store
  const trip1 = {
    location: 'London',
    startDate: '2022-11-22',
    endDate: '2022-11-24'
  }
  const trip2 = {
    location: 'London_2',
    startDate: '2022-11-23',
    endDate: '2022-11-25'
  }

  async function getDBSize () {
    let temp = await dbService.getAll(db, store)
    let keys = allKeys(temp)
    return keys.length
  }

  beforeEach(async function () {
    db = 'trips'
    store = 'trip_metadata'
  })

  // clear database afterEach test
  afterEach(async function () {
    let temp = await dbService.getAll(db, store)
    let keys = allKeys(temp)
    for (var i = 0; i < keys.length; i++) {
      await dbService.delete(db, store, keys[i])
    }
  })

  it('get all trip and keyID', async function () {
    let keyTrip1 = await dbService.put(db, store, trip1)
    let keyTrip2 = await dbService.put(db, store, trip2)
    let temp = await dbService.getAll(db, store)
    let keys = allKeys(temp)
    expect(keys.length).toEqual(2) // added two trips
    // expect(getDBSize()).toEqual(2); // added two trips
  })

  it('add new trip', async function () {
    // var dummyElement = document.createElement();
    // document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);

    // store two trips in the database
    let keyTrip1 = await dbService.put(db, store, trip1)
    let keyTrip2 = await dbService.put(db, store, trip2)

    // get the trip from the database, check obj entries
    let rstKey1 = await dbService.get(db, store, keyTrip1)
    checkAllDetails(trip1, rstKey1)

    let rstKey2 = await dbService.get(db, store, keyTrip2)
    checkAllDetails(trip2, rstKey2)
  })

  // TODO: implement upsert function in
  it('modify trip', async function () {
    let keyTrip1 = await dbService.put(db, store, trip1)

    // get the trip from the database, check obj entries
    let rst = await dbService.get(db, store, keyTrip1)
    checkAllDetails(trip1, rst)

    const updateValue = {
      id: rst.id,
      location: 'New_location',
      startDate: '2022-11-23',
      endDate: '2022-11-25'
    }
    let newKey = await dbService.put(db, store, updateValue)

    // get the trip from the database, check obj entries
    let afterUpdate = await dbService.get(db, store, newKey)
    checkAllDetails(updateValue, afterUpdate)
  })

  // TODO check delete function
  it('delete trip', async function () {
    let keyTrip1 = await dbService.put(db, store, trip1)

    // get the trip from the database, check obj entries
    let rstKey1 = await dbService.get(db, store, keyTrip1)
    checkAllDetails(trip1, rstKey1)

    await dbService.delete(db, store, keyTrip1)
    let temp = await dbService.getAll(db, store)
    let keys = allKeys(temp)
    expect(keys.length).toEqual(0)
  })
})
