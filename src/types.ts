export type Colors = { light: 'light'; dark: 'dark' }
export enum ThemeTypes {
  light = 'light',
  dark = 'dark',
  auto = 'auto',
}

export interface Theme {
  type: keyof typeof ThemeTypes
  color: Colors[keyof Colors]
}

export type ThemeKeys = keyof Theme

export interface Themes {
  light: Theme
  dark: Theme
  auto: Theme
}

export type ThemeInput = Theme['type']
export type Color = Theme['color']

export interface ThemeContextType {
  theme: Theme
  themes: Themes
  toggleTheme: () => void
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export interface ThemesProviderProps {
  children: React.ReactNode
  storageKey?: string
  defaultTheme?: ThemeInput
}

export interface AntiFlickerScriptProps {
  storageKey: string
  defaultTheme: ThemesProviderProps['defaultTheme']
}
