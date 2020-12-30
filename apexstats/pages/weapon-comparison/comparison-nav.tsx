import React, { FunctionComponent } from "react";

import { CustomDropdown, DropdownChoice } from "apexstats/common/dropdown";
import { weapons, weaponTypeIDs, weaponTypes } from "apexstats/game/data";
import { weaponTypeName } from "apexstats/game/strings";
import { rowChoices, WeaponComparisonRow } from "./rows";

interface Props {
    onAddWeapon?: (id: string|null) => void;
    onAddStat?: (id: string|null) => void;
    onExportCSV?: () => void;
}

const weaponChoices = (() => {
    const choices = [] as DropdownChoice[];
    weaponTypeIDs.forEach(typeID => {
        choices.push({id: '', label: weaponTypeName(typeID), header: true});
        weaponTypes[typeID].map(id => ({id, label: weapons[id].name}))
            .forEach(choice => choices.push(choice));
    });
    return choices;
})();

const weaponComparisonRowToStatChoice = ({id, label}: WeaponComparisonRow) => ({id, label});

const statChoices = rowChoices.map(row => Object.keys(row).includes('id') 
    ? weaponComparisonRowToStatChoice(row as WeaponComparisonRow)
    : {id: '', label: row.label, header: true});

export const WeaponComparisonNav: FunctionComponent<Props> = ({ onAddWeapon, onAddStat, onExportCSV }) => {
    onAddWeapon ??= () => { };
    onAddStat ??= () => { };
    onExportCSV ??= () => { };

    return <>
    <ul className="nav">
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