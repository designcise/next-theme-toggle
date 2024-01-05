import React from 'react'
import { useTheme } from '../../src/client'

export default function ThemeAutoColor() {
  const { theme, colors } = useTheme()

  return (
    <>
      <div>Active Theme: {theme}</div>
      <div>Auto-determined Color: {colors.auto}</div>
    </>
  )
}
