/*
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { colors, ThemeProvider } from '../src/client';
import { mockDeviceStorage, mockPreferredColorScheme } from './assets/device.mock';
import { clear, read } from '../src/adapter/storage.adapter';
import ThemeAutoToggle from './assets/ThemeAutoToggle';
import ThemeManualToggle from './assets/ThemeManualToggle';
import ThemeSwitcher from './assets/ThemeSwitcher';
import '@testing-library/jest-dom';

beforeAll(() => {
    mockDeviceStorage();
});

beforeEach(() => {
    clear();
    document.documentElement.style.colorScheme = ''
    document.documentElement.removeAttribute('class');
});

describe('useTheme', () => {
    test.skip.each([
        [colors.light, colors.dark],
        [colors.dark, colors.light],
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

    test.skip.each([
        [colors.light, colors.dark],
        [colors.dark, colors.light],
    ])('should toggle from system resolved "%s" theme to opposite theme "%s"', (themeFrom, themeTo) => {
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

    test.skip.each([
        [colors.light, colors.dark],
        [colors.dark, colors.light],
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

    test.skip.each([
        colors.light,
        colors.dark,
    ])('should get "%s" as the active theme and color', (theme) => {
        const storageKey = 'user-theme';
        const oppositeTheme = (theme === colors.light) ? colors.dark : colors.light;

        render(
            <ThemeProvider storageKey={storageKey} defaultTheme={oppositeTheme}>
                <ThemeSwitcher />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByText(new RegExp(`${theme} theme`, 'i')));

        expect(screen.getByText(`Active Theme: ${theme}`)).toBeInTheDocument();
        expect(screen.getByText(`Active Color: ${theme}`)).toBeInTheDocument();
        expect(read(storageKey)).toEqual(theme);
    });

    test.skip.each([
        colors.light,
        colors.dark,
    ])('should get "%s" as the active color when theme is set to "auto"', (colorScheme) => {
        const storageKey = 'user-theme';
        mockPreferredColorScheme(colorScheme);

        render(
            <ThemeProvider storageKey={storageKey} defaultTheme={colors.auto}>
                <ThemeSwitcher />
            </ThemeProvider>
        );

        expect(screen.getByText(`Active Theme: ${colors.auto}`)).toBeInTheDocument();
        expect(screen.getByText(`Active Color: ${colorScheme}`)).toBeInTheDocument();
    });

    /!*test.skip.each([
        colors.light,
        colors.dark,
    ])('should get "%s" as the active color when theme is set to "auto"', (colorScheme) => {
        const storageKey = 'user-theme';
        const oppositeColor = (colorScheme === colors.light) ? colors.dark : colors.light;

        mockPreferredColorScheme(oppositeColor);

        render(
            <ThemeProvider storageKey={storageKey} defaultTheme={colors.auto}>
                <ThemeSwitcher />
            </ThemeProvider>
        );

        expect(screen.getByText(`Active Theme: ${colors.auto}`)).toBeInTheDocument();
        expect(screen.getByText(`Active Color: ${oppositeColor}`)).toBeInTheDocument();

        mockPreferredColorScheme(colorScheme);

        fireEvent.click(screen.getByText(new RegExp(`${oppositeTheme} theme`, 'i')));

        expect(screen.getByText(`Active Theme: ${colors.auto}`)).toBeInTheDocument();
        expect(screen.getByText(`Active Color: ${color}`)).toBeInTheDocument();
    });*!/

    test.skip.each([
        [colors.light, colors.dark],
        [colors.dark, colors.light],
    ])('should switch to opposite color of "%s" when toggling from "auto"', (sysTheme, switchToTheme) => {
        const storageKey = 'sys-resolved-theme';
        mockPreferredColorScheme(sysTheme);

        render(
            <ThemeProvider storageKey={storageKey} defaultTheme={colors.auto}>
                <ThemeAutoToggle />
            </ThemeProvider>
        );

        expect(read(storageKey)).toEqual(colors.auto);
        expect(document.documentElement.classList[0]).toBe(sysTheme);
        expect(document.documentElement.style.colorScheme).toBe(sysTheme);

        fireEvent.click(screen.getByText(/toggle theme/i));

        expect(read(storageKey)).toEqual(colors.auto);
        expect(document.documentElement.classList[0]).toBe(switchToTheme);
        expect(document.documentElement.style.colorScheme).toBe(switchToTheme);
    });
});
*/
