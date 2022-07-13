import type {ID, IEntityData} from '@usul/core'

export interface IDriver<T extends IEntityData> {
  name: string
  gen(...args: any[]): Promise<this>
  get(id: ID): Promise<T | null>
  set(data: T): Promise<void>
}
