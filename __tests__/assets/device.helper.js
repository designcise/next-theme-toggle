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

export function mockDeviceStorage() {
    const localStorageMock = (function() {
        let store = {}

        return {
            getItem: function(key) {
                return store[key] || null;
            },
            setItem: function(key, value) {
                store[key] = value.toString();
            },
            removeItem: function(key) {
                delete store[key];
            },
            clear: function() {
                store = {};
            },
        };
    })();

    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    });
}
