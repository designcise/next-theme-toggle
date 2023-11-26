'use client'

import React from 'react';
import { useTheme } from '../../src';

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
