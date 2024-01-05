import { Theme } from '../types'

export const read = (key: string) => localStorage.getItem(key) as Theme['type'] | null

export const write = (key: string, value: Theme['type']) => localStorage.setItem(key, value)

export const erase = (key: string) => localStorage.removeItem(key)

export const clear = () => localStorage.clear()
