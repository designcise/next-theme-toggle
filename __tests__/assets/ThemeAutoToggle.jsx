'use client'

import React from 'react';
import { useTheme } from '../../index';

export default function ToggleThemeButton() {
    const { toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>Toggle Theme</button>
    )
}
