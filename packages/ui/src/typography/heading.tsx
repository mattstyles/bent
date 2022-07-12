import {styled} from 'theme'

export const Heading = styled('h1', {
  defaultVariants: {
    color: 'primary',
    style: 'h1',
  },

  variants: {
    color: {
      primary: {
        color: '$heading',
      },
      onDark: {
        color: '$white',
      },
    },
    style: {
      h1: {
        fontSize: '$h1',
        lineHeight: '$h1',
      },
      h2: {
        fontSize: '$h2',
        lineHeight: '$h2',
      },
      h3: {
        fontSize: '$h3',
        lineHeight: '$h3',
      },
    },
  },
})
