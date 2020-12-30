import React, { FunctionComponent } from "react";

import { Dropdown, DropdownChoice } from "apexstats/common/dropdown";
import { weapons, weaponTypeIDs, weaponTypes } from "apexstats/game/data";
import { weaponTypeName } from "apexstats/game/strings";

interface Props {
    onAddWeapon?: () => void;
    onAddStat?: () => void;
    onExportCSV?: () => void;
}

const weaponChoices = (() => {
    const choices = [] as DropdownChoice[];
    weaponTypeIDs.forEach(typeID => {
        choices.push({id: '', text: weaponTypeName(typeID), header: true});
        weaponTypes[typeID].map(id => ({id, text: weapons[id].name}))
            .forEach(choice => choices.push(choice));
    });
    return choices;
})();

export const WeaponComparisonNav: FunctionComponent<Props> = ({ onAddWeapon, onAddStat, onExportCSV }) => {
    onAddWeapon ??= () => { };
    onAddStat ??= () => { };
    onExportCSV ??= () => { };

    return <>
    <ul className="nav">
        <li className="nav-item">
            <Dropdown title={'(+) Add Stat'} onPick={onAddStat} choices={[]} />
        </li>
        <li className="nav-item">
            <Dropdown title={'(+) Add Weapon'} onPick={onAddWeapon} choices={weaponChoices} />
        </li>
        <li className="nav-item">
            <button className="btn btn-link" onClick={onExportCSV}> Export CSV </button>
        </li>
    </ul></>;
}