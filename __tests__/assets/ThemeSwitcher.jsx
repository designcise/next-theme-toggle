import React from 'react'
import { useTheme } from '../../src/client'

export default function ThemeSwitcher() {
  const { theme, themes, color, setTheme } = useTheme()

  return (
    <>
      <div>Active Theme: {theme}</div>
      <div>Active Color: {color}</div>
      <button onClick={() => setTheme(themes.light)}>Light Theme</button>
      <button onClick={() => setTheme(themes.dark)}>Dark Theme</button>
      <button onClick={() => setTheme(themes.auto)}>Auto Theme</button>
    </>
  )
}
