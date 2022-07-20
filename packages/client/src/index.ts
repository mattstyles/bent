import type {ID} from '@usul/core'
import type {Universe, UniverseSchema} from '@usul/universe'
import type {Bent, ClassOf, GetEntityData} from '@usul/entity'
import type {Store} from '@usul/store'

export abstract class Client<
  B extends Bent,
  S extends Store,
  T extends UniverseSchema<T, S>
> {
  abstract universe: Universe<B, S, T>
  protected cache: Map<ID, B> = new Map()

  async connect(): Promise<this> {
    await this.universe.gen()
    return this
  }

  async get<K extends B>(id: ID, Ent: ClassOf<K>): Promise<K | null> {
    const fromCache = this.cache.get(id)
    if (fromCache != null) {
      return Promise.resolve(fromCache as K)
    }

    const store = this.universe.getStoreByEntType(Ent)
    const ent = await store.get(id)
    if (ent != null) {
      this.cache.set(ent.id, ent)
      return ent as K
    }

    return null
  }

  async create<K extends B>(
    Bent: ClassOf<K>,
    data: Omit<GetEntityData<K>, '_id'>
  ): Promise<K> {
    const ent = await this.universe.create(Bent, data)
    this.cache.set(ent.id, ent)
    return ent
  }
}
