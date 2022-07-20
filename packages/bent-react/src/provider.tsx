import {ReactNode, useState, useEffect} from 'react'

import type {Client} from '@usul/client'

import {Resource} from './resource'
import {BentContext} from './context'

const resource = new Resource((client) => {
  return client.connect()
})

type BentProviderProps = {
  client: Client<any, any, any>
  children: ReactNode
}
export function BentProvider({client, children}: BentProviderProps) {
  // This will prohibit the client from ever changing
  resource.read(client)

  return (
    <BentContext.Provider value={{client}}>{children}</BentContext.Provider>
  )
}
