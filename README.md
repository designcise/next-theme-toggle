# next-theme-toggle

A simple theme toggle for Next.js 13+ that allows switching between light and dark themes. Using this package would result in the following `class` and `style` attributes added to the `<html>` element:

```html
<html class="dark" style="color-scheme:dark">
  <!-- ... -->
</html>
```

You can then [use different CSS selectors to create styles for dark/light themes](https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js-using-localstorage#adding-the-ability-to-switch-themes).

## Features

- Easy implementation with just _two_ lines of code
- No flicker on page load
- Toggle between `light`, `dark` and `auto` modes
- Automatically choose color based on `prefers-color-scheme` when in "`auto`" mode
- Update color when `prefers-color-scheme` changes in `auto` mode
- Switch to opposite color when toggling from "`auto`"
- Data is stored in `localStorage`
- No unnecessary bloat
- Well-tested

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

> **NOTE**: Please note that this approach relies on using `localStorage` on the client side to store theme information.

At a bare minimum you need to do the following:

1. In your Next.js application's root layout file (typically, `app/layout.js`), do the following:

```jsx
// app/layout.js
import { ThemeProvider } from '@designcise/next-theme-toggle';
import { themes } from '@designcise/next-theme-toggle/server';

// 1: specify key for storage
const THEME_STORAGE_KEY = 'theme-preference'

export default async function RootLayout() {
  // 2: wrap components with `ThemeProvider` to pass theme props down to all components
  // 3: pass `storageKey` and (optional) `defaultTheme` to `ThemeProvider`
  return (
    <html>
      <body>
        <ThemeProvider storageKey={THEME_STORAGE_KEY} defaultTheme={themes.dark}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

With this setup, the `ThemeProvider` component will automatically inject an inline script into DOM that takes care of avoiding flicker on initial page load.

2. Create a button to toggle between light and dark theme:

```jsx
// components/ToggleThemeButton/index.jsx
'use client'

import React, { useContext } from 'react'
import { useTheme } from '@designcise/next-theme-toggle'

export default function ToggleThemeButton() {
  const { toggleTheme } = useTheme()

  return <button onClick={toggleTheme}>Toggle Theme</button>
}
```

You can also do this manually by using `theme`, `themes`, `colors` and `setTheme()`, for example, like so:

```jsx
// components/ToggleThemeButton/index.jsx
'use client'

import React, { useContext } from 'react'
import { useTheme } from '@designcise/next-theme-toggle'

export default function ToggleThemeButton() {
  const { theme, themes, colors, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === themes.dark ? colors.light : colors.dark)}>
      Toggle Theme
    </button>
  )
}
```

3. Add toggle button to your page(s):

```jsx
// app/page.js
import ToggleThemeButton from '@/components/ToggleThemeButton'

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

| Prop           |                     Type                     |                                      Description                                       |
|----------------|:--------------------------------------------:|:--------------------------------------------------------------------------------------:|
| `children`     | `React.ReactChild`&vert;`React.ReactChild[]` |              Components to which the theme is passed down to via context.              |
| `storageKey`   |                    String                    |                           Name of the key used for storage.                            |
| `defaultTheme` |                    String                    | Default theme (`'light'`, `'dark'` or `auto`) to use on page load. Defaults to `auto`. |

### `useTheme()`

The `useTheme()` hook does not take any params; it returns the following:

| Return Value  |   Type   |                                                                       Description                                                                        |
|---------------|:--------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `theme`       |  String  |                                                   The active theme (`'light'`, `'dark'` or `'auto'`).                                                    |
| `themes`      |  Object  |                                            Allowed themes (`{ light: 'light', dark: 'dark', auto: 'auto' }`).                                            |
| `color`       |  String  |                                                          The active color (`light` or `dark`).                                                           |
| `colors`      |  Object  | Allowed colors (`{ light: 'light', dark: 'dark', auto: 'dark'&vert;'light' }`). `colors.auto` returns `dark` or `light` based on `prefers-color-scheme`. |
| `setTheme`    | Function |                                                                 Setter to set new theme.                                                                 |
| `toggleTheme` | Function |           Toggles the theme between `light` and `dark`. When toggling from `auto`, the opposite color to active color is automatically chosen.           |

### `themes`

An object, with the following properties:

| Property |  Type  |   Value   |                         Description                          |
|----------|:------:|:---------:|:------------------------------------------------------------:|
| `light`  | String | `'light'` |             Color value used for "light" theme.              |
| `dark`   | String | `'dark'`. |              Color value used for "dark" theme.              |
| `auto`   | String | `'auto'`. | Auto-determine color scheme based on `prefers-color-scheme`. |

> **NOTE**: The `themes` object can be used in both, client components and server components.

For server components you can import `themes` like so:

```jsx
import { themes } from '@designcise/next-theme-toggle/server'
```

For client components, you can import it like so:

```jsx
import { themes } from '@designcise/next-theme-toggle'
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

- File issues at https://github.com/designcise/next-theme-toggle/issues
- Issue patches to https://github.com/designcise/next-theme-toggle/pulls

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

#### `Warning: Extra attributes from the server: class,style` in Console

You can safely ignore this warning as it _only_ shows on dev build and _not_ in the production build. This happens because the injected inline script adds _additional_ `class` and `style` attributes to the `html` element which _do not_ originally exist on the server-side generated page, leading to a _mismatch_ in the server-side and client-side rendered page.

## Contributing

https://github.com/designcise/next-theme-toggle/blob/main/CONTRIBUTING.md

## License

https://github.com/designcise/next-theme-toggle/blob/main/LICENSE.md

## Resources

- [How to Create Non-Flickering Dark/Light Mode Toggle in Next.js Using `localStorage`?](https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js-using-localstorage)
- [How to Create Non-Flickering Dark/Light Mode Toggle in Next.js Using Cookies?](https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js-using-cookies)
