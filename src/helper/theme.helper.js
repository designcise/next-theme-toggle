import { getCookie, setCookie, eraseCookie } from './cookie.helper';
import { getColors } from './color.helper';

const applyPreference = (theme) => {
    const root = document.firstElementChild;
    root.classList.remove(...Object.values(getColors()));
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
