import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { CustomDropdown } from "apexstats/common/dropdown";
import { FiringModeID, weapons, weaponTypeIDs, weaponTypes } from "apexstats/game/data";
import { weaponName, weaponTypeName } from "apexstats/game/strings";
import { rowChoices, WeaponComparisonRow } from "./rows";

import css from './comparison-nav.module.sass';
import { Overlay, Tooltip } from "react-bootstrap";

interface Props {
    showTooltip?: boolean;
    onAddWeapon?: (id: string | null) => void;
    onAddStat?: (id: string | null) => void;
    onExportCSV?: () => void;
    onClear?: () => void;
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

export const WeaponComparisonNav: FunctionComponent<Props> = ({ showTooltip, onAddWeapon, onAddStat, onExportCSV, onClear }) => {
    onAddWeapon ??= () => { };
    onAddStat ??= () => { };
    onExportCSV ??= () => { };
    onClear ??= () => { };

    const [tooltip, setTooltip] = useState<boolean>(!!showTooltip);

    useEffect(() => {
        if (showTooltip) {
            setTooltip(true);
        }
    }, [showTooltip]);

    const target = useRef<any>(null);
    console.log('created ref', target);

    return <>
        <ul className={css["nav"]}>
            
            <li className="nav-item">
                <CustomDropdown title={'(+) Add Stat'} onSelect={onAddStat} choices={statChoices} />
            </li>

            <span ref={target}></span>
            <Overlay target={target.current} show={tooltip} placement="bottom">
                <Tooltip id="add-stat-tooltip" onClick={() => setTooltip(false)}>
                    Select some stats and weapons to get started!
                </Tooltip>
            </Overlay>

            <li className="nav-item">
                <CustomDropdown title={'(+) Add Weapon'} onSelect={onAddWeapon} choices={weaponChoices} />
            </li>
            <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={onClear}>Clear</button>
            </li>
        </ul>
    </>;
}