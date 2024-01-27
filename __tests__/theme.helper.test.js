"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
require("./mocks/matchMedia.mock");
require("./mocks/localStorage.mock");
var device_mock_1 = require("./mocks/device.mock");
var storage_adapter_1 = require("../src/adapter/storage.adapter");
var theme_helper_1 = require("../src/helper/theme.helper");
var types_1 = require("../src/types");
var storageKey = 'theme-pref';
beforeEach(function () {
    (0, storage_adapter_1.clear)();
});
describe('getThemeByKey()', function () {
    test.each([
        [undefined, undefined, theme_helper_1.themes.auto],
        [undefined, 'dark', theme_helper_1.themes.dark],
        [undefined, 'light', theme_helper_1.themes.light],
        [undefined, 'auto', theme_helper_1.themes.auto],
        ['dark', undefined, theme_helper_1.themes.dark],
        ['light', undefined, theme_helper_1.themes.light],
        ['auto', undefined, theme_helper_1.themes.auto],
        ['dark', 'light', theme_helper_1.themes.dark],
        ['light', 'dark', theme_helper_1.themes.light],
        ['auto', 'light', theme_helper_1.themes.auto],
    ])('should get the theme from storage or the fallback', function (storedTheme, defaultTheme, expectedTheme) {
        if (storedTheme) {
            (0, storage_adapter_1.write)(storageKey, storedTheme);
        }
        var activeTheme = (0, theme_helper_1.getThemeByKey)(storageKey, defaultTheme);
        expect(activeTheme).toEqual(expectedTheme);
    });
});
describe('getColorByThemeType()', function () {
    test.each([
        [theme_helper_1.themes.dark, theme_helper_1.colors.dark],
        [theme_helper_1.themes.light, theme_helper_1.colors.light],
        [theme_helper_1.themes.auto, theme_helper_1.colors.dark],
    ])('should get the color based on the theme (theme: "%o", color: "%s")', function (theme, expectedColor) {
        if (theme.type === types_1.ThemeTypes.auto) {
            (0, device_mock_1.mockPreferredColorScheme)(expectedColor);
        }
        expect((0, theme_helper_1.getColorByThemeType)(theme.type)).toEqual(expectedColor);
    });
});
describe('getFlippedThemeByColor()', function () {
    test.each([
        [theme_helper_1.colors.dark, theme_helper_1.themes.light],
        [theme_helper_1.colors.light, theme_helper_1.themes.dark],
    ])('should get the opposite theme based on the color (color: "%s", theme: "%o")', function (color, expectedTheme) {
        expect((0, theme_helper_1.getFlippedThemeByColor)(color)).toEqual(expectedTheme);
    });
});
describe('themes.auto.color', function () {
    test.each(['dark', 'light'])('should automatically determine the color based on the system preferred color "%s"', function (prefColor) {
        (0, device_mock_1.mockPreferredColorScheme)(prefColor);
        expect(theme_helper_1.themes.auto.color).toEqual(prefColor);
    });
});
