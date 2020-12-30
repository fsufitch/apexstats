import React, { useState, useEffect, createContext, FunctionComponent } from 'react';

const LOCAL_STORAGE_KEY = 'apexstats.theme';

export type Theme = 'light' | 'dark';

export const DEFAULT_THEME = 'light' as Theme;

const themeClass = (theme: Theme) => ({
    light: 'theme-light',
    dark: 'theme-dark',
}[theme || DEFAULT_THEME]);

export const ThemeContext = createContext({
    theme: DEFAULT_THEME,
    themeClass: themeClass(DEFAULT_THEME),
    setTheme: (theme: Theme) => { },
});

export const Theming: FunctionComponent<{}> = (props) => {
    const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

    // Load the extant theme from local storage
    useEffect(() => {
        const theme = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme || DEFAULT_THEME;
        setThemeState(theme);
    }, []);

    const setTheme = (newTheme: Theme) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
        setThemeState(newTheme);
    }

    return <ThemeContext.Provider value={{ theme, themeClass: themeClass(theme), setTheme }}>
        {props.children}
    </ThemeContext.Provider>;
}
