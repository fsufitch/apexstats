import React from 'react';

import styles from 'apexstats/style';
import { metadata } from 'apexstats/game/data';

export const Footer = () => {
    return <div className={styles.footer}> 
        <p>
            Apex Stats is an independent fan tool, and  not affiliated with Apex Legends, Respawn Entertainment, or any other official sources. Game data: <code>{metadata.gameVersion}</code>.
        </p>
    </div>
}