'use client'

import React, { useEffect, useState, useCallback } from 'react'
import ThemeContext from './ThemeContext'
import AntiFlickerScript from '../component/AntiFlickerScript'
import {
  themes,
  colors,
  flipThemeByColor,
  getColorByTheme,
  getTheme,
  saveTheme,
} from '../helper/theme.helper'

export default function ThemeProvider({ children, storageKey, defaultTheme = themes.auto }) {
  const [theme, setTheme] = useState(getTheme(storageKey, defaultTheme))
  const [color, setColor] = useState(getColorByTheme(theme))

  const updateTheme = useCallback(
    (storageKey, theme) => {
      setColor(getColorByTheme(theme))
      saveTheme(storageKey, theme)
    },
    [storageKey, theme, setColor],
  )

  const toggleTheme = useCallback(() => setTheme(flipThemeByColor(color)), [color, setTheme])

  useEffect(() => updateTheme(storageKey, theme), [storageKey, theme, updateTheme])

  useEffect(() => {
    if (typeof window === 'undefined' || theme !== themes.auto) {
      return
    }

    const updateFn = () => updateTheme(storageKey, theme)

    const mediaQuery = window.matchMedia(`(prefers-color-scheme: ${colors.dark})`)
    mediaQuery.addEventListener('change', updateFn)

    return () => mediaQuery.removeEventListener('change', updateFn)
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, themes, color, colors, toggleTheme, setTheme }}>
      <AntiFlickerScript storageKey={storageKey} defaultTheme={defaultTheme} />
      {children}
    </ThemeContext.Provider>
  )
}
