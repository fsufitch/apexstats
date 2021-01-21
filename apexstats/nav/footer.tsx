import React, { useContext } from 'react';

import css from './nav.module.sass';

import { GameDBContext } from 'apexstats/common/db';

export const Footer = () => {
    const { gameDB } = useContext(GameDBContext);
    return (
        <div className={css['footer']}>
            <p>
                Apex Stats is an independent fan tool, and not affiliated with Apex Legends, Respawn Entertainment, or
                any other official sources. Game data: <code>{gameDB?.version()}</code>.
            </p>
        </div>
    );
};
