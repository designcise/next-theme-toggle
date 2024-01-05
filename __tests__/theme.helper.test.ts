import './mocks/matchMedia.mock'
import './mocks/localStorage.mock'
import { mockPreferredColorScheme } from './mocks/device.mock'
import { write, clear } from '../src/adapter/storage.adapter'
import { colors, flipThemeByColor, getTheme, getColorByTheme } from '../src/helper/theme.helper'

const storageKey = 'theme-pref'

beforeEach(() => {
  clear()
})

describe('getTheme()', () => {
  test.each([
    [undefined, undefined, 'auto'],
    [undefined, 'dark', 'dark'],
    [undefined, 'light', 'light'],
    [undefined, 'auto', 'auto'],
    ['dark', undefined, 'dark'],
    ['light', undefined, 'light'],
    ['auto', undefined, 'auto'],
    ['dark', 'light', 'dark'],
    ['light', 'dark', 'light'],
    ['auto', 'light', 'auto'],
  ])(
    'should get the theme from storage or the fallback',
    (storedTheme, defaultTheme, expectedTheme) => {
      if (storedTheme) {
        write(storageKey, storedTheme)
      }

      expect(getTheme(storageKey, defaultTheme)).toEqual(expectedTheme)
    },
  )
})

describe('getColorByTheme()', () => {
  test.each([
    ['dark', colors.dark],
    ['light', colors.light],
    ['auto', colors.dark],
  ])('should get the color based on the theme', (theme, expectedColor) => {
    if (theme === 'auto') {
      mockPreferredColorScheme(expectedColor)
    }

    expect(getColorByTheme(theme)).toEqual(expectedColor)
  })
})

describe('flipThemeByColor()', () => {
  test.each([
    [colors.dark, 'light'],
    [colors.light, 'dark'],
  ])('should get the opposite theme based on the color', (color, expectedTheme) => {
    expect(flipThemeByColor(color)).toEqual(expectedTheme)
  })
})

describe('colors', () => {
  test.each(['dark', 'light'])(
    'should automatically determine the color based on the system preferred color',
    (prefColor) => {
      mockPreferredColorScheme(prefColor)
      expect(colors.auto).toEqual(prefColor)
    },
  )
})
