'use client'

import React, { useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';
import { getPreference, setPreference, getColors } from './helper/theme.helper';

const color = getColors();

export default function ThemeProvider({
    children,
    theme: startTheme,
    storageKey = 'theme-preference',
}) {
    const [theme, setTheme] = useState(startTheme ?? getPreference(storageKey));

    useEffect(() => {
        setPreference(storageKey, theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, color, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
