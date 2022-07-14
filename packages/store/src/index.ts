import type {ID} from '@usul/core'
import type {IDriver} from '@usul/driver'
import type {GetEntityData, ClassOf} from '@usul/entity'
import {Bent} from '@usul/entity'

export interface IStore<Ent extends Bent> {
  name: string
  store: Map<ID, Ent>
  driver: IDriver<GetEntityData<Ent>>

  gen(): Promise<this>
  get(id: ID): Promise<Ent | null>
  set(ent: Ent): Promise<this>
}

export abstract class Store<Ent extends Bent = any> implements IStore<Ent> {
  abstract name: string
  abstract driver: IDriver<GetEntityData<Ent>>
  abstract Ent: ClassOf<Ent>
  store: Map<ID, Ent> = new Map()

  async gen(): Promise<this> {
    return Promise.resolve(this)
  }

  async get(id: ID): Promise<Ent | null> {
    let ent = this.store.get(id)
    if (ent != null) {
      return Promise.resolve(ent)
    }

    let remoteData = await this.driver.get(id)
    if (remoteData != null) {
      const bent = new this.Ent(remoteData)
      this.store.set(id, bent)
      return bent
    }

    return Promise.resolve(null)
  }

  async set(ent: Ent): Promise<this> {
    this.store.set(ent.id, ent)
    await this.driver.set(ent.data)
    return this
  }
}
