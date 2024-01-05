import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import { ThemeContextType } from '../types'

export default function useTheme() {
  return useContext<ThemeContextType>(ThemeContext)
}
