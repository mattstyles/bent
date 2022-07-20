import {ReactNode, useState, useEffect} from 'react'

import type {Client} from '@usul/client'

import {Resource} from './resource'
import {BentContext} from './context'

const initialResource = new Resource((client) => {
  return client.connect()
})

type BentProviderProps = {
  client: Client<any, any, any>
  children: ReactNode
}
export function BentProvider({client, children}: BentProviderProps) {
  // const [resource, setResource] = useState(initialResource)
  // useEffect(() => {
  //   console.log('using layout effect', client)
  //   setResource(new Resource((client) => client.connect()))
  // }, [client])
  console.log('connecting', client)
  initialResource.read(client)

  return (
    <BentContext.Provider value={{client}}>{children}</BentContext.Provider>
  )
}
