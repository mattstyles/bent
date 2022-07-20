import {useState, useEffect} from 'react'

import type {ID} from '@usul/core'
import type {Bent as TypeofBent, ClassOf, GetEntityData} from '@usul/entity'

import {useBentClient} from './context'
import {Resource} from './resource'

type UseBentOutput<T extends TypeofBent> = {
  ent: T | null
  data: GetEntityData<T> | null
}

const initialResource = new Resource((client, id, Bent) => {
  return client.get(id, Bent)
})
export function useBent<T extends TypeofBent>(
  id: ID,
  Bent: ClassOf<T>
): UseBentOutput<T> {
  const [resource, setResource] = useState(initialResource)
  useEffect(() => {
    setResource(
      new Resource((client, id, Bent) => {
        return client.get(id, Bent)
      })
    )
  }, [id])
  const {client} = useBentClient()
  const foundEnt = resource.read(client, id, Bent) as T

  const [ent, setEnt] = useState<T | null>(foundEnt)
  const [data, setData] = useState<GetEntityData<T> | null>(foundEnt.data)

  useEffect(() => {
    // Reset here as this might change if a new ID is supplied
    setEnt(foundEnt)
    setData(foundEnt.data)

    if (foundEnt == null) {
      return
    }

    const subscription = foundEnt.subscribe((ent) => {
      setEnt(ent)
      setData(ent.data)
    })
    return () => subscription.unsubscribe()
  }, [foundEnt])

  return {
    ent,
    data,
  }
}
