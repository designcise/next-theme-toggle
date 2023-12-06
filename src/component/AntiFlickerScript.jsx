import React, { memo } from 'react'
import { themes, colors as palette } from '../helper/theme.helper'

export default memo(
  function AntiFlickerScript({ storageKey }) {
    const { [themes.auto]: _, ...colors } = palette
    const classList = Object.values(colors).join("','")
    const preferredTheme = `localStorage.getItem('${storageKey}')`
    const fallbackTheme = `(window.matchMedia('(prefers-color-scheme: ${colors.dark})').matches ? '${colors.dark}' : '${colors.light}')`
    const script =
      '(function(root){' +
      `const pref=${preferredTheme};` +
      `const theme=(pref&&pref!=='${themes.auto}')?pref:${fallbackTheme};` +
      `root.classList.remove('${classList}');root.classList.add(theme);root.style.colorScheme=theme;` +
      `})(document.documentElement)`
    return <script dangerouslySetInnerHTML={{ __html: script }} />
  },
  () => true,
)
