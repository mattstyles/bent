import {Text, Stack} from 'ui'
import {styled} from 'theme'
import {PersonBent} from 'common/ent'
import type {GetEntityData} from '@usul/entity'

// export function PersonDisplay({ent}: {ent?: PersonBent}) {
export function PersonDisplay({data}: {data?: GetEntityData<PersonBent>}) {
  if (data == null) {
    return (
      <Card>
        <Text>No ent data to display</Text>
      </Card>
    )
  }

  return (
    <Card>
      <Stack>
        <Stack orientation='h'>
          <Text css={{color: 'gray700'}}>Id:</Text>
          <Text>{data._id}</Text>
        </Stack>
        <Stack orientation='h'>
          <Text>Name:</Text>
          <Text>{data.name}</Text>
        </Stack>
      </Stack>
    </Card>
  )
}

const Card = styled('div', {
  padding: '$4',
  backgroundColor: '$gray200',
  borderRadius: '$2',
})
