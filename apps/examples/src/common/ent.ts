import type {IEntityData} from '@usul/core'
import {Bent} from '@usul/entity'
import {MemoryDriver} from '@usul/driver'
import {Store} from '@usul/store'
import {Universe} from '@usul/universe'
import {Client} from '@usul/client'

// Data type handled by ent
export interface PersonData extends IEntityData {
  name: string
}

// Data driver for storing/retrieving ent data
export class PersonDriver extends MemoryDriver<PersonData> {
  name = 'PersonDriver'
}
export const personDriver = new PersonDriver()

// The ent class
export class PersonBent extends Bent<PersonData> {
  driver = personDriver
}

// Store for holding entities
export class PersonStore extends Store<PersonBent> {
  name = 'PersonStore'
  driver = personDriver
  Ent = PersonBent
}
export const personStore = new PersonStore()

// Universe for holding ents and stores, just one here
type UniverseSchema = {
  personStore: PersonStore
}
type UniverseBents = PersonBent
type UniverseStoreTypes = PersonStore

export class MainUniverse extends Universe<
  UniverseBents,
  UniverseStoreTypes,
  UniverseSchema
> {
  PersonBent = PersonBent
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
