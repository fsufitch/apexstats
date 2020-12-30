import React, { FunctionComponent } from "react";

import { CustomDropdown } from "apexstats/common/dropdown";
import { FiringModeID, weapons, weaponTypeIDs, weaponTypes } from "apexstats/game/data";
import { weaponName, weaponTypeName } from "apexstats/game/strings";
import { rowChoices, WeaponComparisonRow } from "./rows";

import css from './comparison-nav.module.sass';

interface Props {
    onAddWeapon?: (id: string | null) => void;
    onAddStat?: (id: string | null) => void;
    onExportCSV?: () => void;
}

export const WeaponModeSuffixes = {
    single: '++single',
    single_amp: '++single-amp',
    burst: '++burst',
    auto: '++auto',
}

const weaponChoices = weaponTypeIDs.map(typeID => [
    { id: '', label: weaponTypeName(typeID), header: true },
    ...weaponTypes[typeID].map(id => ['single', 'single_amp', 'burst', 'auto']
        .map(mode => mode as FiringModeID)
        .filter(mode => !!weapons[id].modes[mode])
        .map(mode => ({
            id: `${id}${WeaponModeSuffixes[mode]}`,
            label: weaponName(id, mode),
            header: false,
        })))
        .reduce((acc, curr) => acc.concat(curr)),
]).reduce((acc, curr) => acc.concat(curr));

const weaponComparisonRowToStatChoice = ({ id, label }: WeaponComparisonRow) => ({ id, label });

const statChoices = rowChoices.map(row => Object.keys(row).includes('id')
    ? weaponComparisonRowToStatChoice(row as WeaponComparisonRow)
    : { id: '', label: row.label, header: true });

export const WeaponComparisonNav: FunctionComponent<Props> = ({ onAddWeapon, onAddStat, onExportCSV }) => {
    onAddWeapon ??= () => { };
    onAddStat ??= () => { };
    onExportCSV ??= () => { };

    return <>
        <ul className={css["nav"]}>
            <li className="nav-item">
                <CustomDropdown title={'(+) Add Stat'} onSelect={onAddStat} choices={statChoices} />
            </li>
            <li className="nav-item">
                <CustomDropdown title={'(+) Add Weapon'} onSelect={onAddWeapon} choices={weaponChoices} />
            </li>
            <li className="nav-item">
                <button className="btn btn-link" onClick={onExportCSV}> Export CSV </button>
            </li>
        </ul></>;
}