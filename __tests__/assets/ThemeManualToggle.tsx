'use client'

import React from 'react'
import { useTheme } from '../../src/client'

export default function ToggleThemeButton() {
  const { theme, themes, colors, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === themes.dark ? colors.light : colors.dark)}>
      Toggle Theme
    </button>
  )
}
