import {ReactNode, useState, useEffect} from 'react'

export function ClientOnly({children}: {children: ReactNode}) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}
