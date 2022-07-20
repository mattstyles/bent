import {Suspense, useState, useEffect} from 'react'
import {BentProvider} from '@usul/bent-react'

import {Text} from 'ui'
import {AvatarBent, client} from 'common/indexedEnt'

export default function ReactExample() {
  return (
    <Suspense fallback={<AppFallback />}>
      <App />
    </Suspense>
  )
}

/**
<BentProvider client={client}>
  <Text>Connected</Text>
</BentProvider>
*/

function App() {
  return (
    <BentProvider client={client}>
      <Text>Connected</Text>
    </BentProvider>
  )
}

function AppFallback() {
  return <Text>App-level suspense fallback</Text>
}

export function ClientOnly({children}: {children: React.ReactNode}) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}
