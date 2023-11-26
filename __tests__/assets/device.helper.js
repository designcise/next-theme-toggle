export function setDeviceTheme(theme) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: theme === 'dark',
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }))
    })
}

export function setDeviceCookie(name, value) {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `${name}=${value}`,
    });
}

export function clearAllDeviceCookies() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}
