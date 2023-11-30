import React, { memo } from 'react';

export default memo(function AntiFlickerScript({ storageKey, defaultTheme, color }) {
    const classList = Object.values(color).join("','");
    const preferredTheme = `localStorage.getItem('${storageKey}')`;
    const fallbackTheme = defaultTheme ? `'${defaultTheme}'` : `(window.matchMedia('(prefers-color-scheme: ${color.dark})').matches ? '${color.dark}' : '${color.light}')`;
    const script = '(function(root){'
        + `const theme=${preferredTheme}??${fallbackTheme};`
        + `root.classList.remove('${classList}');root.classList.add(theme);root.style.colorScheme=theme;`
     + `})(document.documentElement)`;
    return <script dangerouslySetInnerHTML={{ __html: script }} />
}, () => true);
