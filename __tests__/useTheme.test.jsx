"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var client_1 = require("../src/client");
var device_mock_1 = require("./mocks/device.mock");
var storage_adapter_1 = require("../src/adapter/storage.adapter");
var ThemeAutoToggle_1 = require("./assets/ThemeAutoToggle");
var ThemeManualToggle_1 = require("./assets/ThemeManualToggle");
var ThemeSwitcher_1 = require("./assets/ThemeSwitcher");
beforeAll(function () {
    (0, device_mock_1.mockLocalStorage)();
    (0, device_mock_1.mockMatchMedia)();
});
beforeEach(function () {
    (0, storage_adapter_1.clear)();
    document.documentElement.style.colorScheme = '';
    document.documentElement.removeAttribute('class');
});
describe('useTheme()', function () {
    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should toggle "%s" theme to "%s"', function (themeFrom, themeTo) {
        var storageKey = 'test';
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
        <ThemeAutoToggle_1.default />
      </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(themeFrom);
        expect(document.documentElement.classList[0]).toBe(themeFrom);
        expect(document.documentElement.style.colorScheme).toBe(themeFrom);
        react_1.fireEvent.click(react_1.screen.getByText(/toggle theme/i));
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(themeTo);
        expect(document.documentElement.classList[0]).toBe(themeTo);
        expect(document.documentElement.style.colorScheme).toBe(themeTo);
    });
    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should toggle from system resolved "%s" theme to opposite theme "%s" when using `toggle` function', function (themeFrom, themeTo) {
        var storageKey = 'sys-resolved-theme';
        (0, device_mock_1.mockPreferredColorScheme)(themeFrom);
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey}>
          <ThemeAutoToggle_1.default />
        </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual('auto');
        expect(document.documentElement.classList[0]).toBe(themeFrom);
        expect(document.documentElement.style.colorScheme).toBe(themeFrom);
        react_1.fireEvent.click(react_1.screen.getByText(/toggle theme/i));
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(themeTo);
        expect(document.documentElement.classList[0]).toBe(themeTo);
        expect(document.documentElement.style.colorScheme).toBe(themeTo);
    });
    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should get right values to manually set theme from "%s" to "%s"', function (themeFrom, themeTo) {
        var storageKey = 'test';
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme={themeFrom}>
        <ThemeManualToggle_1.default />
      </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(themeFrom);
        react_1.fireEvent.click(react_1.screen.getByText(/toggle theme/i));
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(themeTo);
    });
    test.each([client_1.themes.light, client_1.themes.dark])('should get "%s" as the active `theme` and `color`', function (theme) {
        var storageKey = 'user-theme';
        var oppositeTheme = theme.type === 'light' ? client_1.themes.dark.type : client_1.themes.light.type;
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme={oppositeTheme}>
          <ThemeSwitcher_1.default />
        </client_1.ThemeProvider>);
        react_1.fireEvent.click(react_1.screen.getByText(new RegExp("".concat(theme.type, " theme"), 'i')));
        expect(react_1.screen.getByText("Active Theme: ".concat(theme.type))).toBeInTheDocument();
        expect(react_1.screen.getByText("Active Color: ".concat(theme.color))).toBeInTheDocument();
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(theme.type);
    });
    test.each(['light', 'dark'])('should get "%s" as the active `color` when theme is set to "auto"', function (colorScheme) {
        var storageKey = 'user-theme';
        (0, device_mock_1.mockPreferredColorScheme)(colorScheme);
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme="auto">
          <ThemeSwitcher_1.default />
        </client_1.ThemeProvider>);
        expect(react_1.screen.getByText('Active Theme: auto')).toBeInTheDocument();
        expect(react_1.screen.getByText("Active Color: ".concat(colorScheme))).toBeInTheDocument();
    });
    test.each([
        ['light', 'dark'],
        ['dark', 'light'],
    ])('should switch to opposite color of "%s" when toggling from "auto"', function (sysPrefColor, switchToTheme) {
        var storageKey = 'sys-resolved-theme';
        (0, device_mock_1.mockPreferredColorScheme)(sysPrefColor);
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme="auto">
          <ThemeAutoToggle_1.default />
        </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual('auto');
        expect(document.documentElement.classList[0]).toBe(sysPrefColor);
        expect(document.documentElement.style.colorScheme).toBe(sysPrefColor);
        react_1.fireEvent.click(react_1.screen.getByText(/toggle theme/i));
        expect((0, storage_adapter_1.read)(storageKey)).toEqual(switchToTheme);
        expect(document.documentElement.classList[0]).toBe(switchToTheme);
        expect(document.documentElement.style.colorScheme).toBe(switchToTheme);
    });
    test.each(['light', 'dark'])('should auto-determine color to be "%s" via `colors.auto`', function (prefColor) {
        var storageKey = 'sys-resolved-theme';
        (0, device_mock_1.mockPreferredColorScheme)(prefColor);
        (0, react_1.render)(<client_1.ThemeProvider storageKey={storageKey} defaultTheme="auto">
          <ThemeAutoToggle_1.default />
        </client_1.ThemeProvider>);
        expect((0, storage_adapter_1.read)(storageKey)).toEqual('auto');
        expect(document.documentElement.classList[0]).toBe(prefColor);
        expect(document.documentElement.style.colorScheme).toBe(prefColor);
    });
});
