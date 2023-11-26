import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../index';
import { clearAllDeviceCookies, setDeviceCookie, setDeviceTheme } from './assets/device.helper';
import ThemeAutoToggle from './assets/ThemeAutoToggle';
import ThemeManualToggle from './assets/ThemeManualToggle';

beforeEach(() => {
    clearAllDeviceCookies();
    document.documentElement.style.colorScheme = ''
    document.documentElement.removeAttribute('class');
});

describe('provider', () => {
    test.each([
        'light',
        'dark',
    ])('should set `colorScheme` and class name to "%s" theme', (theme) => {
        const storageKey = 'test';
        setDeviceCookie(storageKey, theme);

        render(
            <ThemeProvider storageKey={storageKey} theme={theme}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(document.documentElement.classList[0]).toBe(theme);
        expect(document.documentElement.style.colorScheme).toBe(theme);
    });

    test.each([
        'light',
        'dark',
    ])('should set `colorScheme` and class name to system resolved %s theme', (theme) => {
        const storageKey = 'sys-resolved-theme';
        setDeviceTheme(theme);

        render(
            <ThemeProvider storageKey={storageKey}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(document.documentElement.classList[0]).toBe(theme);
        expect(document.documentElement.style.colorScheme).toBe(theme);
    });

    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should ignore nested `ThemeProvider`', (defaultTheme, expectedTheme) => {
        const storageKey = 'test';

        render(
            <ThemeProvider storageKey={storageKey} theme={expectedTheme}>
                <ThemeProvider storageKey={storageKey} theme={defaultTheme}>
                    <ThemeAutoToggle />
                </ThemeProvider>
            </ThemeProvider>
        );

        expect(document.documentElement.classList[0]).toBe(expectedTheme);
    });

    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should set cookie when toggling from "%s" to "%s" theme', (themeFrom, themeTo) => {
        render(
            <ThemeProvider storageKey="test" theme={themeFrom}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(document.cookie).toEqual(expect.stringMatching(new RegExp(`^test=${themeFrom}`)));

        fireEvent.click(screen.getByText(/toggle theme/i));

        expect(document.cookie).toEqual(expect.stringMatching(new RegExp(`^test=${themeTo}`)));
    });

    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should set cookie when manually setting theme from "%s" to "%s"', (themeFrom, themeTo) => {
        render(
            <ThemeProvider storageKey="test" theme={themeFrom}>
                <ThemeManualToggle />
            </ThemeProvider>
        );

        expect(document.cookie).toEqual(expect.stringMatching(new RegExp(`^test=${themeFrom}`)));

        fireEvent.click(screen.getByText(/toggle theme/i));

        expect(document.cookie).toEqual(expect.stringMatching(new RegExp(`^test=${themeTo}`)));
    });

    test('should set cookie name according to the specified `storageKey`', () => {
        render(
            <ThemeProvider storageKey="theme-test" theme="light">
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(document.cookie).toEqual(expect.stringMatching(/^theme-test=light/));
    });
});
