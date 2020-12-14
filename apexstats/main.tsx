import React from 'react';
import ReactDOM from 'react-dom';

import styles from 'apexstats/style';

import { Theming, ThemeContext } from 'apexstats/style/themes';
import { RawDataExport } from 'apexstats/raw-export';
import { ThemeSwitcher } from './theme-switcher';


const App = () => {
    return <Theming>
        <ThemeContext.Consumer>
            {({ themeClass }) => <>
                <div className={`${styles.container} ${themeClass}`}>
                    <h1>hello world</h1>
                    <p>all work and no play makes jack a dull boy</p>
                    <ThemeSwitcher />
                    <RawDataExport />
                </div>
            </>}
        </ThemeContext.Consumer>
    </Theming>;
};

const wrapper = document.getElementById('app');

if (wrapper) {
    ReactDOM.render(<App />, wrapper);
} else {
    console.error('No wrapper element found');
}

console.log('hello world');