import React, { useState, useEffect, createContext, FunctionComponent } from 'react';

import * as lightTheme from './lightTheme.scss';
import * as darkTheme from './darkTheme.scss';

const LOCAL_STORAGE_KEY = 'apexstats.theme';

export type Theme = 'light' | 'dark';

export const DEFAULT_THEME = 'light' as Theme;
export const DEFAULT_THEME_STYLE = lightTheme;

export const ThemeContext = createContext({
    theme: DEFAULT_THEME, 
    setTheme: (theme: Theme) => {},
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
    

    return <ThemeContext.Provider value={{theme, setTheme}}>
        {props.children}
    </ThemeContext.Provider>;
}

export function styleChooser<T>(choices: {[theme in Theme]?: T}, defaultStyle: T) {
    return (choice: Theme) => (choices[choice] || defaultStyle);
}

export const globalStyleChooser = styleChooser({
    light: lightTheme,
    dark: darkTheme,
}, DEFAULT_THEME_STYLE)