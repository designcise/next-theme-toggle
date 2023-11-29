import React from 'react';
import { useTheme } from '../../src/client';

export default function ThemeSwitcher() {
    const { theme, color, setTheme } = useTheme();

    return (
        <>
            <div>Active Theme: {theme}</div>
            <button onClick={() => setTheme(color.light)}>Light Theme</button>
            <button onClick={() => setTheme(color.dark)}>Dark Theme</button>
        </>
    )
}
