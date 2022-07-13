export type ID = string

export interface IEntityData {
  _id: ID
}

export interface IEntity<T = IEntityData> {
  data: T

  gen(): Promise<this>
  update(data: T): Promise<this>
}

export abstract class Entity<T = IEntityData> implements IEntity<T> {
  data: T
  // abstract driver: IDriver<T>

  constructor(data: T) {
    this.data = data
  }

  async gen(): Promise<this> {
    await this.update(this.data)
    return this
  }

  async update(data: T): Promise<this> {
    const merged = {...this.data, ...data}
    // await this.driver.set(merged)
    this.data = merged
    return this
  }
}
