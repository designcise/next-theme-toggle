'use client'

import React, { useEffect, useState, useCallback } from 'react';
import ThemeContext from './ThemeContext';
import { getPreference, setPreference, getColors } from './helper/theme.helper';
import AntiFlickerScript from './AntiFlickerScript';

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
            <AntiFlickerScript theme={theme} color={color} />
            {children}
        </ThemeContext.Provider>
    );
}
