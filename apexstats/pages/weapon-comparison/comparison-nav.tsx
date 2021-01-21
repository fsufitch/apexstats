import { CustomDropdown } from 'apexstats/common/components/dropdown/dropdown';
import { GameDBContext } from 'apexstats/common/db';
import { Weapon, WeaponType } from 'apexstats/common/protos';
import { getWeaponTypeName, useWeaponNames } from 'apexstats/common/strings';
import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import css from './comparison-nav.module.sass';
import { getWeaponComparisonValueByStringID, rowChoices, WeaponComparisonValue } from './rows';

interface Props {
    showTooltip?: boolean;
    onAddWeapon?: (id: Weapon) => void;
    onAddStat?: (id: WeaponComparisonValue) => void;
    onExportCSV?: () => void;
    onClear?: () => void;
}

type WeaponNavChoice =
    | {
          id: string;
          label: string;
      }
    | { header: true; label: string };

const DISPLAYED_WEAPON_TYPES = [
    WeaponType.ASSAULT_RIFLE,
    WeaponType.LMG,
    WeaponType.SMG,
    WeaponType.SNIPER,
    WeaponType.SHOTGUN,
    WeaponType.PISTOL,
];

const useWeaponChoices = () => {
    const { gameDB, loaded } = useContext(GameDBContext);
    const weaponNameGetter = useWeaponNames();
    const [choices, setChoices] = useState<WeaponNavChoice[]>([]);
    useEffect(() => {
        if (!loaded || !gameDB) return;
        const newChoices: WeaponNavChoice[] = [];
        for (const weaponType of DISPLAYED_WEAPON_TYPES) {
            const weapons = gameDB.getWeaponsOfType(weaponType);
            if (!weapons.length) continue;
            newChoices.push({ label: getWeaponTypeName(weaponType), header: true });
            for (const weapon of gameDB.getWeaponsOfType(weaponType)) {
                const weaponStringID = Weapon[weapon];
                const weaponName = weaponNameGetter(weapon) ?? `MISSINGNAME[${weapon}]`;
                newChoices.push({ id: weaponStringID, label: weaponName });
            }
        }
        setChoices(newChoices);
    }, [gameDB]);

    return choices;
};

export const WeaponComparisonNav: FunctionComponent<Props> = ({
    onAddWeapon,
    onAddStat,
    onExportCSV,
    onClear,
}: Props) => {
    const onAddWeapon_Wrapper = (weaponIDStringUntyped: string) => {
        if (!onAddWeapon || !weaponIDStringUntyped) return;
        const weaponIDString = weaponIDStringUntyped as keyof typeof Weapon;
        const weapon = Weapon[weaponIDString] || Weapon.WEAPON_UNKNOWN;
        return onAddWeapon(weapon);
    };
    const onAddStat_Wrapper = (valueStringID: string) => {
        if (!onAddStat || !valueStringID) return;
        return onAddStat(getWeaponComparisonValueByStringID(valueStringID));
    };
    onClear ??= () => void 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onExportCSV ??= () => void 0;

    const weaponChoices = useWeaponChoices();

    const [tooltip, setTooltip] = useState<boolean>(false);

    const target = useRef<any>(null);

    return (
        <>
            <ul className={css['nav']}>
                <li className="nav-item">
                    <CustomDropdown title={'(+) Add Stat'} onSelect={onAddStat_Wrapper} choices={rowChoices} />
                </li>

                <span ref={target}></span>
                <Overlay target={target.current} show={tooltip} placement="bottom">
                    <Tooltip id="add-stat-tooltip" onClick={() => setTooltip(false)}>
                        Select some stats and weapons to get started!
                    </Tooltip>
                </Overlay>

                <li className="nav-item">
                    <CustomDropdown title={'(+) Add Weapon'} onSelect={onAddWeapon_Wrapper} choices={weaponChoices} />
                </li>
                <li className="nav-item">
                    <button className="btn btn-outline-danger" onClick={onClear}>
                        Clear
                    </button>
                </li>
            </ul>
        </>
    );
};
