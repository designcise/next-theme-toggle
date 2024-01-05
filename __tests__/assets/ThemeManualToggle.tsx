'use client'

import React from 'react'
import { useTheme } from '../../src/client'

export default function ToggleThemeButton() {
  const { theme, themes, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme.type === themes.dark.type ? themes.light : themes.dark)}>
      Toggle Theme
    </button>
  )
}
