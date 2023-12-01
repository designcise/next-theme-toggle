import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../src/client';
import { mockDeviceStorage, mockPreferredColorScheme } from './assets/device.mock';
import { read, write, clear } from '../src/adapter/storage.adapter';
import ThemeAutoToggle from './assets/ThemeAutoToggle';
import ThemeManualToggle from './assets/ThemeManualToggle';

beforeEach(() => {
    mockDeviceStorage();
    clear();
    document.documentElement.style.colorScheme = ''
    document.documentElement.removeAttribute('class');
});

describe('provider', () => {
    test.each([
        'light',
        'dark',
    ])('should use the `defaultTheme` when nothing is stored in `localStorage`', (theme) => {
        const storageKey = 'test';

        render(
            <ThemeProvider storageKey={storageKey} defaultTheme={theme}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(read(storageKey)).toEqual(theme);
        expect(document.documentElement.classList[0]).toBe(theme);
        expect(document.documentElement.style.colorScheme).toBe(theme);
    });

    test.each([
        'light',
        'dark',
    ])('should set `color-scheme` and `class` to "%s" theme according to saved preference', (theme) => {
        const storageKey = 'test';
        write(storageKey, theme);

        render(
            <ThemeProvider storageKey={storageKey}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(document.documentElement.classList[0]).toBe(theme);
        expect(document.documentElement.style.colorScheme).toBe(theme);
    });

    test.each([
        'light',
        'dark',
    ])('should set resolve to system resolved theme "%s"', (theme) => {
        const storageKey = 'sys-resolved-theme';
        mockPreferredColorScheme(theme);

        render(
            <ThemeProvider storageKey={storageKey}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(read(storageKey)).toEqual(theme);
        expect(document.documentElement.classList[0]).toBe(theme);
        expect(document.documentElement.style.colorScheme).toBe(theme);
    });

    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should ignore nested `ThemeProvider`', (expectedTheme, nestedTheme) => {
        const storageKey = 'test';

        render(
            <ThemeProvider storageKey={storageKey} defaultTheme={expectedTheme}>
                <ThemeProvider storageKey={storageKey} defaultTheme={nestedTheme}>
                    <ThemeAutoToggle />
                </ThemeProvider>
            </ThemeProvider>
        );

        expect(document.documentElement.classList[0]).toBe(expectedTheme);
    });

    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should update value in storage when toggling from "%s" to "%s" theme', (themeFrom, themeTo) => {
        const storageKey = 'test';

        render(
            <ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(read(storageKey)).toEqual(themeFrom);

        fireEvent.click(screen.getByText(/toggle theme/i));

        expect(read(storageKey)).toEqual(themeTo);
    });

    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should update value in storage when manually setting theme from "%s" to "%s"', (themeFrom, themeTo) => {
        const storageKey = 'test';

        render(
            <ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
                <ThemeManualToggle />
            </ThemeProvider>
        );

        expect(read(storageKey)).toEqual(themeFrom);

        fireEvent.click(screen.getByText(/toggle theme/i));

        expect(read(storageKey)).toEqual(themeTo);
    });

    test('should set storage key according to the specified `storageKey`', () => {
        const storageKey = 'theme-test';
        const expectedTheme = 'light';

        render(
            <ThemeProvider storageKey={storageKey} defaultTheme={expectedTheme}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(read(storageKey)).toEqual(expectedTheme);
    });
});
