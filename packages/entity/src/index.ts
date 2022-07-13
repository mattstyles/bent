import type {IEntityData} from '@usul/core'
import type {IDriver} from '@usul/driver'

export interface IEntity<T extends IEntityData> {
  data: T

  gen(): Promise<this>
  update(data: T): Promise<this>
}

export abstract class Entity<T extends IEntityData> implements IEntity<T> {
  data: T
  abstract driver: IDriver<T>

  constructor(data: T) {
    this.data = data
  }

  async gen(): Promise<this> {
    await this.update(this.data)
    return this
  }

  async update(data: Partial<T>): Promise<this> {
    const merged = {...this.data, ...data}
    await this.driver.set(merged)
    this.data = merged
    return this
  }
}
