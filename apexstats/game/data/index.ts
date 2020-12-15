import legendsData from './legends.yaml';
import metadataData from './metadata.yaml';
import weaponsData from './weapons.yaml';

import { WeaponDB } from './types';

export const weapons = weaponsData as WeaponDB;
export const legends = legendsData;
export const metadata = metadataData;

export * from './types';