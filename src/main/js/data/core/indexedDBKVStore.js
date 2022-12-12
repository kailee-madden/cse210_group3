/* eslint-disable eqeqeq */
import { abstractKvStore } from './abstractKvStore.js'

const idbKeyval = (() => {
  let dbInstance
  let version = 0

  function getDB (dbName, isStoring = false) {
    if (dbInstance && !isStoring) return dbInstance

    version = version + 1

    dbInstance = new Promise((resolve, reject) => {
      const openreq = indexedDB.open(dbName, version)

      openreq.onerror = () => {
        if (openreq.error.name != 'VersionError') {
          reject(openreq.error)
        }
      }

      openreq.onupgradeneeded = () => {
        const tripMetadataSchema = { keyPath: 'id', autoIncrement: true }
        openreq.result.createObjectStore('trip_metadata', tripMetadataSchema)
        const tripDataSchema = { keyPath: 'id' }
        openreq.result.createObjectStore('trip_data', tripDataSchema)
      }

      openreq.onsuccess = () => {
        resolve(openreq.result)
      }
    })

    return dbInstance
  }

  async function withStore (dbName, storeName, type, callback) {
    const db = await getDB(dbName)
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, type)
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
      callback(transaction.objectStore(storeName))
    })
  }

  return {
    async setupStorage (dbName) {
      await getDB(dbName, true).then(console.log('storage setup complete!'))
    },
    async get (dbName, storeName, key) {
      let request
      await withStore(dbName, storeName, 'readonly', (store) => {
        request = store.get(key)
      })
      return request.result
    },
    async getAll (dbName, storeName) {
      let request
      await withStore(dbName, storeName, 'readonly', (store) => {
        request = store.getAll()
      })
      return request.result
    },
    async set (dbName, storeName, value) {
      let request
      await withStore(dbName, storeName, 'readwrite', (store) => {
        request = store.put(value)
      })
      return request.result
    },
    delete (dbName, storeName, key) {
      return withStore(dbName, storeName, 'readwrite', (store) => {
        store.delete(key)
      })
    },
    deleteAll (dbName, storeName) {
      return withStore(dbName, storeName, 'readwrite', (store) => {
        store.clear()
      })
    }
  }
})()

export class IndexedDBKVStore extends abstractKvStore {
  setupStorage (dbName) {
    return idbKeyval.setupStorage(dbName)
  }

  async get (dbName, storeName, key) {
    const val = await idbKeyval.get(dbName, storeName, key)
    return val
  }

  async getAll (dbName, storeName) {
    const val = await idbKeyval.getAll(dbName, storeName)
    return val
  }

  async put (dbName, storeName, value) {
    return idbKeyval.set(dbName, storeName, value)
  }

  async delete (dbName, storeName, key) {
    return idbKeyval.delete(dbName, storeName, key)
  }

  async deleteAll (dbName, storeName) {
    return idbKeyval.deleteAll(dbName, storeName)
  }
}
