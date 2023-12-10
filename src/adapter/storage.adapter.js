export const read = (key) => localStorage.getItem(key)

export const write = (key, value) => {
  localStorage.setItem(key, value)
}

export const erase = (key) => {
  localStorage.removeItem(key)
}

export const clear = () => {
  localStorage.clear()
}
