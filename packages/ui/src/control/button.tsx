import {styled} from 'theme'

export const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  borderColor: '$transparent',
  borderWidth: '2px',
  borderStyle: 'solid',
  padding: '0 $5',
  height: '$7',
  letterSpacing: '-0.2px',

  defaultVariants: {
    color: 'dark',
  },

  variants: {
    color: {
      white: {
        backgroundColor: '$white',
        color: '$text',
        '&:hover': {
          backgroundColor: '$gray100',
        },
        '&:focus': {
          borderColor: '$gray400',
        },
      },
      transparent: {
        backgroundColor: '$transparent',
        color: '$text',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '&:focus': {
          borderColor: 'rgba(0, 0, 0, 0.35)',
        },
      },
      dark: {
        backgroundColor: '$gray700',
        color: '$white',
        '&:hover': {
          backgroundColor: '$gray800',
        },
        '&:focus': {
          borderColor: '$gray400',
        },
        '&:disabled': {
          backgroundColor: '$gray500',
          color: '$gray200',
          '&:hover': {
            backgroundColor: '$gray500',
          },
        },
      },
    },
    isCircular: {
      true: {
        borderRadius: '$round',
      },
    },
  },
})
