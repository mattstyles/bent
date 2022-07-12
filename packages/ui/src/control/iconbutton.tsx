import {styled} from 'theme'
import {Button} from './button'

export const IconButton = styled(Button, {
  defaultVariants: {
    size: 'medium',
    iconColor: 'primary',
  },

  variants: {
    iconColor: {
      primary: {
        color: '$text',
      },
      onDark: {
        color: '$white',
      },
      muted: {
        color: '$gray400',
      },
    },
    size: {
      small: {
        width: '$5',
        height: '$5',
        padding: '$2',
      },
      medium: {
        width: '$6',
        height: '$6',
        padding: '$2',
      },
      large: {
        width: '$8',
        height: '$8',
        padding: '$3',
      },
    },
  },
})
