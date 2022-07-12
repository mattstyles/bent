import {styled} from 'theme'

export const Spacer = styled('div', {
  defaultVariants: {
    size: 'medium',
    direction: 'v',
  },
  variants: {
    size: {
      small: {},
      medium: {},
      large: {},
    },
    direction: {
      h: {},
      v: {
        display: 'inline-block',
      },
    },
  },
  compoundVariants: [
    {
      size: 'small',
      direction: 'v',
      css: {
        padding: '$2 0',
      },
    },
    {
      size: 'medium',
      direction: 'v',
      css: {
        padding: '$3 0',
      },
    },
    {
      size: 'large',
      direction: 'v',
      css: {
        padding: '$5 0',
      },
    },
    {
      size: 'small',
      direction: 'h',
      css: {
        padding: '0 $2',
      },
    },
    {
      size: 'medium',
      direction: 'h',
      css: {
        padding: '0 $3',
      },
    },
    {
      size: 'large',
      direction: 'h',
      css: {
        padding: '0 $5',
      },
    },
  ],
})
