import React, { FunctionComponent } from "react";

import { css } from "apexstats/style";

interface Props {
    onAddWeapon?: () => void;
    onAddStat?: () => void;
    onExportCSV?: () => void;
}

export const WeaponComparisonNav: FunctionComponent<Props> = ({ onAddWeapon, onAddStat, onExportCSV }) => {
    onAddWeapon ??= () => { };
    onAddStat ??= () => { };
    onExportCSV ??= () => { };

    return <ul className={css.nav}>
        <li className={css['nav-item']}>
            <button className={css('btn', 'btn-outline-primary')} onClick={onAddStat}> (+) Add Stat </button>
        </li>
        <li className={css["nav-item"]}>
            <button className={css('btn', 'btn-outline-primary')} onClick={onAddWeapon}> (+) Add Weapon </button>
        </li>
        <li className={css["nav-item"]}>
            <button className={css('btn', 'btn-link')} onClick={onExportCSV}> Export CSV </button>
        </li>
    </ul>;
}