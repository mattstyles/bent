import {styled} from 'theme'

export const P = styled('p', {
  fontSize: '$m',
  lineHeight: '$m',
  marginBottom: '$3',
  color: '$text',

  variants: {
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
