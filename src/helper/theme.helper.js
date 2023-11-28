import { getCookie, setCookie, eraseCookie } from './cookie.helper';

const THEME_DARK = 'dark'
const THEME_LIGHT = 'light';

const applyPreference = (theme) => {
    const root = document.firstElementChild;
    root.classList.remove(THEME_LIGHT, THEME_DARK);
    root.classList.add(theme);
    root.style.colorScheme = theme;
};

export const getPreference = (storageKey) => {
    if (typeof window === 'undefined') {
        return;
    }

    const cookie = getCookie(storageKey);

    if (cookie) {
        return cookie;
    }

    return window.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`).matches ? THEME_DARK : THEME_LIGHT;
};

export const setPreference = (storageKey, theme) => {
    eraseCookie(storageKey);
    setCookie(storageKey, theme, 365);
    applyPreference(theme);
}

export const getColors = () => ({ dark: THEME_DARK, light: THEME_LIGHT });
