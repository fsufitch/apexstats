import React, { useState, useEffect } from 'react';

import { WeaponStats } from 'apexstats/game/stats';
import { defaultRows, rowChoices, WeaponComparisonRow } from './rows';
import { RemoveButton } from 'apexstats/common/remove-button';
import { WeaponComparisonNav } from './comparison-nav';


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

    const addStat = () => {
        console.log('add stat clicked');
    }

    const addWeapon = () => {
        console.log('add weapon clicked');
    }

    return <>
        <h2> Weapon Comparison </h2>

        <WeaponComparisonNav
            onAddStat={addStat}
            onAddWeapon={addWeapon} />

        <table className="table">
            <thead>
                <tr>
                    <th scope="col">
                        {/*empty*/}
                    </th>
                    {columns.map((col, i) => <th scope="col" key={i}>
                        {col.weapon.name}
                        <RemoveButton />
                    </th>)}
                    <th>
                    </th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row, i) => <tr key={i}>
                    <th scope="row">
                        {row.label}
                        <RemoveButton />
                    </th>
                    {columns.map((stat, i) => <td key={i}>
                        {row.display(row.extract(stat))}
                    </td>)}
                </tr>)}
            </tbody>
        </table>
    </>;
}