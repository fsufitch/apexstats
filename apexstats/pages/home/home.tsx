import React from 'react';

import { css } from 'apexstats/style';
import { Link } from 'react-router-dom';

export const Home = () => {
    return <div className={css.row}>
        <div className={css['col-md-6']}>
            <div className={css.jumbotron}> 
            <h1> Apex Stats </h1>
            <p className={css.lead}>
                A collection of reference tools to improve your <em>Apex Legends</em> play.
                <Link to="/about"> Learn more here!</Link>
            </p>
            </div>
        </div>
        <div className={css['col-md-6']}>
            <h3>
                <Link to="/weapons">Weapon Comparison</Link>
            </h3>
            <p> Which weapon does more DPS? How long does it take to empty a magazine? Check it out and compare/contrast different weapons here.</p>
            <hr />
            <h3>
                <Link to="/ttk">TTK Simulation</Link>
            </h3>
            <p> Can a Mozambique take anyone down without reloading? Does Octane's regeneration make him more resistant to getting shot? What's the deal with Gibraltar's shield anyway? </p>
        </div>
    </div>;
}