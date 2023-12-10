import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../src/client'
import { mockLocalStorage, mockMatchMedia, mockPreferredColorScheme } from './mocks/device.mock'
import { read, write, clear } from '../src/adapter/storage.adapter'
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

describe('provider', () => {
  test('should set storage key according to the specified value', () => {
    const storageKey = 'theme-test'
    const expectedTheme = 'light'

    render(
      <ThemeProvider storageKey={storageKey} defaultTheme={expectedTheme}>
        <ThemeAutoToggle />
      </ThemeProvider>,
    )

    expect(read(storageKey)).toEqual(expectedTheme)
  })

  test.each(['light', 'dark'])(
    'should use the `defaultTheme` when nothing is stored in `localStorage`',
    (theme) => {
      const storageKey = 'test'

      render(
        <ThemeProvider storageKey={storageKey} defaultTheme={theme}>
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual(theme)
      expect(document.documentElement.classList[0]).toBe(theme)
      expect(document.documentElement.style.colorScheme).toBe(theme)
    },
  )

  test.each(['light', 'dark'])(
    'should auto-determine theme color when nothing is stored in `localStorage` and `defaultTheme` is set to "auto"',
    (color) => {
      const storageKey = 'test'
      mockPreferredColorScheme(color)

      render(
        <ThemeProvider storageKey={storageKey} defaultTheme="auto">
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual('auto')
      expect(document.documentElement.classList[0]).toBe(color)
      expect(document.documentElement.style.colorScheme).toBe(color)
    },
  )

  test.each(['light', 'dark'])(
    'should set `color-scheme` and `class` to "%s" theme color according to saved theme preference',
    (color) => {
      const storageKey = 'test'
      write(storageKey, color)

      render(
        <ThemeProvider storageKey={storageKey}>
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(document.documentElement.classList[0]).toBe(color)
      expect(document.documentElement.style.colorScheme).toBe(color)
    },
  )

  test.each(['light', 'dark', 'auto'])(
    'should use system resolved "%s" color and "auto" theme when no `defaultTheme` is provided and nothing is stored in `localStorage`',
    (color) => {
      const storageKey = 'sys-resolved-theme'
      const prefColor = color === 'auto' ? 'dark' : color

      mockPreferredColorScheme(prefColor)

      render(
        <ThemeProvider storageKey={storageKey}>
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual('auto')
      expect(document.documentElement.classList[0]).toBe(prefColor)
      expect(document.documentElement.style.colorScheme).toBe(prefColor)
    },
  )

  test.each(['light', 'dark'])(
    'should set theme color automatically based on user system preference',
    (sysPrefColor) => {
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
    },
  )

  test.each([
    ['light', 'dark'],
    ['dark', 'light'],
  ])('should ignore nested `ThemeProvider`', (expectedTheme, nestedTheme) => {
    const storageKey = 'test'

    render(
      <ThemeProvider storageKey={storageKey} defaultTheme={expectedTheme}>
        <ThemeProvider storageKey={storageKey} defaultTheme={nestedTheme}>
          <ThemeAutoToggle />
        </ThemeProvider>
      </ThemeProvider>,
    )

    expect(document.documentElement.classList[0]).toBe(expectedTheme)
  })

  test.each([
    ['light', 'dark'],
    ['dark', 'light'],
  ])(
    'should update value in storage when toggling from "%s" to "%s" theme',
    (themeFrom, themeTo) => {
      const storageKey = 'test'

      render(
        <ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual(themeFrom)

      fireEvent.click(screen.getByText(/toggle theme/i))

      expect(read(storageKey)).toEqual(themeTo)
    },
  )

  test.each([
    ['light', 'dark'],
    ['dark', 'light'],
  ])(
    'should update value in storage when manually setting theme from "%s" to "%s"',
    (themeFrom, themeTo) => {
      const storageKey = 'test'

      render(
        <ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
          <ThemeManualToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual(themeFrom)

      fireEvent.click(screen.getByText(/toggle theme/i))

      expect(read(storageKey)).toEqual(themeTo)
    },
  )

  test.each(['light', 'dark'])('should switch from "auto" to "%s"', (theme) => {
    const storageKey = 'sys-resolved-theme'
    const oppositeTheme = theme === 'dark' ? 'light' : 'dark'
    mockPreferredColorScheme(oppositeTheme)

    render(
      <ThemeProvider storageKey={storageKey} defaultTheme="auto">
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    expect(read(storageKey)).toEqual('auto')
    expect(document.documentElement.classList[0]).toBe(oppositeTheme)
    expect(document.documentElement.style.colorScheme).toBe(oppositeTheme)

    fireEvent.click(screen.getByText(new RegExp(`${theme} theme`, 'i')))

    expect(read(storageKey)).toEqual(theme)
    expect(document.documentElement.classList[0]).toBe(theme)
    expect(document.documentElement.style.colorScheme).toBe(theme)
  })

  test.each(['light', 'dark'])('should switch from "%s" to "auto"', (theme) => {
    const storageKey = 'sys-resolved-theme'
    const oppositeTheme = theme === 'dark' ? 'light' : 'dark'
    mockPreferredColorScheme(oppositeTheme)

    render(
      <ThemeProvider storageKey={storageKey} defaultTheme={theme}>
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    expect(read(storageKey)).toEqual(theme)
    expect(document.documentElement.classList[0]).toBe(theme)
    expect(document.documentElement.style.colorScheme).toBe(theme)

    fireEvent.click(screen.getByText('Auto Theme'))

    expect(read(storageKey)).toEqual('auto')
    expect(document.documentElement.classList[0]).toBe(oppositeTheme)
    expect(document.documentElement.style.colorScheme).toBe(oppositeTheme)
  })

  test('should not set `colorScheme` and class name to "auto"', () => {
    const storageKey = 'sys-resolved-theme'

    render(
      <ThemeProvider storageKey={storageKey} theme="auto">
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    expect(document.documentElement.classList[0]).not.toBe('auto')
    expect(document.documentElement.style.colorScheme).not.toBe('auto')
  })
})
