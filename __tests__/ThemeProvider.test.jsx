"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var react_1 = require("@testing-library/react");
var client_1 = require("../src/client");
var device_mock_1 = require("./mocks/device.mock");
var storage_adapter_1 = require("../src/adapter/storage.adapter");
var ThemeAutoToggle_1 = require("./assets/ThemeAutoToggle");
var ThemeManualToggle_1 = require("./assets/ThemeManualToggle");
var ThemeSwitcher_1 = require("./assets/ThemeSwitcher");
var env_helper_1 = require("../src/helper/env.helper");
beforeAll(function () {
    (0, device_mock_1.mockLocalStorage)();
    (0, device_mock_1.mockMatchMedia)();
});
beforeEach(function () {
    (0, storage_adapter_1.clear)();
    document.documentElement.style.colorScheme = '';
    document.documentElement.removeAttribute('class');
});
describe('ThemeProvider', function () {
    test('should set storage key according to the specified value', function () {
        var storageKey = 'theme-test';
        var expectedTheme = 'light';
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme={expectedTheme}>
        <ThemeAutoToggle_1.default />
      </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(expectedTheme);
    });
    test('should use default storage key when none is specified value', function () {
        var expectedThemeType = 'light';
        (0, react_1.render)(<client_1.ThemeProvider defaultTheme={expectedThemeType}>
        <ThemeAutoToggle_1.default />
      </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(env_helper_1.DEFAULT_STORAGE_KEY)).toEqual(expectedThemeType);
    });
    test.each(['light', 'dark'])('should use the `defaultTheme` when nothing is stored in `localStorage`', function (theme) {
        var storageKey = 'test';
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme={theme}>
          <ThemeAutoToggle_1.default />
        </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(theme);
        expect(document.documentElement.classList[0]).toBe(theme);
        expect(document.documentElement.style.colorScheme).toBe(theme);
    });
    test.each(['light', 'dark'])('should auto-determine theme color when nothing is stored in `localStorage` and `defaultTheme` is set to "auto"', function (color) {
        var storageKey = 'test';
        (0, device_mock_1.mockPreferredColorScheme)(color);
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme="auto">
          <ThemeAutoToggle_1.default />
        </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual('auto');
        expect(document.documentElement.classList[0]).toBe(color);
        expect(document.documentElement.style.colorScheme).toBe(color);
    });
    test.each(['light', 'dark'])('should set `color-scheme` and `class` to "%s" theme color according to saved theme preference', function (color) {
        var storageKey = 'test';
        (0, storage_adapter_1.write)(storageKey, color);
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey}>
          <ThemeAutoToggle_1.default />
        </client_1.ThemeProvider>);
        expect(document.documentElement.classList[0]).toBe(color);
        expect(document.documentElement.style.colorScheme).toBe(color);
    });
    test.each(['light', 'dark', 'auto'])('should use system resolved "%s" color and "auto" theme when no `defaultTheme` is provided and nothing is stored in `localStorage`', function (color) {
        var storageKey = 'sys-resolved-theme';
        var prefColor = color === 'auto' ? 'dark' : color;
        (0, device_mock_1.mockPreferredColorScheme)(prefColor);
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey}>
          <ThemeAutoToggle_1.default />
        </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual('auto');
        expect(document.documentElement.classList[0]).toBe(prefColor);
        expect(document.documentElement.style.colorScheme).toBe(prefColor);
    });
    test.each(['light', 'dark'])('should set theme color automatically based on user system preference', function (sysPrefColor) {
        var storageKey = 'sys-resolved-theme';
        (0, device_mock_1.mockPreferredColorScheme)(sysPrefColor);
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme="auto">
          <ThemeAutoToggle_1.default />
        </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual('auto');
        expect(document.documentElement.classList[0]).toBe(sysPrefColor);
        expect(document.documentElement.style.colorScheme).toBe(sysPrefColor);
    });
    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should ignore nested `ThemeProvider`', function (expectedTheme, nestedTheme) {
        var storageKey = 'test';
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme={expectedTheme}>
        <client_1.ThemeProvider storageKey={storageKey} defaultTheme={nestedTheme}>
          <ThemeAutoToggle_1.default />
        </client_1.ThemeProvider>
      </client_1.ThemeProvider>);
        expect(document.documentElement.classList[0]).toBe(expectedTheme);
    });
    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should update value in storage when toggling from "%s" to "%s" theme', function (themeFrom, themeTo) {
        var storageKey = 'test';
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
          <ThemeAutoToggle_1.default />
        </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(themeFrom);
        react_1.fireEvent.click(react_1.screen.getByText(/toggle theme/i));
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(themeTo);
    });
    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should update value in storage when manually setting theme from "%s" to "%s"', function (themeFrom, themeTo) {
        var storageKey = 'test';
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
          <ThemeManualToggle_1.default />
        </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(themeFrom);
        react_1.fireEvent.click(react_1.screen.getByText(/toggle theme/i));
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(themeTo);
    });
    test.each(['light', 'dark'])('should switch from "auto" to "%s"', function (theme) {
        var storageKey = 'sys-resolved-theme';
        var oppositeTheme = theme === 'dark' ? 'light' : 'dark';
        (0, device_mock_1.mockPreferredColorScheme)(oppositeTheme);
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme="auto">
        <ThemeSwitcher_1.default />
      </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual('auto');
        expect(document.documentElement.classList[0]).toBe(oppositeTheme);
        expect(document.documentElement.style.colorScheme).toBe(oppositeTheme);
        react_1.fireEvent.click(react_1.screen.getByText(new RegExp("".concat(theme, " theme"), 'i')));
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(theme);
        expect(document.documentElement.classList[0]).toBe(theme);
        expect(document.documentElement.style.colorScheme).toBe(theme);
    });
    test.each(['light', 'dark'])('should switch from "%s" to "auto"', function (theme) {
        var storageKey = 'sys-resolved-theme';
        var oppositeTheme = theme === 'dark' ? 'light' : 'dark';
        (0, device_mock_1.mockPreferredColorScheme)(oppositeTheme);
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme={theme}>
        <ThemeSwitcher_1.default />
      </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(theme);
        expect(document.documentElement.classList[0]).toBe(theme);
        expect(document.documentElement.style.colorScheme).toBe(theme);
        react_1.fireEvent.click(react_1.screen.getByText('Auto Theme'));
        expect((0, storage_adapter_1.read)(storageKey)).toEqual('auto');
        expect(document.documentElement.classList[0]).toBe(oppositeTheme);
        expect(document.documentElement.style.colorScheme).toBe(oppositeTheme);
    });
    test('should not set `colorScheme` and class name to "auto"', function () {
        var storageKey = 'sys-resolved-theme';
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme="auto">
        <ThemeSwitcher_1.default />
      </client_1.ThemeProvider>);
        expect(document.documentElement.classList[0]).not.toBe('auto');
        expect(document.documentElement.style.colorScheme).not.toBe('auto');
    });
});
