// @ts-nocheck
import './mocks/matchMedia.mock'
import './mocks/localStorage.mock'
import { mockPreferredColorScheme } from './mocks/device.mock'
import { write, clear } from '../src/adapter/storage.adapter'
import {
  themes,
  colors,
  getFlippedThemeByColor,
  getThemeByKey,
  getColorByThemeType,
} from '../src/helper/theme.helper'
import { ThemeTypes } from '../src/types'

const storageKey = 'theme-pref'

beforeEach(() => {
  clear()
})

describe('getThemeByKey()', () => {
  test.each([
    [undefined, undefined, themes.auto],
    [undefined, 'dark', themes.dark],
    [undefined, 'light', themes.light],
    [undefined, 'auto', themes.auto],
    ['dark', undefined, themes.dark],
    ['light', undefined, themes.light],
    ['auto', undefined, themes.auto],
    ['dark', 'light', themes.dark],
    ['light', 'dark', themes.light],
    ['auto', 'light', themes.auto],
  ])(
    'should get the theme from storage or the fallback',
    (storedTheme, defaultTheme, expectedTheme) => {
      if (storedTheme) {
        write(storageKey, storedTheme)
      }

      const activeTheme = getThemeByKey(storageKey, defaultTheme)

      expect(activeTheme).toEqual(expectedTheme)
    },
  )
})

describe('getColorByThemeType()', () => {
  test.each([
    [themes.dark, colors.dark],
    [themes.light, colors.light],
    [themes.auto, colors.dark],
  ])(
    'should get the color based on the theme (theme: "%o", color: "%s")',
    (theme, expectedColor) => {
      if (theme.type === ThemeTypes.auto) {
        mockPreferredColorScheme(expectedColor)
      }

      expect(getColorByThemeType(theme.type)).toEqual(expectedColor)
    },
  )
})

describe('getFlippedThemeByColor()', () => {
  test.each([
    [colors.dark, themes.light],
    [colors.light, themes.dark],
  ])(
    'should get the opposite theme based on the color (color: "%s", theme: "%o")',
    (color, expectedTheme) => {
      expect(getFlippedThemeByColor(color)).toEqual(expectedTheme)
    },
  )
})

describe('themes.auto.color', () => {
  test.each(['dark', 'light'])(
    'should automatically determine the color based on the system preferred color "%s"',
    prefColor => {
      mockPreferredColorScheme(prefColor)
      expect(themes.auto.color).toEqual(prefColor)
    },
  )
})
