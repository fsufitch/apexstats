import React, { useState, useEffect } from 'react';

import css from './nav.module.sass';

import { Link } from 'react-router-dom';

export const TopNavigation = () => {
    const [navCollapsed, setNavCollapsed] = useState(true);

    const toggleNavCollapsed = () => setNavCollapsed(!navCollapsed);

    useEffect(() => {
        if (navCollapsed) {
            $('.navbar-collapse').hide('slow');
        } else {
            $('.navbar-collapse').show('slow');
        }
    }, [navCollapsed]);

    return <nav className={css.navbar}>
        <Link to="/" className={css.brand}>Brand</Link>
        <button className="navbar-toggler" onClick={toggleNavCollapsed}>
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/weapons">Weapon Comparison</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/ttk">TTK Simulation </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                </li>
            </ul>
        </div>
    </nav>;

}
