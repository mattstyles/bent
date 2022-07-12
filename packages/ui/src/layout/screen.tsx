import {styled} from 'theme'

export const Screen = styled('div', {
  minHeight: '100vh',
  minWidth: '100vw',

  defaultVariants: {
    color: 'primary',
  },

  variants: {
    color: {
      white: {
        backgroundColor: '$white',
      },
      dark: {
        backgroundColor: '$gray100',
      },
      primary: {
        backgroundColor: '$gray50',
      },
    },
  },
})
