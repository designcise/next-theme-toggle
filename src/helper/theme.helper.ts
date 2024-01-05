import { read, write, erase } from '../adapter/storage.adapter'
import { isServer } from './env.helper'
import { Theme, Themes, ThemeKeys, ThemeInput, Color, Colors } from '../types'

export const colors: Colors = { dark: 'dark', light: 'light' }

export const themes: Themes = {
  light: { type: 'light', color: colors.light },
  dark: { type: 'dark', color: colors.dark },
  auto: {
    type: 'auto',
    get color() {
      return isServer()
        ? undefined
        : window.matchMedia(`(prefers-color-scheme: ${themes.dark.color})`).matches
          ? themes.dark.color
          : themes.light.color
    },
  },
}

export const getThemeByKey = (storageKey: string, defaultTheme?: ThemeInput): Theme => {
  if (isServer()) return themes.dark

  const themeKey = read(storageKey) ?? defaultTheme

  if (typeof themeKey === 'undefined') {
    return themes.auto as Theme
  }

  return themes[themeKey] as Theme
}

const findThemeByProp = <T extends ThemeKeys>(prop: T, value: Theme[T]): Theme | null => {
  for (const [, theme] of Object.entries(themes)) {
    if (theme[prop] === value) {
      return theme
    }
  }

  return null
}

export const getColorByThemeType = (themeType?: Theme['type']): Color =>
  findThemeByProp('type', themeType ?? 'auto')?.color as Color

export const getThemeByColor = (color: Color): Theme | null => findThemeByProp('color', color)

export const getFlippedThemeByColor = (color: Color): Theme =>
  getThemeByColor(color)?.color === themes.dark.color ? themes.light : themes.dark

const applyTheme = (theme: ThemeInput) => {
  const color = getColorByThemeType(theme)
  const root = document.firstElementChild as HTMLHtmlElement
  root.classList.remove(...Object.values(colors))
  root.classList.add(color)
  root.style.colorScheme = color
}

export const saveTheme = (storageKey: string, theme: ThemeInput) => {
  erase(storageKey)
  write(storageKey, theme)
  applyTheme(theme)
}
