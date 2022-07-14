import type {IEntityData} from '@usul/core'
import {Bent} from '@usul/entity'
import {MemoryDriver} from '@usul/driver'
import {Store} from '@usul/store'

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
