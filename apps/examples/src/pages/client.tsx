import {useEffect} from 'react'

import {Text} from 'ui'
import {client, PersonBent} from 'common/ent'

export default function Client() {
  useEffect(() => {
    client.connect().then((client) => {
      client
        .create(PersonBent, {
          name: 'This is a test object',
        })
        .then((ent) => {
          console.log(ent, client)
        })
    })
  }, [])
  return <Text>Check console</Text>
}
