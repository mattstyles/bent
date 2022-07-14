import type {ID, IEntityData} from '@usul/core'
import type {IDriver} from '@usul/driver'

export type GetEntityData<T extends Bent> = T['data']
export type ClassOf<T extends Bent> = new (...args: Array<any>) => T
// export type ClassOf<T extends Bent> = ConstructorParameters<T>

export interface IEntity<T extends IEntityData> {
  data: T

  gen(): Promise<this>
  update(data: T): Promise<this>
}

export abstract class Bent<T extends IEntityData = any> implements IEntity<T> {
  data: T
  abstract driver: IDriver<T>

  constructor(data: T) {
    this.data = data
  }

  get id(): ID {
    return this.data._id
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
