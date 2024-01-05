import React from 'react'
import { useTheme } from '../../src/client'

export default function ThemeAutoColor() {
  const { theme, themes } = useTheme()

  return (
    <>
      <div>Active Theme: {theme.type}</div>
      <div>Auto-determined Color: {themes.auto.color}</div>
    </>
  )
}
