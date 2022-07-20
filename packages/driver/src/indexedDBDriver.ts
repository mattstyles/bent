import type {ID, IEntityData} from '@usul/core'
import type {IDriver} from './driver'

export abstract class IndexedDBDriver<T extends IEntityData>
  implements IDriver<T>
{
  name = 'indexedDBDriver'
  db?: IDBDatabase | null
  abstract dbName: string
  abstract version: number

  async gen(): Promise<this> {
    this.db = await this.connect()
    return Promise.resolve(this)
  }

  async get(id: ID): Promise<T | null> {
    return new Promise((resolve, reject) => {
      if (!isIndexedDBEnv()) {
        resolve(null)
        return
      }

      if (this.db == null) {
        throw new Error('IndexedDBDriver not connected')
      }

      const store = this.db
        .transaction(['test'], 'readonly')
        .objectStore('test')

      const request = store.get(id)

      request.onerror = (event) => {
        console.error('[IndexedDB] error getting', id)
        reject()
      }

      request.onsuccess = (event) => {
        resolve(request.result)
      }
    })
  }

  async set(data: T): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!isIndexedDBEnv()) {
        resolve()
        return
      }

      if (this.db == null) {
        throw new Error('IndexedDBDriver not connected')
      }

      const store = this.db
        .transaction(['test'], 'readwrite')
        .objectStore('test')

      const request = store.put(data)

      request.onerror = (event) => {
        console.error('[IndexedDB] error getting', data._id)
        reject()
      }

      request.onsuccess = (event) => {
        resolve()
      }
    })
  }

  abstract onUpgrade(db: IDBDatabase): Promise<void>

  private async connect(): Promise<IDBDatabase | null> {
    if (!isIndexedDBEnv()) {
      return null
    }

    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.version)

      request.onupgradeneeded = async (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        await this.onUpgrade(db)
        resolve(db)
      }
      request.onerror = (event) => {
        // @TODO what happens when we fail to open?
        reject(event)
      }
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        resolve(db)
      }
    })
  }
}

function isIndexedDBEnv(): boolean {
  return !(
    typeof window === 'undefined' || typeof window.indexedDB === 'undefined'
  )
}
