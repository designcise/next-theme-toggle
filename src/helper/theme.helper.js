import { read, write, erase } from '../adapter/storage.adapter';
import { getColors } from './color.helper';

const color = getColors();
const isServer = () => (typeof window === 'undefined');

const applyPreference = (theme) => {
    const root = document.firstElementChild;
    root.classList.remove(...Object.values(color));
    root.classList.add(theme);
    root.style.colorScheme = theme;
};

export const getPreference = (storageKey) => {
    if (isServer()) {
        return;
    }

    const cookie = read(storageKey);

    if (cookie) {
        return cookie;
    }

    return window.matchMedia(`(prefers-color-scheme: ${color.dark})`).matches ? color.dark : color.light;
};

export const setPreference = (storageKey, theme) => {
    erase(storageKey);
    write(storageKey, theme);
    applyPreference(theme);
}
