import React from 'react'
import { useTheme } from '../../src/client'

export default function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme()

  return (
    <>
      <div>Active Theme: {theme.type}</div>
      <div>Active Color: {theme.color}</div>
      <button onClick={() => setTheme(themes.light)}>Light Theme</button>
      <button onClick={() => setTheme(themes.dark)}>Dark Theme</button>
      <button onClick={() => setTheme(themes.auto)}>Auto Theme</button>
    </>
  )
}
