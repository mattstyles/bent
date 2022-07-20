import {Suspense, useState} from 'react'
import {BentProvider, useBent} from '@usul/bent-react'
import type {ID} from '@usul/core'

import {
  Text,
  Stack,
  Spacer,
  Flex,
  Screen,
  Container,
  ClientOnly,
  Button,
} from 'ui'
import {styled} from 'theme'
import {AvatarBent, client} from 'common/indexedEnt'

export default function ReactExample() {
  return (
    <Screen>
      <Container
        as='main'
        padding='large'
        css={{
          maxWidth: '680px',
          margin: 'auto',
        }}>
        <Suspense fallback={<AppFallback />}>
          <BentProvider client={client}>
            <Text>Client status: Connected</Text>
            <Spacer direction='v' size='large' />
            <ClientOnly>
              <Stack gap='verylarge'>
                {/**
              <Suspense fallback={<ProfileFallback id={'hedylamarr'} />}>
                <Profile id='hedylamarr' />
              </Suspense>
              */}
                <SwapID />
                <Suspense fallback={<UpdaterFallback />}>
                  <UpdateBent />
                </Suspense>
              </Stack>
            </ClientOnly>
          </BentProvider>
        </Suspense>
      </Container>
    </Screen>
  )
}

function AppFallback() {
  return <Text>App-level suspense fallback</Text>
}

function ProfileFallback({id}: {id: ID}) {
  return <Text>Loading profile: {id}</Text>
}

function UpdaterFallback() {
  return <Text>Loading updater</Text>
}

function Profile({id}: {id: ID}) {
  const {data} = useBent(id, AvatarBent)

  if (data == null) {
    return <Text>No Data</Text>
  }

  return <DisplayAvatar name={data.name} image={data.image} />
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

function SwapID() {
  const [id, setId] = useState<ID>('hedylamarr')
  return (
    <Stack>
      <Text>Example of swapping the ID as a prop and having bents reload</Text>
      <Button
        onClick={() =>
          setId((id) =>
            id === 'hedylamarr' ? 'katherinejohnson' : 'hedylamarr'
          )
        }>
        Change ID
      </Button>
      <Text>Current ID: {id}</Text>
      <Suspense fallback={<ProfileFallback id={id} />}>
        <Profile id={id} />
      </Suspense>
    </Stack>
  )
}

function UpdateBent() {
  const {ent} = useBent('hedylamarr', AvatarBent)

  return (
    <Stack>
      <Text>
        Updating the properties of an ent should be reflected everywhere that
        ent is displayed.
      </Text>
      <Text>Check indexedDB too as values will be persisted.</Text>
      <Button
        onClick={() => {
          ent.update({
            name: 'hedylamarr_' + Math.random().toString(36).slice(2),
          })
        }}>
        Update
      </Button>
      <Button
        onClick={() => {
          ent.update({
            name: 'Hedy Lamarr',
          })
        }}>
        Reset
      </Button>
    </Stack>
  )
}
