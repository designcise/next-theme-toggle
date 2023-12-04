import { read, write, erase } from '../adapter/storage.adapter'
import { isServer } from './env.helper'

export const themes = { dark: 'dark', light: 'light', auto: 'auto' }
export const colors = {
  [themes.dark]: 'dark',
  [themes.light]: 'light',
  get [themes.auto]() {
    return isServer()
      ? undefined
      : window.matchMedia(`(prefers-color-scheme: ${this[themes.dark]})`).matches
        ? this[themes.dark]
        : this[themes.light]
  },
}

export const getTheme = (storageKey, defaultTheme) =>
  isServer() ? undefined : read(storageKey) ?? defaultTheme ?? themes.auto

export const getColorByTheme = (theme) => (isServer() ? undefined : colors[theme ?? theme.auto])

const colorToTheme = {
  [colors.dark]: themes.dark,
  [colors.light]: themes.light,
}

export const flipThemeByColor = (color) =>
  colorToTheme[color] === themes.dark ? themes.light : themes.dark

const applyTheme = (theme) => {
  const color = getColorByTheme(theme)
  const root = document.firstElementChild
  root.classList.remove(...Object.values(colors))
  root.classList.add(color)
  root.style.colorScheme = color
}

export const saveTheme = (storageKey, theme) => {
  erase(storageKey)
  write(storageKey, theme)
  applyTheme(theme)
}
