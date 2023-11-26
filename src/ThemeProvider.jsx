'use client'

import React, { useEffect, useState, useCallback, memo } from 'react';
import ThemeContext from './ThemeContext';
import { getPreference, setPreference, getColors } from './helper/theme.helper';

const color = getColors();

const AntiFlickerScript = memo(function Script({ theme, color }) {
    const script = (() => `(function(theme,root){root.classList.remove(\`'${Object.values(color).join("','")}'\`);root.classList.add(theme);root.style.colorScheme=theme;})('${theme}',document.firstElementChild)`)();
    return <script dangerouslySetInnerHTML={{ __html: script }} />
}, () => true);

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
