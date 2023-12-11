import { createContext } from 'react'

export default createContext({
  theme: undefined,
  themes: undefined,
  color: undefined,
  colors: undefined,
  toggleTheme: () => {},
  setTheme: () => {},
})
