# next-theme-toggle

A simple theme toggle for Next.js 13+ that allows switching between light and dark themes. Using this package would result in the following `class` and `style` attributes added to the `<html>` element:

```html
<html class="dark" style="color-scheme:dark">
```

You can then [use different CSS selectors to create styles for dark/light themes](https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js-using-localstorage#adding-the-ability-to-switch-themes).

## Goals

- Provide an easy way of toggling between light and dark themes
- Auto-switch theme on page load based on system settings
- Avoid flicker on page load
- Have no unnecessary bloat
- Have very minimal configuration
- Be simple and intuitive

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
import { cookies } from 'next/headers';
import { Html, ThemeProvider } from '@designcise/next-theme-toggle';
import { getColors } from '@designcise/next-theme-toggle/server';

// 1: specify key for storage
const THEME_STORAGE_KEY = 'theme-preference';
const color = getColors();

export default async function RootLayout() {
  // 2: wrap components with `ThemeProvider` to pass theme props down to all components
  // 3: pass `storageKey` and (optional) `defaultTheme` to `ThemeProvider`
  return (
    <html>
      <body>
        <ThemeProvider storageKey={THEME_STORAGE_KEY} defaultTheme={color.dark}>
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

| Prop           |                     Type                     |                            Description                             |
|----------------|:--------------------------------------------:|:------------------------------------------------------------------:|
| `children`     | `React.ReactChild`&vert;`React.ReactChild[]` |    Components to which the theme is passed down to via context.    |
| `storageKey`   |                    String                    |                 Name of the key used for storage.                  |
| `defaultTheme` |                    String                    | Default theme (`'light'` or `'dark'`) to use on initial page load. |

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

> **NOTE**: The `getColors()` function can be used in both, client components and server components.

For server components you can import `getColors()` like so:

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

#### `Warning: Extra attributes from the server: class,style` in Console

This warning _only_ shows on dev build and _not_ in the production build. This happens because the injected script adds _additional_ `class` and `style` attributes to the `html` element which _do not_ originally exist on the server-side generated page, leading to a mismatch in the server-side and client-side rendered page.

## Contributing

https://github.com/designcise/next-theme-toggle/blob/main/CONTRIBUTING.md

## License

https://github.com/designcise/next-theme-toggle/blob/main/LICENSE.md

## Resources

- [https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js-using-localstorage](https://www.designcise.com/web/tutorial/how-to-create-non-flickering-dark-or-light-mode-toggle-in-next-js-using-localstorage).

