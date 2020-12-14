import React, { useState } from 'react';

import styles, { cssClasses } from 'apexstats/style';
import { Link } from 'react-router-dom';

export const TopNavigation = () => {
    const [navCollapsed, setNavCollapsed] = useState(true);

    const toggleNavCollapsed = () => setNavCollapsed(!navCollapsed);

    return <nav className={styles.topnav}>
        <Link to="/" className={styles['navbar-brand']}>Brand</Link>
        <button className={styles['topnav-collapser']} onClick={toggleNavCollapsed}>
            <span className={styles['navbar-toggler-icon']}></span>
        </button>
        <div className={cssClasses(styles['topnav-content'], navCollapsed ? '' : styles.show)}>
            <ul>
                <li> 
                    <Link to="/weapons">Weapon Comparison</Link>
                 </li>
                <li>
                    <Link to="/ttk">TTK Simulation </Link> 
                </li>
                <li>
                    <Link to="/about">About</Link> 
                </li>
            </ul>
        </div>
    </nav>;

}
