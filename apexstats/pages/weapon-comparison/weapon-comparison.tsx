import React, { useState, useEffect } from 'react';

import { WeaponStats } from 'apexstats/game/stats';
import { FiringModeID, weapons } from 'apexstats/game/data';
import { defaltRowIDs, rowChoices, WeaponComparisonRow } from './rows';
import { RemoveButton } from 'apexstats/common/remove-button';
import { WeaponComparisonNav, WeaponModeSuffixes } from './comparison-nav';
import { weaponName } from 'apexstats/game/strings';

interface ColumnSpec {
    weaponID: string,
    modeID: FiringModeID,
}

export const WeaponComparison = () => {
    const [rowIDs, setRowIDs] = useState<Set<string>>(new Set(defaltRowIDs));
    const [columnSpecs, setColumnSpecs] = useState<ColumnSpec[]>([{ weaponID: 'p20', modeID: 'single' as FiringModeID }]);

    const [rows, setRows] = useState<WeaponComparisonRow[]>([]);
    const [columns, setColumns] = useState<WeaponStats[]>([]);

    useEffect(() => setRows(rowChoices
        .map(r => r as WeaponComparisonRow)
        .filter(r => rowIDs.has(r.id))
    ), [rowIDs]);

    useEffect(() => setColumns(columnSpecs
        .map(({weaponID, modeID}) => new WeaponStats(weaponID, {firingMode: modeID}))
    ), [columnSpecs]);

    const addRow = (rowID: string | null) => {
        if (!rowID) { return; }
        const newRowIDs = new Set(rowIDs);
        newRowIDs.add(rowID);
        setRowIDs(newRowIDs);
    }

    const addColumn = (columnID: string | null) => {
        if (!columnID) {
            console.error('Tried to add empty column ID')
            return;
        }

        const modeID = Object.keys(WeaponModeSuffixes)
            .find(suffix => columnID.endsWith(suffix)) as (FiringModeID | undefined);
        if (modeID === undefined) {
            console.error(`Tried to add column ID without firing mode: ${columnID}`)
            return;
        }

        const weaponID = columnID.split(WeaponModeSuffixes[modeID], 2)[0];
        if (!weapons[weaponID]) {
            console.error(`Unknown weapon '${weaponID}' in ID: ${columnID}`);
            return;
        }

        if (!!columnSpecs.find(it => it.weaponID === weaponID && it.modeID === modeID)) {
            console.warn(`Tried to add duplicate weapon spec ${columnID}`);
            return;
        }

        const newColumnSpecs = [...columnSpecs, {weaponID, modeID}];
        setColumnSpecs(newColumnSpecs);
    }

    const removeColumn = (weaponID: string, modeID: FiringModeID) => {
        setColumnSpecs(columnSpecs.filter(
            spec => spec.weaponID !== weaponID || spec.modeID !== modeID));
    }

    const removeRow = (rowID: string) => {
        const newRowIDs = new Set(rowIDs);
        newRowIDs.delete(rowID);
        setRowIDs(newRowIDs);
    }

    return <>
        <h2> Weapon Comparison </h2>

        <WeaponComparisonNav
            onAddStat={addRow}
            onAddWeapon={addColumn} />

        <table className="table">
            <thead>
                <tr>
                    <th scope="col">
                        {/*empty*/}
                    </th>
                    {columns.map((col, i) => <th scope="col" key={i}>
                        {weaponName(col.weaponID, col.firingModeID)}
                        <RemoveButton onClick={() => removeColumn(col.weaponID, col.firingModeID)}/>
                    </th>)}
                    <th>
                    </th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row, i) => <tr key={i}>
                    <th scope="row">
                        {row.label}
                        <RemoveButton onClick={() => removeRow(row.id)}/>
                    </th>
                    {columns.map((stat, i) => <td key={i}>
                        {row.display(row.extract(stat))}
                    </td>)}
                </tr>)}
            </tbody>
        </table>
    </>;
}