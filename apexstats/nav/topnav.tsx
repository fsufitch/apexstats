import React, { useState, useEffect } from 'react';

import { css } from 'apexstats/style';
import { Link } from 'react-router-dom';

export const TopNavigation = () => {
    const [navCollapsed, setNavCollapsed] = useState(true);

    const toggleNavCollapsed = () => setNavCollapsed(!navCollapsed);

    useEffect(() => {
        if (navCollapsed) {
            $(`.${css['topnav-content']}`).hide('slow');
        } else {
            $(`.${css['topnav-content']}`).show('slow');
        }
    }, [navCollapsed]);

    return <nav className={css.topnav}>
        <Link to="/" className={css['navbar-brand']}>Brand</Link>
        <button className={css['topnav-collapser']} onClick={toggleNavCollapsed}>
            <span className={css['navbar-toggler-icon']}></span>
        </button>
        <div className={css['topnav-content']}>
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
