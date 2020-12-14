import React from 'react';
import ReactDOM from 'react-dom';

import styles from './main.scss';
import { Theming } from 'apexstats/theming/themes';
import { RawDataExport } from 'apexstats/raw-export';
import { ThemeSwitcher } from './theme-switcher';

console.log(styles);
console.log(styles.rootContainer);

const App = () => {
    return <Theming>
        <div className={styles.rootContainer}>
            <h1>hello world</h1>
            <p>all work and no play makes jack a dull boy</p>
            <ThemeSwitcher />
            <RawDataExport />
        </div>
    </Theming>;
};

const wrapper = document.getElementById('app');

if (wrapper) {
    ReactDOM.render(<App />, wrapper);
} else {
    console.error('No wrapper element found');
}

console.log('hello world');