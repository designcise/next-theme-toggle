'use client'

import React from 'react';
import { useTheme } from '../../src/client';

export default function ToggleThemeButton() {
    const { toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>Toggle Theme</button>
    )
}
