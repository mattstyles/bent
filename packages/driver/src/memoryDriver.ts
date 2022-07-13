import type {ID, IEntityData} from '@usul/core'
import type {IDriver} from './driver'

export class MemoryDriver<T extends IEntityData> implements IDriver<T> {
  name = 'memoryDriver'
  store: Map<ID, T> = new Map()

  async gen(): Promise<this> {
    return Promise.resolve(this)
  }

  async get(id: ID): Promise<T | null> {
    return Promise.resolve(this.store.get(id) ?? null)
  }

  async set(data: T): Promise<void> {
    this.store.set(data._id, data)
  }
}
