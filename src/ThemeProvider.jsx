'use client'

import React, { useEffect, useState, useCallback } from 'react';
import ThemeContext from './ThemeContext';
import { getPreference, setPreference } from './helper/theme.helper';
import { getColors } from './helper/color.helper';

const color = getColors();

export default function ThemeProvider({
    children,
    storageKey,
    theme: startTheme,
}) {
    const [theme, setTheme] = useState(startTheme ?? getPreference(storageKey));

    useEffect(() => {
        setPreference(storageKey, theme);
    }, [storageKey, theme]);

    const toggleTheme = useCallback(() => {
        setTheme(theme === color.dark ? color.light : color.dark);
    }, [theme, setTheme]);

    return (
        <ThemeContext.Provider value={{ theme, color, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
