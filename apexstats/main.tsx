import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from 'apexstats/style';

import { Theming, ThemeContext } from 'apexstats/style/themes';
import { TopNavigation } from './nav';
import { Home } from './pages/home';
import { About } from './pages/about';
import { TTKSimulation } from './pages/ttk-simulation';
import { WeaponComparison } from './pages/weapon-comparison';
import { Footer } from './nav/footer';


const App = () => {
    return <Router>
        <Theming>
            <ThemeContext.Consumer>
                {({ themeClass }) => <>
                    <div className={`${styles['page-background']} ${themeClass}`}></div>
                    <div className={`${styles.container} ${themeClass}`}>
                        <TopNavigation />
                        <div className={styles.content}>
                            <Switch>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route path="/weapons">
                                    <WeaponComparison />
                                </Route>
                                <Route path="/ttk">
                                    <TTKSimulation />
                                </Route>
                                <Route exact path="/about">
                                    <About />
                                </Route>
                                <Route path="*">
                                    404
                                </Route>
                            </Switch>
                        </div>

                        <Footer />
                    </div>
                </>}
            </ThemeContext.Consumer>
        </Theming>
    </Router>;
};

const wrapper = document.getElementById('app');

if (wrapper) {
    ReactDOM.render(<App />, wrapper);
} else {
    console.error('No wrapper element found');
}

console.log('hello world');