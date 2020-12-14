import React from 'react';
import { ThemeContext } from './theming/themes';

export const ThemeSwitcher = () =>
    <div>
        <ThemeContext.Consumer>
            {({ theme, setTheme }) =>
                <>
                    <span>
                        <strong> Current: {theme} </strong>
                    </span>
                    <button onClick={() => setTheme('light')}>Light</button>
                    <button onClick={() => setTheme('dark')}>Dark</button>
                </>
            }
        </ThemeContext.Consumer>
    </div>;
