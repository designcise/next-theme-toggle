import { createContext } from 'react'
import { ThemeContextType } from '../types'

export default createContext<ThemeContextType>({
  theme: undefined,
  themes: undefined,
  toggleTheme: () => {},
  setTheme: () => {},
})
