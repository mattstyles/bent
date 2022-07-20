import type {ID, IEntityData} from '@usul/core'
import type {IDriver} from '@usul/driver'

export type GetEntityData<T extends Bent> = T['data']
export type ClassOf<T extends Bent> = new (...args: Array<any>) => T
// Can we type this such that we get constructor params for a bent?
// export type ClassOf<T extends Bent> = ConstructorParameters<T>

type Subscriber<T> = (bent: T) => void
type Subscription = {
  unsubscribe: () => void
}

export interface IEntity<T extends IEntityData> {
  data: T
  gen(): Promise<this>
  update(data: T): Promise<this>
  subscribe(subscriber: Subscriber<this>): Subscription
}

export abstract class Bent<T extends IEntityData = any> implements IEntity<T> {
  private _data: T
  abstract driver: IDriver<T>
  private subscriptions: Set<Subscriber<this>> = new Set()

  constructor(data: T) {
    this._data = data
  }

  get id(): ID {
    return this.data._id
  }

  get data(): T {
    return this._data
  }

  set data(data: T) {
    this._data = data
    this.subscriptions.forEach((subscriber) => {
      subscriber(this)
    })
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

  subscribe(subscriber: Subscriber<this>): Subscription {
    this.subscriptions.add(subscriber)
    return {
      unsubscribe: () => {
        this.subscriptions.delete(subscriber)
      },
    }
  }
}
