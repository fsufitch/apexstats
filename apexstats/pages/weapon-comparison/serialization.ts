import { WeaponComparisonSerializer, WeaponComparisonValueType, WeaponConfiguration } from 'apexstats/common/protos';
import { Base64 } from 'js-base64';

import pako from 'pako';

export const serializeToHash = (
    valueTypes: WeaponComparisonValueType[],
    weaponConfigurations: WeaponConfiguration[]
): string => {
    const bytes = WeaponComparisonSerializer.toBinary({ valueTypes, weaponConfigurations });
    const compressedBytes = pako.deflate(bytes, { level: 9 });
    return Base64.fromUint8Array(compressedBytes, true);
};

export const deserializeFromHash = (hash: string): WeaponComparisonSerializer => {
    const compressedBytes = Base64.toUint8Array(hash);
    const bytes = pako.inflate(compressedBytes);
    return WeaponComparisonSerializer.fromBinary(bytes);
};
