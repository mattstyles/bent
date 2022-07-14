import type {ClassOf, GetEntityData} from '@usul/entity'

import {Bent} from '@usul/entity'
import {Store} from '@usul/store'

type Index<T> = keyof T
export type UniverseSchema<T, S extends Store> = Record<Index<T>, S>

export abstract class Universe<
  B extends Bent,
  S extends Store,
  T extends UniverseSchema<T, S>
> {
  private stores: Map<Index<T>, S> = new Map()

  // Move cache to client
  // protected cache: Map<B['data']['_id'], Index<T>> = new Map()

  constructor(stores: T) {
    for (let name in stores) {
      this.stores.set(name, stores[name])
    }
  }

  // Might need to ensure we don't run gen more than once on a shared driver
  async gen(): Promise<this> {
    const gen = new Set<Promise<any>>()
    this.stores.forEach((store) => {
      gen.add(store.gen())
      gen.add(store.driver.gen())
    })
    await Promise.all(gen)
    return this
  }

  getStore<K extends Index<T>>(name: K): T[K] {
    return this.stores.get(name) as T[K]
  }

  getStoreByEntType<K extends Bent>(Ent: ClassOf<K>): Store<K> {
    const store = find(this.stores, (store) => store.Ent === Ent)

    if (store == null) {
      throw new Error('Bent type unknown in universe ' + Ent.name)
    }

    return store as Store<K>
  }

  // Move to client
  // async get<K extends B>(id: string, Ent?: ClassOf<K>): Promise<K | null> {}

  async create<E extends B>(
    Bent: ClassOf<E>,
    data: GetEntityData<Bent>
  ): Promise<E> {
    const store = this.getStoreByEntType(Bent)

    // @TODO use keygen to attach id
    const id = Math.random().toString(36).slice(2)
    const ent = new Bent({
      _id: id,
      ...data,
    })
    await ent.gen()
    await store.set(ent)
    return ent as E
  }
}

function find<K, V>(m: Map<K, V>, fn: (value: V) => boolean): V | null {
  for (let x of iterate(m)) {
    if (fn(x)) {
      return x
    }
  }

  return null
}

function* iterate<K, V>(m: Map<K, V>): IterableIterator<V> {
  for (let x of m.values()) {
    yield x
  }
}
