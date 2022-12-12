import { IndexedDBKVStore } from '../core/indexedDBKVStore.js'

let dbService = null

export function getDbService () {
  if (dbService == null) {
    dbService = new KvStoreDbService()
  }
  return dbService
}

export class KvStoreDbService {
  constructor () {
    this.kvStore = new IndexedDBKVStore()
    this.kvStore.setupStorage('trips')
  }

  async get (db, store, key) {
    const val = await this.kvStore.get(db, store, key)
    return val
  }

  async getAll (db, store) {
    const val = await this.kvStore.getAll(db, store)
    return val
  }

  put (db, store, value) {
    return this.kvStore.put(db, store, value)
  }

  delete (db, store, key) {
    return this.kvStore.delete(db, store, key)
  }

  deleteAll (db, store) {
    return this.kvStore.deleteAll(db, store)
  }
}
