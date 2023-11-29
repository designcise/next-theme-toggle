import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../src/client';
import { clearAllDeviceCookies, setDeviceTheme } from './assets/device.helper';
import ThemeAutoToggle from './assets/ThemeAutoToggle';
import ThemeManualToggle from './assets/ThemeManualToggle';
import ThemeSwitcher from './assets/ThemeSwitcher';
import '@testing-library/jest-dom';

beforeEach(() => {
    clearAllDeviceCookies();
    document.documentElement.style.colorScheme = ''
    document.documentElement.removeAttribute('class');
});

describe('useTheme', () => {
    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should toggle "%s" theme to "%s"', (themeFrom, themeTo) => {
        const storageKey = 'test';

        render(
            <ThemeProvider storageKey={storageKey} theme={themeFrom}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(document.documentElement.classList[0]).toBe(themeFrom);
        expect(document.documentElement.style.colorScheme).toBe(themeFrom);

        fireEvent.click(screen.getByText(/toggle theme/i));

        expect(document.documentElement.classList[0]).toBe(themeTo);
        expect(document.documentElement.style.colorScheme).toBe(themeTo);
    });

    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should toggle system resolved "%s" theme to "%s"', (themeFrom, themeTo) => {
        const storageKey = 'sys-resolved-theme';
        setDeviceTheme(themeFrom);

        render(
            <ThemeProvider storageKey={storageKey}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(document.documentElement.classList[0]).toBe(themeFrom);
        expect(document.documentElement.style.colorScheme).toBe(themeFrom);

        fireEvent.click(screen.getByText(/toggle theme/i));

        expect(document.documentElement.classList[0]).toBe(themeTo);
        expect(document.documentElement.style.colorScheme).toBe(themeTo);
    });

    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should get right values to manually set theme from "%s" to "%s"', (themeFrom, themeTo) => {
        const storageKey = 'test';

        render(
            <ThemeProvider storageKey={storageKey} theme={themeFrom}>
                <ThemeManualToggle />
            </ThemeProvider>
        );

        expect(document.documentElement.classList[0]).toBe(themeFrom);
        expect(document.documentElement.style.colorScheme).toBe(themeFrom);

        fireEvent.click(screen.getByText(/toggle theme/i));

        expect(document.documentElement.classList[0]).toBe(themeTo);
        expect(document.documentElement.style.colorScheme).toBe(themeTo);
    });

    test.each([
        'light',
        'dark',
    ])('should get "%s" as the active theme', (theme) => {
        const storageKey = 'user-theme';

        render(
            <ThemeProvider storageKey={storageKey} theme="auto">
                <ThemeSwitcher />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByText(new RegExp(`${theme} theme`, 'i')));

        expect(screen.getByText(`Active Theme: ${theme}`)).toBeInTheDocument();
        expect(document.cookie).toEqual(expect.stringMatching(new RegExp(`${storageKey}=${theme}`)));
    });
});
