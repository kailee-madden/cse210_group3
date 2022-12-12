export class abstractKvStore {
  constructor () {
    if (this.constructor === abstractKvStore) {
      throw new Error('Abstract class cannot be instantiated')
    }
  }

  setupStorage (dbName) {
    throw new Error('Abstract class method get not implmented')
  }

  async get (dbName, storeName, key) {
    throw new Error('Abstract class method get not implmented')
  }

  async getAll (dbName, storeName) {
    throw new Error('Abstract class method get not implmented')
  }

  async put (dbName, storeName, value) {
    throw new Error('Abstract class method put not implmented')
  }

  async delete (dbName, storeName, key) {
    throw new Error('Abstract class method put not implmented')
  }
}
