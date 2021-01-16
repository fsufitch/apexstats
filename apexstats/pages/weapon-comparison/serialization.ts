import { Base64 } from 'js-base64';

import { WeaponComparisonSpecMessage } from "apexstats/common/protos";
import { FiringModeID } from "apexstats/game/data";

export interface ColumnSpec {
    weaponID: string,
    modeID: FiringModeID,
}

export const serialize = (rowIDs: Iterable<string>, columnSpecs: ColumnSpec[]) => {
    const message = WeaponComparisonSpecMessage.create({
        rowIDs: Array.from(rowIDs), 
        columnSpecs: columnSpecs.map(s => WeaponComparisonSpecMessage.ColumnSpecMessage.create({
            weaponID: s.weaponID,
            firingMode: toFiringModeEnum(s.modeID),
        }))
    });

    const bytes = WeaponComparisonSpecMessage.encode(message).finish();
    return Base64.fromUint8Array(bytes);
}

export const deserialize = (fragment: string): {rowIDs: string[], columnSpecs: ColumnSpec[]} => {
    const bytes = Base64.toUint8Array(fragment);
    const message =WeaponComparisonSpecMessage.decode(bytes);
    return {
        rowIDs: message.rowIDs,
        columnSpecs: message.columnSpecs.map(s => ({
            weaponID: `${s.weaponID}`,
            modeID: fromFiringModeEnum(s.firingMode!!),
        })),
    }
}

const toFiringModeEnum = (mode: FiringModeID) => {
    switch (mode) {
        case 'single': return WeaponComparisonSpecMessage.ColumnSpecMessage.FiringModeEnum.SINGLE;
        case 'single_amp': return WeaponComparisonSpecMessage.ColumnSpecMessage.FiringModeEnum.SINGLE_AMP;
        case 'burst': return WeaponComparisonSpecMessage.ColumnSpecMessage.FiringModeEnum.BURST;
        case 'auto': return WeaponComparisonSpecMessage.ColumnSpecMessage.FiringModeEnum.AUTO;
        default: return WeaponComparisonSpecMessage.ColumnSpecMessage.FiringModeEnum.UNKNOWN;
    }
}

const fromFiringModeEnum = (mode: WeaponComparisonSpecMessage.ColumnSpecMessage.FiringModeEnum) => {
    switch (mode) {
        case WeaponComparisonSpecMessage.ColumnSpecMessage.FiringModeEnum.SINGLE: return 'single';
        case WeaponComparisonSpecMessage.ColumnSpecMessage.FiringModeEnum.SINGLE_AMP: return 'single_amp';
        case WeaponComparisonSpecMessage.ColumnSpecMessage.FiringModeEnum.BURST: return 'burst';
        case WeaponComparisonSpecMessage.ColumnSpecMessage.FiringModeEnum.AUTO: return 'auto';
        default: return 'unknown';
    }
}