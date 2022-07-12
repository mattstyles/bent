import {styled} from 'theme'
import {Flex} from '../layout/flex'

export const Container = styled(Flex, {
  defaultVariants: {
    color: 'primary',
    padding: 'small',
  },

  variants: {
    color: {
      white: {
        backgroundColor: '$white',
      },
      gray: {
        backgroundColor: '$gray100',
      },
      primary: {
        backgroundColor: '$gray50',
      },
      dark: {
        backgroundColor: '$gray800',
      },
    },
    padding: {
      none: {
        padding: 0,
      },
      small: {
        padding: '$4',
      },
      medium: {
        padding: '$6',
      },
      large: {
        padding: '$7',
      },
    },
  },
})
