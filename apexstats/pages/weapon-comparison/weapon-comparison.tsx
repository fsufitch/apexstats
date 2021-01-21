import { RemoveButton } from 'apexstats/common/components/remove-button/remove-button';
import { GameDBContext } from 'apexstats/common/db';
import { Weapon, WeaponComparisonValueType, WeaponConfiguration, WeaponModeType } from 'apexstats/common/protos';
import { ConfiguredWeaponStats, useStatCalculator } from 'apexstats/common/stats';
import { useWeaponNames } from 'apexstats/common/strings';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { WeaponComparisonNav } from './comparison-nav';
import { getWeaponComparisonValue, WeaponComparisonValue } from './rows';
import { deserializeFromHash, serializeToHash } from './serialization';

export const defaultRows = [
    WeaponComparisonValueType.MAGAZINE_SIZE,
    WeaponComparisonValueType.DAMAGE,
    WeaponComparisonValueType.DAMAGE_HEADSHOT,
    WeaponComparisonValueType.DAMAGE_PER_SECOND,
    WeaponComparisonValueType.DAMAGE_PER_MAGAZINE,
    WeaponComparisonValueType.CLIP_TIME,
].map(getWeaponComparisonValue);

export const defaultWeaponConfigurations = [
    { weaponID: Weapon.R301, mode: WeaponModeType.AUTO, modifiers: [] },
    { weaponID: Weapon.FLATLINE, mode: WeaponModeType.AUTO, modifiers: [] },
];

export const WeaponComparison = () => {
    const [weaponConfigurations, setWeaponConfigurations] = useState<WeaponConfiguration[]>(
        defaultWeaponConfigurations
    );

    const [rows, setRows] = useState<WeaponComparisonValue[]>(defaultRows);
    const [columns, setColumns] = useState<ConfiguredWeaponStats[]>([]);

    const getWeaponName = useWeaponNames();
    const statCalculator = useStatCalculator();
    const { gameDB, loaded } = useContext(GameDBContext);

    // Recreate the calculated column values when the selected weapon configs change
    useEffect(() => (loaded ? setColumns(weaponConfigurations.map(statCalculator)) : void 0), [weaponConfigurations]);

    // Callback for a new row being picked
    const addRow = (value: WeaponComparisonValue) => {
        if (rows.includes(value)) return;
        const newRows = [...rows, value]; // TODO: automatic ordering?
        newRows.sort((a, b) => a.type - b.type);
        setRows(newRows);
    };

    const addWeapon = (weapon: Weapon) => {
        if (!weapon || !gameDB) return;

        const weaponStats = gameDB.getWeaponStats(weapon);
        if (!weapon || !weaponStats) {
            console.error(`Unknown weapon: ${weapon}`);
            return;
        }

        const newWeaponConfiguration: WeaponConfiguration = {
            weaponID: weapon,
            mode: weaponStats.modes[0].type,
            modifiers: [],
        };

        const newWeaponConfigurations = [...weaponConfigurations, newWeaponConfiguration];
        setWeaponConfigurations(newWeaponConfigurations);
    };

    const removeWeaponConfiguration = (index: number) => {
        setWeaponConfigurations(weaponConfigurations.filter((_val, i) => index !== i));
    };

    const removeRow = (index: number) => {
        setRows(rows.filter((_row, i) => index !== i));
    };

    const clear = () => {
        setWeaponConfigurations([]);
        setRows([]);
    };

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        // When rows or columns are updated, update the hash
        const newHash =
            rows.length && weaponConfigurations.length
                ? serializeToHash(
                      rows.map((r) => r.type),
                      weaponConfigurations
                  )
                : '';
        const newLocation = { ...location, hash: newHash };
        history.replace(newLocation);
    }, [rows, weaponConfigurations]);

    useEffect(() => {
        // On load, try to set the table from the URL
        if (!location.hash) {
            setRows(defaultRows);
            setWeaponConfigurations(defaultWeaponConfigurations);
        }
        try {
            const { valueTypes, weaponConfigurations } = deserializeFromHash(location.hash);
            if (!valueTypes.length || !weaponConfigurations.length)
                throw new Error('valueTypes or weaponConfigurations was empty');
            setRows(valueTypes.map(getWeaponComparisonValue));
            setWeaponConfigurations(weaponConfigurations);
        } catch (e) {
            console.log('illegal hash', location.hash, e);
            const newLocation = { ...location, hash: '' };
            history.replace(newLocation);
            setRows(defaultRows);
            setWeaponConfigurations(defaultWeaponConfigurations);
        }
    }, []);

    return (
        <>
            <h2> Weapon Comparison </h2>

            <WeaponComparisonNav onAddStat={addRow} onAddWeapon={addWeapon} onClear={clear} />

            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">{/*empty*/}</th>
                        {columns.map((col, i) => (
                            <th scope="col" key={i} className="text-center">
                                <RemoveButton onClick={() => removeWeaponConfiguration(i)} />
                                {getWeaponName(col.raw.weapon)}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            <th scope="row" className="text-right">
                                {row.label}
                                <RemoveButton onClick={() => removeRow(i)} />
                            </th>
                            {columns.map((stat, i) => (
                                <td key={i} className="text-right">
                                    {row.display(row.extract(stat))}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
