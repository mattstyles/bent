import {useEffect, useState, useCallback} from 'react'
import {GetEntityData} from '@usul/entity'

import {Stack, Screen, Container, Button} from 'ui'
import {PersonBent, client} from 'common/ent'
import {PersonDisplay} from 'common/personDisplay'

/**
 * This is really clunky where we have a ref to the ent and a ref to the data. Rendering will use data (although there could in theory be methods on the ent itself which return the data) and ents mutate by creating a new data object so reacting to data changes works but its really clunky. React does need access to the ent as well to run functions on it. We could hide this all in a custom hook but there is probably a better way to handle reacting to changes without referential equality checks.
 */
export default function Subscription() {
  const [ent, setEnt] = useState<PersonBent | null>(null)
  const [data, setData] = useState<GetEntityData<PersonBent> | null>(null)

  useEffect(() => {
    let dispose = () => {}
    client.connect().then((client) => {
      client
        .create(PersonBent, {
          name: 'Foobarbaz',
        })
        .then((ent) => {
          setEnt(ent)
          setData(ent.data)
          const subscription = ent.subscribe((ent) => {
            setEnt(ent)
            setData(ent.data)
          })
          dispose = () => {
            console.log('disposing subscription')
            subscription.unsubscribe()
          }
        })
    })
    return dispose
  }, [])
  const onUpdate = useCallback(async () => {
    await ent.update({
      name: 'randomEntName ' + Math.random().toString(36).slice(2),
    })
  }, [ent])

  return (
    <Screen>
      <Container as='main' padding='large'>
        <Stack>
          <PersonDisplay data={data} />
          <Button onClick={() => onUpdate()}>Update</Button>
        </Stack>
      </Container>
    </Screen>
  )
}
