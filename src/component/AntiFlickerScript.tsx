import React, { memo } from 'react'
import { themes, colors, getColorByThemeType } from '../helper/theme.helper'
import { AntiFlickerScriptProps } from '../types'

export default memo(
  function AntiFlickerScript({ storageKey, defaultTheme }: AntiFlickerScriptProps) {
    const classList = Object.values(colors).sort().join("','")
    const preferredTheme = `localStorage.getItem('${storageKey}')`
    const fallbackTheme = `(window.matchMedia('(prefers-color-scheme: ${colors.dark})').matches?'${colors.dark}':'${colors.light}')`
    const script =
      '(function(root){' +
      `const pref=${preferredTheme}??'${getColorByThemeType(defaultTheme)}';` +
      `const theme=(pref&&pref!=='${themes.auto.type}')?pref:${fallbackTheme};` +
      `root.classList.remove('${classList}');root.classList.add(theme);root.style.colorScheme=theme;` +
      `})(document.documentElement)`
    return <script dangerouslySetInnerHTML={{ __html: script }} />
  },
  () => true,
)
