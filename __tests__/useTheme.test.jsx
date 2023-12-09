import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../src/client';
import { mockDeviceStorage, mockPreferredColorScheme } from './assets/device.mock';
import { clear, read } from '../src/adapter/storage.adapter';
import ThemeAutoToggle from './assets/ThemeAutoToggle';
import ThemeManualToggle from './assets/ThemeManualToggle';
import ThemeSwitcher from './assets/ThemeSwitcher';
import '@testing-library/jest-dom';

beforeEach(() => {
    mockDeviceStorage();
    clear();
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
            <ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
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
        mockPreferredColorScheme(themeFrom);

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
            <ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
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
        const oppositeTheme = (theme === 'light') ? 'dark' : 'light';

        render(
            <ThemeProvider storageKey={storageKey} defaultTheme={oppositeTheme}>
                <ThemeSwitcher />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByText(new RegExp(`${theme} theme`, 'i')));

        expect(screen.getByText(`Active Theme: ${theme}`)).toBeInTheDocument();
        expect(read(storageKey)).toEqual(theme);
    });
});
