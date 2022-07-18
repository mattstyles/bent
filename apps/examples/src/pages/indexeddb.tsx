import {useEffect, useState} from 'react'
import type {GetEntityData, ClassOf} from '@usul/entity'
import type {ID} from '@usul/core'
import {Bent} from '@usul/entity'
import type {UniverseBents} from 'common/indexedEnt'

import {Text, Stack, Screen, Container, Flex, Spacer} from 'ui'
import {styled} from 'theme'
import {AvatarBent, client} from 'common/indexedEnt'

export default function IndexedDB() {
  return (
    <Screen>
      <Container as='main' padding='large'>
        <WaitForClient>
          <Stack>
            <Avatar id='hedylamarr' />
            <Avatar id='katherinejohnson' />
          </Stack>
        </WaitForClient>
      </Container>
    </Screen>
  )
}

function WaitForClient({children}) {
  const isReady = useClient()
  return isReady && children
}

function Avatar({id}: {id: ID}) {
  const avatar = useBent(id, AvatarBent)
  if (avatar.data == null) {
    return null
  }

  return <DisplayAvatar name={avatar.data.name} image={avatar.data.image} />
}

type useBentOutput<B extends Bent> = {
  ent: B
  data: GetEntityData<B>
}
function useBent(
  id: ID,
  Bent: ClassOf<UniverseBents>
): useBentOutput<UniverseBents> {
  const [ent, setEnt] = useState<UniverseBents | null>(null)
  const [data, setData] = useState<GetEntityData<UniverseBents> | null>(null)
  useEffect(() => {
    let dispose = () => {}
    client.get(id, Bent).then((ent) => {
      setEnt(ent)
      setData(ent.data)
      const subscription = ent.subscribe((ent) => {
        setEnt(ent)
        setData(ent.data)
      })
      dispose = () => subscription.unsubscribe()
    })
    return dispose
  }, [id])
  return {
    ent,
    data,
  }
}

// This would be best served as a provider to provide the client to the tree
function useClient(): boolean {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    client.connect().then(() => {
      setIsReady(true)
    })
  }, [])
  return isReady
}

function DisplayAvatar({name, image}: {name: string; image: string}) {
  return (
    <Card>
      <Stack>
        <Flex orientation='h' alignment='center'>
          <Image src={image} alt={name} />
          <Spacer direction='h' />
          <Stack orientation='h'>
            <Text>Name:</Text>
            <Text>{name}</Text>
          </Stack>
        </Flex>
      </Stack>
    </Card>
  )
}

const Card = styled('div', {
  padding: '$4',
  backgroundColor: '$gray200',
  borderRadius: '$2',
})

const Image = styled('img', {
  borderRadius: '$round',
  width: '$8',
  height: '$8',
})
