import {createContext, useContext} from 'react'

import type {Client} from '@usul/client'

export type BentContextType = {
  client: Client<any, any, any>
}
export const BentContext = createContext<BentContextType>(null as any)

export function useBentClient(): BentContextType {
  const {client} = useContext(BentContext)
  return {client}
}
