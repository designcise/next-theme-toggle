import { getCookie, setCookie, eraseCookie } from './cookie.helper';
import { getColors } from './color.helper';

const color = getColors();

const applyPreference = (theme) => {
    const root = document.firstElementChild;
    root.classList.remove(...Object.values(color));
    root.classList.add(theme);
    root.style.colorScheme = theme;
};

const isServer = () => (typeof window === 'undefined');

export const getPreference = (storageKey) => {
    if (isServer()) {
        return;
    }

    const cookie = getCookie(storageKey);

    if (cookie) {
        return cookie;
    }

    return window.matchMedia(`(prefers-color-scheme: ${color.dark})`).matches ? color.dark : color.light;
};

export const setPreference = (storageKey, theme) => {
    eraseCookie(storageKey);
    setCookie(storageKey, theme, 365);
    applyPreference(theme);
}
