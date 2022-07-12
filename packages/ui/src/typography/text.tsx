import {styled} from 'theme'

export const Text = styled('span', {
  defaultVariants: {
    size: 'medium',
    color: 'primary',
  },

  variants: {
    color: {
      primary: {
        color: '$text',
      },
      onDark: {
        color: '$white',
      },
    },
    size: {
      small: {
        fontSize: '$s',
        lineHeight: '$s',
      },
      medium: {
        fontSize: '$m',
        lineHeight: '$m',
      },
      large: {
        fontSize: '$l',
        lineHeight: '$l',
      },
    },
  },
})
