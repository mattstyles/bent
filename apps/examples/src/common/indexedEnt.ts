import type {IEntModel} from '@usul/core'
import {Bent} from '@usul/entity'
import {IndexedDBDriver} from '@usul/driver'
import {Store} from '@usul/store'
import {Universe} from '@usul/universe'
import {Client} from '@usul/client'

// Data type handled by ent
export interface AvatarModel extends IEntModel {
  name: string
  image: string
}

// Data driver for storing/retrieving ent data
export class AvatarDriver extends IndexedDBDriver<AvatarModel> {
  name = 'AvatarDriver'
  dbName = 'indexedDBexample'
  version = 1

  async onUpgrade(db: IDBDatabase) {
    const store = db.createObjectStore('test', {
      keyPath: '_id',
    })

    return new Promise<void>((resolve, reject) => {
      store.transaction.onerror = (event) => {
        reject()
      }
      store.transaction.oncomplete = (event) => {
        const table = db.transaction(['test'], 'readwrite').objectStore('test')

        // Add dummy data
        table.add({
          _id: 'hedylamarr',
          name: 'Hedy Lamarr',
          image: 'https://i.imgur.com/yXOvdOSs.jpg',
        })
        table.add({
          _id: 'katherinejohnson',
          name: 'Katherine Johnson',
          image: 'https://i.imgur.com/MK3eW3As.jpg',
        })

        resolve()
      }
    })
  }
}
export const avatarDriver = new AvatarDriver()

// The ent class
export class AvatarBent extends Bent<AvatarModel> {
  driver = avatarDriver
}

// Store for holding entities
export class PersonStore extends Store<AvatarBent> {
  name = 'PersonStore'
  driver = avatarDriver
  Ent = AvatarBent
}
export const personStore = new PersonStore()

// Universe for holding ents and stores, just one here
export type UniverseSchema = {
  personStore: PersonStore
}
export type UniverseBents = AvatarBent
export type UniverseStoreTypes = PersonStore

export class MainUniverse extends Universe<
  UniverseBents,
  UniverseStoreTypes,
  UniverseSchema
> {
  PersonBent = AvatarBent
}
export const universe = new MainUniverse({
  personStore: personStore,
})

// Client for interacting with universe
export class MainClient extends Client<
  UniverseBents,
  UniverseStoreTypes,
  UniverseSchema
> {
  universe = universe
}
export const client = new MainClient()
