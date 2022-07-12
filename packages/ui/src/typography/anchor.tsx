import {styled} from 'theme'

export const Anchor = styled('a', {
  fontFamily: 'inherit',
  fontSize: '$m',
  color: '$textHighlight',

  variants: {
    size: {
      small: {
        fontSize: '$s',
      },
      medium: {
        fontSize: '$m',
      },
      large: {
        fontSize: '$l',
      },
    },
  },
})
