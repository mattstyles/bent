import Head from 'next/head'
import Link from 'next/link'

import {Container, Anchor, Stack} from 'ui'

export default function Home() {
  return (
    <Container as='main' padding='large'>
      <Head>
        <title>UIE Challenges</title>
        <meta name='description' content='Examples of the bent framework' />
      </Head>
      <Stack gap='small'>
        {links.map(({href, title}) => {
          return (
            <Link key={href} href={href} passHref>
              <Anchor>{title}</Anchor>
            </Link>
          )
        })}
      </Stack>
    </Container>
  )
}

const links: Array<{href: string; title: string}> = [
  {href: '/basic', title: 'Basic'},
  {href: '/client', title: 'Client'},
  {href: '/subscription', title: 'Subscription'},
  {href: '/indexeddb', title: 'Indexed DB'},
]
