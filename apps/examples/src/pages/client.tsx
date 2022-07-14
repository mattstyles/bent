import {useEffect, useState, useCallback, useMemo} from 'react'

import {Stack, Screen, Container, Select} from 'ui'
import {client, PersonBent} from 'common/ent'
import {PersonDisplay} from 'common/personDisplay'

const entData = [
  {
    name: 'Test 1',
  },
  {
    name: 'another ent',
  },
  {
    name: 'some string',
  },
]

export default function Client() {
  const [ent, setEnt] = useState<PersonBent | null>(null)
  const [ents, setEnts] = useState<Array<PersonBent>>([])
  useEffect(() => {
    client.connect().then((client) => {
      Promise.all(
        entData.map((data) => {
          return client.create(PersonBent, data)
        })
      ).then((ents) => {
        setEnt(ents[0])
        setEnts(ents)
        console.log(ents, client)
      })
    })
  }, [])
  const onSelectChange = useCallback(
    async (value: string) => {
      // const ent = ents.find((e) => e.id === value)
      // setEnt(ent)

      // We do already have all ent data but lets check that the client can fetch them, from cache.
      const ent = await client.get(value, PersonBent)
      if (ent == null) {
        throw new Error(
          'We should find all possible ents if client is working right'
        )
      }
      setEnt(ent)
    },
    [setEnt, ents]
  )
  const selectItems = useMemo(() => {
    return ents.map((ent) => {
      return {
        title: ent.id,
      }
    })
  }, [ents])

  return (
    <Screen>
      <Container as='main' padding='large'>
        <Stack>
          <PersonDisplay data={ent?.data ?? null} />
          <Select.Root value={ent?.id ?? ''} onValueChange={onSelectChange}>
            <Select.Trigger />
            <Select.Content title='Ents' items={selectItems} />
          </Select.Root>
        </Stack>
      </Container>
    </Screen>
  )
}
