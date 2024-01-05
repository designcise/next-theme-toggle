import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, themes } from '../src/client'
import { mockLocalStorage, mockMatchMedia, mockPreferredColorScheme } from './mocks/device.mock'
import { clear, read } from '../src/adapter/storage.adapter'
import ThemeAutoToggle from './assets/ThemeAutoToggle'
import ThemeManualToggle from './assets/ThemeManualToggle'
import ThemeSwitcher from './assets/ThemeSwitcher'

beforeAll(() => {
  mockLocalStorage()
  mockMatchMedia()
})

beforeEach(() => {
  clear()
  document.documentElement.style.colorScheme = ''
  document.documentElement.removeAttribute('class')
})

describe('useTheme()', () => {
  test.each([
    ['light', 'dark'],
    ['dark', 'light'],
  ])('should toggle "%s" theme to "%s"', (themeFrom, themeTo) => {
    const storageKey = 'test'

    render(
      <ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
        <ThemeAutoToggle />
      </ThemeProvider>,
    )

    expect(read(storageKey)).toEqual(themeFrom)
    expect(document.documentElement.classList[0]).toBe(themeFrom)
    expect(document.documentElement.style.colorScheme).toBe(themeFrom)

    fireEvent.click(screen.getByText(/toggle theme/i))

    expect(read(storageKey)).toEqual(themeTo)
    expect(document.documentElement.classList[0]).toBe(themeTo)
    expect(document.documentElement.style.colorScheme).toBe(themeTo)
  })

  test.each([
    ['light', 'dark'],
    ['dark', 'light'],
  ])(
    'should toggle from system resolved "%s" theme to opposite theme "%s" when using `toggle` function',
    (themeFrom, themeTo) => {
      const storageKey = 'sys-resolved-theme'
      mockPreferredColorScheme(themeFrom)

      render(
        <ThemeProvider storageKey={storageKey}>
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual('auto')
      expect(document.documentElement.classList[0]).toBe(themeFrom)
      expect(document.documentElement.style.colorScheme).toBe(themeFrom)

      fireEvent.click(screen.getByText(/toggle theme/i))

      expect(read(storageKey)).toEqual(themeTo)
      expect(document.documentElement.classList[0]).toBe(themeTo)
      expect(document.documentElement.style.colorScheme).toBe(themeTo)
    },
  )

  test.each([
    ['light', 'dark'],
    ['dark', 'light'],
  ])('should get right values to manually set theme from "%s" to "%s"', (themeFrom, themeTo) => {
    const storageKey = 'test'

    render(
      <ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
        <ThemeManualToggle />
      </ThemeProvider>,
    )

    expect(read(storageKey)).toEqual(themeFrom)

    fireEvent.click(screen.getByText(/toggle theme/i))

    expect(read(storageKey)).toEqual(themeTo)
  })

  test.each([themes.light, themes.dark])(
    'should get "%s" as the active `theme` and `color`',
    (theme) => {
      const storageKey = 'user-theme'
      const oppositeTheme = theme.type === 'light' ? themes.dark.type : themes.light.type

      render(
        <ThemeProvider storageKey={storageKey} defaultTheme={oppositeTheme}>
          <ThemeSwitcher />
        </ThemeProvider>,
      )

      fireEvent.click(screen.getByText(new RegExp(`${theme.type} theme`, 'i')))

      expect(screen.getByText(`Active Theme: ${theme.type}`)).toBeInTheDocument()
      expect(screen.getByText(`Active Color: ${theme.color}`)).toBeInTheDocument()
      expect(read(storageKey)).toEqual(theme.type)
    },
  )

  test.each(['light', 'dark'])(
    'should get "%s" as the active `color` when theme is set to "auto"',
    (colorScheme) => {
      const storageKey = 'user-theme'
      mockPreferredColorScheme(colorScheme)

      render(
        <ThemeProvider storageKey={storageKey} defaultTheme="auto">
          <ThemeSwitcher />
        </ThemeProvider>,
      )

      expect(screen.getByText('Active Theme: auto')).toBeInTheDocument()
      expect(screen.getByText(`Active Color: ${colorScheme}`)).toBeInTheDocument()
    },
  )

  test.each([
    ['light', 'dark'],
    ['dark', 'light'],
  ])(
    'should switch to opposite color of "%s" when toggling from "auto"',
    (sysPrefColor, switchToTheme) => {
      const storageKey = 'sys-resolved-theme'
      mockPreferredColorScheme(sysPrefColor)

      render(
        <ThemeProvider storageKey={storageKey} defaultTheme="auto">
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual('auto')
      expect(document.documentElement.classList[0]).toBe(sysPrefColor)
      expect(document.documentElement.style.colorScheme).toBe(sysPrefColor)

      fireEvent.click(screen.getByText(/toggle theme/i))

      expect(read(storageKey)).toEqual(switchToTheme)
      expect(document.documentElement.classList[0]).toBe(switchToTheme)
      expect(document.documentElement.style.colorScheme).toBe(switchToTheme)
    },
  )

  test.each(['light', 'dark'])(
    'should auto-determine color to be "%s" via `colors.auto`',
    (prefColor) => {
      const storageKey = 'sys-resolved-theme'
      mockPreferredColorScheme(prefColor)

      render(
        <ThemeProvider storageKey={storageKey} defaultTheme="auto">
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual('auto')
      expect(document.documentElement.classList[0]).toBe(prefColor)
      expect(document.documentElement.style.colorScheme).toBe(prefColor)
    },
  )
})
