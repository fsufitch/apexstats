import { WeaponDB, WeaponTypeID } from './types';

export const typeIDs: WeaponTypeID[] = ['ar', 'smg', 'lmg', 'sniper', 'sg', 'pistol'];

export const buildWeaponTypes = (weapons: WeaponDB) =>
    typeIDs
        .map((typeID) => ({
            [typeID]: Object.keys(weapons)
                .filter((weaponID) => weapons[weaponID].type === typeID)
                .sort((a, b) => weapons[a].sort_key - weapons[b].sort_key),
        }))
        .reduce((prev, curr) => Object.assign(prev, curr)) as { [id in WeaponTypeID]: string[] };
