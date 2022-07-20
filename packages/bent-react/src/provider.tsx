import {ReactNode} from 'react'

import type {Client} from '@usul/client'

import {Resource} from './resource'
import {BentContext} from './context'

const resource = new Resource((client) => {
  // return Promise.all([delay(3000), client.connect()])
  return client.connect()
})

type BentProviderProps = {
  client: Client<any, any, any>
  children: ReactNode
}
export function BentProvider({client, children}: BentProviderProps) {
  resource.read(client)

  return (
    <BentContext.Provider value={{client}}>{children}</BentContext.Provider>
  )
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
