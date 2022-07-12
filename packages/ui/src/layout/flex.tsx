import {styled} from 'theme'

export const Flex = styled('div', {
  display: 'flex',

  defaultVariants: {
    orientation: 'v',
  },

  variants: {
    alignment: {
      center: {
        alignItems: 'center',
      },
    },
    orientation: {
      h: {
        flexDirection: 'row',
      },
      v: {
        flexDirection: 'column',
      },
    },
    size: {
      full: {
        flex: 1,
      },
      half: {
        flex: 1 / 2,
      },
      third: {
        flex: 1 / 3,
      },
      quarter: {
        flex: 1 / 4,
      },
    },
  },
})
