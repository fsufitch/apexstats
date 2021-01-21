import { DropdownChoice } from 'apexstats/common/components';
import { WeaponComparisonValueType } from 'apexstats/common/protos';
import {
    ConfiguredWeaponStats,
    getWeaponComparisonValueExtractor,
    StatSection,
    StatSectionContents,
} from 'apexstats/common/stats';
import {
    getStatSectionName,
    getWeaponComparisonValueTypeFormatter,
    getWeaponComparisonValueTypeName,
} from 'apexstats/common/strings';

export interface WeaponComparisonValue {
    type: WeaponComparisonValueType;
    label: string;
    extract: (s: ConfiguredWeaponStats) => number;
    display: (val: number) => string;
}

export const rowChoices: DropdownChoice[] = [
    {
        label: getStatSectionName(StatSection.FUNDAMENTALS),
        header: true,
    },
    ...StatSectionContents[StatSection.FUNDAMENTALS].map((type) => ({
        id: WeaponComparisonValueType[type],
        label: getWeaponComparisonValueTypeName(type),
    })),
    {
        label: getStatSectionName(StatSection.DAMAGE),
        header: true,
    },
    ...StatSectionContents[StatSection.DAMAGE].map((type) => ({
        id: WeaponComparisonValueType[type],
        label: getWeaponComparisonValueTypeName(type),
    })),
    {
        label: getStatSectionName(StatSection.HANDLING),
        header: true,
    },
    ...StatSectionContents[StatSection.HANDLING].map((type) => ({
        id: WeaponComparisonValueType[type],
        label: getWeaponComparisonValueTypeName(type),
    })),
];

export const getWeaponComparisonValueByStringID = (stringID: string) =>
    getWeaponComparisonValue(WeaponComparisonValueType[stringID as keyof typeof WeaponComparisonValueType]);

export const getWeaponComparisonValue = (type: WeaponComparisonValueType): WeaponComparisonValue => ({
    type,
    label: getWeaponComparisonValueTypeName(type),
    extract: getWeaponComparisonValueExtractor(type),
    display: getWeaponComparisonValueTypeFormatter(type),
});
