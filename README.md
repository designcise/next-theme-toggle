# next-theme-toggle

## Expectations

Result of using this package will be that the following are added to the `<html>` element:

```
<html class="dark" style="color-scheme:dark">
```

After which you can [use different CSS selectors to create color scheme](https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js#switching-theme) based CSS variables or style rules to switch between colors based on the active theme.

## Goals

The goal of the project is to:

- Have no unnecessary bloat
- Provide an easy way of toggling between light and dark themes
- Auto-switching on initial page load based on system settings
- Avoid flicker on load
- Very minimal configuration

## Installation

### Prerequisites

- Next.js 13+
- React 18+

### npm

```
$ npm install @designcise/next-theme-toggle
```

### yarn

```
$ yarn add @designcise/next-theme-toggle
```

## Quickstart

At a bare minimum you need to do the following:

1. Pass the `storageKey` and `theme` preference (read from cookies) to the `ThemeProvider`, which wrapping around all components you wish to pass the theme down to:

```
// app/layout.js
import { cookies } from 'next/headers';
import { ThemeProvider } from '@designcise/next-theme-toggle';

const THEME_STORAGE_KEY = 'theme-preference';

export default async function RootLayout() {
  const theme = cookies().get(THEME_STORAGE_KEY)?.value;

  return (
    &lt;html lang="en"&gt;
      &lt;body&gt;
        &lt;ThemeProvider storageKey={THEME_STORAGE_KEY}} theme={theme}&gt;
          {children}
        &lt;/ThemeProvider&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  )
}
```

2. Create a button to toggle between light and dark theme:

```
// components/ToggleThemeButton/index.jsx
'use client'

import React, { useContext } from 'react';
import { useTheme } from '@designcise/next-theme-toggle';

export default function ToggleThemeButton() {
  const { toggleTheme } = useTheme();

  return (
    &lt;button onClick={toggleTheme}&gt;Toggle Theme&lt;/button&gt;
  )
}
```

3. Add toggle button to your page(s):

```
// app/page.js
import ToggleThemeButton from '@/components/ToggleThemeButton';

export default async function Home() {
  return (
    &lt;main&gt;
      &lt;h1&gt;Hello World&lt;/h1&gt;

      &lt;ToggleThemeButton /&gt;
    &lt;/main&gt;
  )
}
```

4. Add styling for dark and light themes:

```
// globals.css
:root body {
  background: white;
}

:root.dark body {
  background: black;
}
```

or:

```
// globals.css
body {
  background: white;
}

.dark body {
  background: black;
}
```

or:

```
// globals.css
body {
  background: white;
}

@media (prefers-color-scheme: dark) {
  body {
    background: black;
  }
}
```

## API

### `ThemeProvider`

You can pass the following props to `ThemeProvider`:

| Prop         |                     Type                     |                         Description                          |
|--------------|:--------------------------------------------:|:------------------------------------------------------------:|
| `children`   | `React.ReactChild`&vert;`React.ReactChild[]` | Components to which the theme is passed down to via context. |
| `storageKey` |                    String                    |              Name of the key used for storage.               |
| `theme`      |                    String                    |        Starting theme; can be `'light'` or `'dark'`.         |

### `useTheme()`

The `useTheme()` hook does not take any params; it returns the following:

| Return Value  |   Type   |                             Description                             |
|---------------|:--------:|:-------------------------------------------------------------------:|
| `theme`       |  String  |              The active theme (`'light'` or `'dark'`).              |
| `color`       |  Object  | Color keys (`'light'` or `'dark'`) to compare active theme against. |
| `setTheme`    | Function |                      Setter to set new theme.                       |
| `toggleTheme` | Function |            Toggles the theme between `light` and `dark`.            |

## Issues

https://github.com/designcise/next-theme-toggle/issues

## Contributing

https://github.com/designcise/next-theme-toggle/blob/main/CONTRIBUTING.md

## License

https://github.com/designcise/next-theme-toggle/blob/main/LICENSE.md
