import { createContext } from 'react';

export default createContext({
    theme: undefined,
    color: undefined,
    toggleTheme: () => {},
    setTheme: () => {},
});