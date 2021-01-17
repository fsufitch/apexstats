import legendsData from './legends.yaml';
import metadataData from './metadata.yaml';
import weaponsData from './weapons.yaml';

import { WeaponDB } from './types';
import { buildWeaponTypes, typeIDs } from './weapon-types';

export const weapons = weaponsData as WeaponDB;
export const weaponTypeIDs = typeIDs;
export const weaponTypes = buildWeaponTypes(weapons);
export const legends = legendsData;
export const metadata = metadataData;

export * from './types';
