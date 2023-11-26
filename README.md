# next-theme-toggle

This package is based on [https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js](https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js).

## Goals

The goal of the project is to:

- Provide an easy way of toggling between light and dark themes
- Auto-switch theme on page load based on system settings
- Avoid flicker on page load
- Have no unnecessary bloat
- Have very minimal configuration

## Expectations

Result of using this package will be that the following are added to the `<html>` element:

```html
<html class="dark" style="color-scheme:dark">
```

After which you can [use different CSS selectors to create color scheme](https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js#switching-theme) based CSS variables or style rules to switch between colors based on the active theme.

## Installation

### Prerequisites

- Next.js 13+
- React 18+

### npm

```shell
$ npm install @designcise/next-theme-toggle
```

### yarn

```shell
$ yarn add @designcise/next-theme-toggle
```

## Quickstart

At a bare minimum you need to do the following:

1. Pass the `storageKey` and `theme` preference (read from cookies) to the `ThemeProvider`, which wrapping around all components you wish to pass the theme down to:

```jsx
// app/layout.js
import { cookies } from 'next/headers';
import { ThemeProvider } from '@designcise/next-theme-toggle';

const THEME_STORAGE_KEY = 'theme-preference';

export default async function RootLayout() {
  const theme = cookies().get(THEME_STORAGE_KEY)?.value;

  return (
    <html lang="en">
      <body>
        <ThemeProvider storageKey={THEME_STORAGE_KEY}} theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

2. Create a button to toggle between light and dark theme:

```jsx
// components/ToggleThemeButton/index.jsx
'use client'

import React, { useContext } from 'react';
import { useTheme } from '@designcise/next-theme-toggle';

export default function ToggleThemeButton() {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>Toggle Theme</button>
  )
}
```

You can also do this manually using `theme`, `color`, and `setTheme()`, for example, like so:

```jsx
// components/ToggleThemeButton/index.jsx
'use client'

import React, { useContext } from 'react';
import { useTheme } from '@designcise/next-theme-toggle';

export default function ToggleThemeButton() {
    const { theme, color, setTheme } = useTheme();

  return (
    <button
        onClick={() => setTheme(theme === color.dark ? color.light : color.dark)}
    >
        Toggle Theme
    </button>
  )
}
```

3. Add toggle button to your page(s):

```jsx
// app/page.js
import ToggleThemeButton from '@/components/ToggleThemeButton';

export default async function Home() {
  return (
    <main>
      <h1>Hello World</h1>

      <ToggleThemeButton />
    </main>
  )
}
```

4. Add styling for dark and light themes:

```css
/* globals.css */
:root body {
  background: white;
}

:root.dark body {
  background: black;
}
```

or:

```css
/* globals.css */
body {
  background: white;
}

.dark body {
  background: black;
}
```

or:

```css
/* globals.css */
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

## Testing

Tests are written using React Testing Library and Jest. You can run the tests using the following command:

### npm

```shell
$ npm test
```

### yarn

```shell
$ yarn test
```

## Issues

https://github.com/designcise/next-theme-toggle/issues

## Contributing

https://github.com/designcise/next-theme-toggle/blob/main/CONTRIBUTING.md

## License

https://github.com/designcise/next-theme-toggle/blob/main/LICENSE.md
