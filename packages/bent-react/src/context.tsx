import {createContext} from 'react'

import type {Client} from '@usul/client'

export type BentContextType = {
  client: Client<any, any, any>
}
export const BentContext = createContext<BentContextType>(null as any)
