import React, { useState, useEffect } from 'react';

import styles from 'apexstats/style';
import { WeaponStats } from 'apexstats/game/stats';
import { defaultRows, rowChoices, WeaponComparisonRow } from './rows';
import { RemoveButton } from 'apexstats/common/remove-button';


export const WeaponComparison = () => {
    const [rowIDs] = useState<string[]>(defaultRows);
    const [columns, setColumns] = useState<WeaponStats[]>([]);

    const rows = rowIDs.map(id => rowChoices
        .find(row => (row as WeaponComparisonRow).id == id))
        .filter(row => !!row)
        .map(row => row as WeaponComparisonRow);

    useEffect(() => {
        setColumns([
            new WeaponStats('p20'),
            new WeaponStats('mozambique'),
            new WeaponStats('lstar'),
        ])
    }, []);


    return <>
        <h2> Weapon Comparison </h2>

        <p>
            <button className={`${styles.btn} ${styles['btn-primary']}`}>(+) Add Stat</button>
            <button className={`${styles.btn} ${styles['btn-primary']}`}>(+) Add Weapon</button>
        </p>
        
        <table className={styles.table}>
            <tr>
                <th scope="col">
                    {/*empty*/}
                </th>
                {columns.map((col) => <th scope="col">
                    {col.weapon.name}
                    <RemoveButton />
                </th>)}
                <th>
                </th>
            </tr>

            {rows.map((row) => <tr>
                <th scope="row">
                    {row.label}
                    <RemoveButton />
                </th>
                {columns.map((stat) => <td>
                    {row.display(row.extract(stat))}
                </td>)}
            </tr>)}
        </table>
    </>;
}