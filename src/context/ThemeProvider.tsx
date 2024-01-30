import React, { useEffect, useState, useCallback } from 'react'
import ThemeContext from './ThemeContext'
import AntiFlickerScript from '../component/AntiFlickerScript'
import {
  themes,
  colors,
  getFlippedThemeByColor,
  getThemeByKey,
  saveTheme,
  getThemeByColor,
} from '../helper/theme.helper'
import { Theme, ThemesProviderProps, ThemeTypes, Color } from '../types'
import { DEFAULT_STORAGE_KEY } from '../helper/env.helper'

const defaultProps = {
  storageKey: DEFAULT_STORAGE_KEY,
  defaultTheme: ThemeTypes.auto,
}

export default function ThemeProvider(props: ThemesProviderProps) {
  const { children, storageKey, defaultTheme } = {
    ...defaultProps,
    ...props,
  }
  const [theme, setTheme] = useState<Theme>(getThemeByKey(storageKey, defaultTheme))
  const { type, color } = theme

  const toggleTheme = useCallback(() => setTheme(getFlippedThemeByColor(color)), [color, setTheme])

  useEffect(() => saveTheme(storageKey, type), [storageKey, type])

  useEffect(() => {
    if (typeof window === 'undefined' || type !== themes.auto.type) {
      return
    }

    const updateFn = () => {
      setTheme(getThemeByColor(themes.auto.color as Color) as Theme)
      saveTheme(storageKey, type)
    }

    const mediaQuery = window.matchMedia(`(prefers-color-scheme: ${colors.dark})`)
    mediaQuery.addEventListener('change', updateFn)

    return () => mediaQuery.removeEventListener('change', updateFn)
  }, [type, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, themes, toggleTheme, setTheme }}>
      <AntiFlickerScript storageKey={storageKey} defaultTheme={defaultTheme} />
      {children}
    </ThemeContext.Provider>
  )
}
