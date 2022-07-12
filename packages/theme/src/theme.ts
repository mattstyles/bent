import type * as Stitches from '@stitches/react'
import {createStitches} from '@stitches/react'

import {fonts, fontSizes, lineHeights} from './typography'
import {base as baseColors, grays, tokens as tokenColors} from './colors'
import {space, radii} from './scales'

export const {styled, css, theme, config, getCssText, globalCss, createTheme} =
  createStitches({
    theme: {
      colors: {
        ...baseColors,
        ...grays,
        ...tokenColors,
      },
      fonts: fonts,
      space: space,
      sizes: space,
      radii: radii,
      fontSizes,
      lineHeights,
    },
  })

export type CSS = Stitches.CSS<typeof config>
