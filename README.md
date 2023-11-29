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

After which you can [use different CSS selectors to create styles for dark/light themes](https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js#switching-theme).

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

1. In your Next.js application's root layout file (typically, `app/layout.js`), do the following:

```jsx
// app/layout.js
import { cookies } from 'next/headers';
import { Html, ThemeProvider } from '@designcise/next-theme-toggle';
import { getColors } from '@designcise/next-theme-toggle/server';

// 1: specify key for cookie storage
const THEME_STORAGE_KEY = 'theme-preference';
const color = getColors();

export default async function RootLayout() {
  // 2.1: get the user theme preference value from cookie, if one exists
  // 2.2: set a default value in case the cookie doesn't exist (e.g. `?? color.light`)
  const theme = cookies().get(THEME_STORAGE_KEY)?.value ?? color.light;

  // 3.1: use the `Html` component to prevent flicker
  // 3.2: wrap components with `ThemeProvider` to pass theme down to all components
  return (
    <Html theme={theme}>
      <body>
        <ThemeProvider storageKey={THEME_STORAGE_KEY} theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </Html>
  )
}
```

The `Html` component is added for convenience. If you do not wish to use it, then you can achieve the same with the native `html` element in the following way:

```jsx
// replace:
<Html theme={theme}>

// with:
<html className={theme} style={{ colorScheme: theme }}>
```

Both these approaches help you avoid flicker on initial page load.

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

You can also do this manually by using `theme`, `color`, and `setTheme()`, for example, like so:

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

That's it! You should have light/dark theme toggle in your Next.js application.

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

### `getColors()`

Returns an object, with the following:

| Property |  Type  |   Value   |               Description                |
|----------|:------:|:---------:|:----------------------------------------:|
| `light`  | String | `'light'` |    Color value used for light theme.     |
| `theme`  | String | `'dark'`. |     Color value used for dark theme.     |

The `getColors()` function can be used in client components, as well as server components. For server components you should import them like so:

```jsx
import { getColors } from '@designcise/next-theme-toggle/server';
```

For client components, you can import it like so:

```jsx
import { getColors } from '@designcise/next-theme-toggle';
```

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

### Reporting

* File issues at https://github.com/designcise/next-theme-toggle/issues
* Issue patches to https://github.com/designcise/next-theme-toggle/pulls

### Troubleshooting Common Issues

#### Tailwind not updating dark mode styling

This can happen when you have your CSS or SASS file in a sub-folder that is not listed in `content` array in the `tailwind.config.js`:

```js
// ...
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
// ...
```

To fix this, you can add the folder where your CSS or SASS file is located. For example:

```js
// ...
  content: [
    // ...
    './src/styles/**/*.css',
  ],
// ...
```

## Contributing

https://github.com/designcise/next-theme-toggle/blob/main/CONTRIBUTING.md

## License

https://github.com/designcise/next-theme-toggle/blob/main/LICENSE.md
