import {useEffect, useState, useCallback} from 'react'

import {Container, Text, Screen, Button, Input, Stack} from 'ui'
import {PersonBent} from 'common/ent'

const instance = new PersonBent({
  _id: '123',
  name: 'Test Entity',
})

/**
 * Updates are a bit clunky here.
 * It will smooth out when ent data becomes observable.
 */
export default function Basic() {
  const [name, setName] = useState(instance.data.name)
  const [newName, setNewName] = useState('')
  const onUpdate = useCallback(async () => {
    await instance.update({name: newName})
    setName(instance.data.name)
  }, [newName])
  const onChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement
      setNewName(target.value)
    },
    [setNewName]
  )
  const onKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter') {
        onUpdate()
      }
    },
    [onUpdate]
  )
  useEffect(() => {
    instance.gen().then((ent) => {
      console.log('Ent generated', ent.data._id)
    })
  }, [])

  return (
    <Screen>
      <Container as='main' padding='large'>
        <Stack gap='large'>
          <Text>{`Name: ${name}`}</Text>
          <Stack orientation='h'>
            <Input onChange={onChange} onKeyDown={onKeydown} value={newName} />
            <Button onClick={onUpdate}>Update</Button>
          </Stack>
        </Stack>
      </Container>
    </Screen>
  )
}
