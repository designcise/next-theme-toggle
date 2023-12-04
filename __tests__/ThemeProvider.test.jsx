import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { themes, ThemeProvider } from '../src/client'
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

  test.skip.each(['light', 'dark'])(
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

  test.skip.each(['light', 'dark', 'auto'])(
    'should use the `defaultTheme` when nothing is stored in `localStorage`',
    (theme) => {
      const storageKey = 'test'

      let userTheme = theme

      if (userTheme === 'auto') {
        userTheme = 'dark'
        mockPreferredColorScheme(userTheme)
      }

      render(
        <ThemeProvider storageKey={storageKey} defaultTheme={userTheme}>
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual(userTheme)
      expect(document.documentElement.classList[0]).toBe(userTheme)
      expect(document.documentElement.style.colorScheme).toBe(userTheme)
    },
  )

  test.skip.each(['light', 'dark'])(
    'should set `color-scheme` and `class` to "%s" theme according to saved preference',
    (theme) => {
      const storageKey = 'test'
      write(storageKey, theme)

      render(
        <ThemeProvider storageKey={storageKey}>
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(document.documentElement.classList[0]).toBe(theme)
      expect(document.documentElement.style.colorScheme).toBe(theme)
    },
  )

  test.skip.each(['light', 'dark', 'auto'])(
    'should set resolve to system resolved theme "%s"',
    (theme) => {
      const storageKey = 'sys-resolved-theme'
      mockPreferredColorScheme(theme)

      let userTheme = theme

      if (userTheme === 'auto') {
        userTheme = 'dark'
        mockPreferredColorScheme(userTheme)
      }

      render(
        <ThemeProvider storageKey={storageKey}>
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual(userTheme)
      expect(document.documentElement.classList[0]).toBe(userTheme)
      expect(document.documentElement.style.colorScheme).toBe(userTheme)
    },
  )

  test.skip.each([
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

  test.skip.each([
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

  test.skip.each([
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

  test.skip('should set storage key according to the specified value', () => {
    const storageKey = 'theme-test'
    const expectedTheme = 'light'

    render(
      <ThemeProvider storageKey={storageKey} defaultTheme={expectedTheme}>
        <ThemeAutoToggle />
      </ThemeProvider>,
    )

    expect(read(storageKey)).toEqual(expectedTheme)
  })

  test.skip.each(['light', 'dark'])(
    'should set theme automatically based on user system preference',
    (sysTheme) => {
      const storageKey = 'sys-resolved-theme'
      mockPreferredColorScheme(sysTheme)

      render(
        <ThemeProvider storageKey={storageKey} defaultTheme="auto">
          <ThemeAutoToggle />
        </ThemeProvider>,
      )

      expect(read(storageKey)).toEqual(sysTheme)
      expect(document.documentElement.classList[0]).toBe(sysTheme)
      expect(document.documentElement.style.colorScheme).toBe(sysTheme)
    },
  )

  test.skip.each(['light', 'dark'])('should switch from "auto" to "%s"', (theme) => {
    const storageKey = 'sys-resolved-theme'
    const oppositeTheme = theme === 'dark' ? 'light' : 'dark'
    mockPreferredColorScheme(oppositeTheme)

    render(
      <ThemeProvider storageKey={storageKey} defaultTheme="auto">
        <ThemeSwitcher />
      </ThemeProvider>,
    )

    expect(read(storageKey)).toEqual(oppositeTheme)
    expect(document.documentElement.classList[0]).toBe(oppositeTheme)
    expect(document.documentElement.style.colorScheme).toBe(oppositeTheme)

    fireEvent.click(screen.getByText(new RegExp(`${theme} theme`, 'i')))

    expect(read(storageKey)).toEqual(theme)
    expect(document.documentElement.classList[0]).toBe(theme)
    expect(document.documentElement.style.colorScheme).toBe(theme)
  })

  test.skip.each(['light', 'dark'])('should switch from "%s" to "auto"', (theme) => {
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

    fireEvent.click(screen.getByText(new RegExp(`auto theme`, 'i')))

    expect(read(storageKey)).toEqual('auto')
    expect(document.documentElement.classList[0]).toBe(oppositeTheme)
    expect(document.documentElement.style.colorScheme).toBe(oppositeTheme)
  })

  test.skip('should not set `colorScheme` and class name to "auto"', () => {
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
