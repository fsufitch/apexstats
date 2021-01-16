import React, { useState, useEffect } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import { WeaponStats } from 'apexstats/game/stats';
import { FiringModeID, weapons } from 'apexstats/game/data';
import { defaltRowIDs, rowChoices, WeaponComparisonRow } from './rows';
import { RemoveButton } from 'apexstats/common/remove-button';
import { WeaponComparisonNav, WeaponModeSuffixes } from './comparison-nav';
import { weaponName } from 'apexstats/game/strings';
import { ColumnSpec, deserialize, serialize } from './serialization';


export const WeaponComparison = () => {
    const [rowIDs, setRowIDs] = useState<Set<string>>(new Set(defaltRowIDs));
    const [columnSpecs, setColumnSpecs] = useState<ColumnSpec[]>([]);

    const [rows, setRows] = useState<WeaponComparisonRow[]>([]);
    const [columns, setColumns] = useState<WeaponStats[]>([]);    

    useEffect(() => setRows(rowChoices
        .map(r => r as WeaponComparisonRow)
        .filter(r => rowIDs.has(r.id))
    ), [rowIDs]);

    useEffect(() => setColumns(columnSpecs
        .map(({ weaponID, modeID }) => new WeaponStats(weaponID, { firingMode: modeID }))
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

        const newColumnSpecs = [...columnSpecs, { weaponID, modeID }];
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

    const clear = () => {
        setColumnSpecs([]);
        setRowIDs(new Set());
    }

    const location = useLocation();
    const history = useHistory();
    
    useEffect(() => {
        // When rows or columns are updated, update the hash
        const newHash = serialize(rowIDs, columnSpecs);
        const newLocation = {...location, hash: newHash};
        history.replace(newLocation);
    }, [rowIDs, columnSpecs]);

    useEffect(() => {
        // On load, try to set the table from the URL
        try {
            const { rowIDs, columnSpecs } = deserialize(location.hash);
            setRowIDs(new Set(rowIDs));
            setColumnSpecs(columnSpecs);

        } catch (e) {
            console.log('illegal hash', location.hash, e);
            const newLocation = {...location, hash: ''};
            history.replace(newLocation);
        }
    }, []);

    return <>
        <h2> Weapon Comparison </h2>

        <WeaponComparisonNav
            showTooltip={rowIDs.size===0 || columnSpecs.length===0}
            onAddStat={addRow}
            onAddWeapon={addColumn}
            onClear={clear} />

        <table className="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th scope="col">
                        {/*empty*/}
                    </th>
                    {columns.map((col, i) => <th scope="col" key={i} className="text-center">
                        <RemoveButton onClick={() => removeColumn(col.weaponID, col.firingModeID)} />
                        {weaponName(col.weaponID, col.firingModeID)}
                    </th>)}
                    
                </tr>
            </thead>

            <tbody>
                {rows.map((row, i) => <tr key={i}>
                    <th scope="row" className="text-right">
                        {row.label}
                        <RemoveButton onClick={() => removeRow(row.id)} />
                    </th>
                    {columns.map((stat, i) => <td key={i} className="text-right">
                        {row.display(row.extract(stat))}
                    </td>)}
                </tr>)}
            </tbody>
        </table>
    </>;
}