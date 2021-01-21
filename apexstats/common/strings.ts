import { Weapon, WeaponComparisonValueType, WeaponModeType, WeaponType } from 'apexstats/common/protos';
import { useContext } from 'react';
import { GameDBContext } from './db';
import { StatSection } from './stats';

export const getWeaponTypeName = (type: WeaponType) => {
    switch (type) {
        case WeaponType.AR:
            return 'Assault rifle';
        case WeaponType.SMG:
            return 'Submachine gun';
        case WeaponType.LMG:
            return 'Light machine gun';
        case WeaponType.SNIPER:
            return 'Sniper rifle';
        case WeaponType.SHOTGUN:
            return 'Shotgun';
        case WeaponType.PISTOL:
            return 'Pistol';
        default:
            return 'Unknown';
    }
};

export const getWeaponModeName = (mode: WeaponModeType) => {
    switch (mode) {
        case WeaponModeType.AUTO:
            return 'Automatic';
        case WeaponModeType.BURST:
            return 'Burst';
        case WeaponModeType.SEMI_AUTOMATIC:
            return 'Semi-automatic';
        default:
            return 'Unknown';
    }
};

export const useWeaponNames = () => {
    const { gameDB } = useContext(GameDBContext);
    return (weapon: Weapon) => gameDB?.getWeaponStats(weapon)?.name;
};

export const getStatSectionName = (section: StatSection) => {
    switch (section) {
        case StatSection.FUNDAMENTALS:
            return 'Fundamentals';
        case StatSection.DAMAGE:
            return 'Damage';
        case StatSection.HANDLING:
            return 'Handling';
        default:
            return `UNKNOWN_STATSECTION: ${section}`;
    }
};

export const getWeaponComparisonValueTypeName = (type: WeaponComparisonValueType) => {
    switch (type) {
        case WeaponComparisonValueType.ADS_MOVE_MULTIPLIER:
            return 'ADS movement speed';
        case WeaponComparisonValueType.AMMO_PER_SHOT:
            return 'Used ammo per shot';
        case WeaponComparisonValueType.BULLETS_PER_SHOT:
            return 'Bullets per shot (spread)';
        case WeaponComparisonValueType.CLIP_TIME:
            return 'Time to empty magazine (s)';
        case WeaponComparisonValueType.DAMAGE:
            return 'Damage';
        case WeaponComparisonValueType.DAMAGE_UNSHIELDED:
            return 'Damage, unshielded';
        case WeaponComparisonValueType.DAMAGE_HEADSHOT:
            return 'Damage, headshot';
        case WeaponComparisonValueType.DAMAGE_HEADSHOT_UNSHIELDED:
            return 'Damage, headshot + unshielded';
        case WeaponComparisonValueType.DAMAGE_LEGSHOT:
            return 'Damage, legshot';
        case WeaponComparisonValueType.DAMAGE_LEGSHOT_UNSHIELDED:
            return 'Damage, legshot + unshielded';
        case WeaponComparisonValueType.DAMAGE_PER_BULLET:
            return 'Damage per bullet (base)';
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE:
            return 'Damage per magazine';
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_HEADSHOT:
            return 'Damage per magazine, headshot';
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_HEADSHOT_UNSHIELDED:
            return 'Damage per magazine, headshot + unshielded';
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_LEGSHOT:
            return 'Damage per magazine, legshot';
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_LEGSHOT_UNSHIELDED:
            return 'Damage per magazine, legshot + unshielded';
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_UNSHIELDED:
            return 'Damage per magazine, unshielded';
        case WeaponComparisonValueType.DAMAGE_PER_SECOND:
            return 'DPS';
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_HEADSHOT:
            return 'DPS, headshot';
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_HEADSHOT_UNSHIELDED:
            return 'DPS, headshot + unshielded';
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_LEGSHOT:
            return 'DPS, legshot';
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_LEGSHOT_UNSHIELDED:
            return 'DPS, legshot + unshielded';
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_UNSHIELDED:
            return 'DPS, unshielded';
        case WeaponComparisonValueType.HEADSHOT_MULTIPLIER:
            return 'Headshot multiplier';
        case WeaponComparisonValueType.LEGSHOT_MULTIPLIER:
            return 'Legshot multiplier';
        case WeaponComparisonValueType.MAGAZINE_SIZE:
            return 'Magazine size';
        case WeaponComparisonValueType.RANDOMNESS_MULTIPLIER:
            return 'Randomness multiplier';
        case WeaponComparisonValueType.RECOIL_MULTIPLIER:
            return 'Recoil multiplier';
        case WeaponComparisonValueType.ROUNDS_PER_MINUTE:
            return 'RPM';
        case WeaponComparisonValueType.SHOTS_PER_CLIP:
            return 'Shots per clip';
        case WeaponComparisonValueType.SHOTS_PER_ROUND:
            return 'Shots per round (burst)';
        case WeaponComparisonValueType.SWITCH_SPEED_MULTIPLIER:
            return 'Weapon switch speed multiplier';

        default:
            return `UNKNOWN_WCVT: ${type}`;
    }
};

export const asRaw = (n: number) => `${n}`;
export const asTwoDecimal = (n: number) =>
    new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
export const asPercent = (n: number) => new Intl.NumberFormat(undefined, { style: 'percent' }).format(n);

export const getWeaponComparisonValueTypeFormatter = (type: WeaponComparisonValueType) => {
    switch (type) {
        case WeaponComparisonValueType.ADS_MOVE_MULTIPLIER:
        case WeaponComparisonValueType.HEADSHOT_MULTIPLIER:
        case WeaponComparisonValueType.LEGSHOT_MULTIPLIER:
        case WeaponComparisonValueType.RANDOMNESS_MULTIPLIER:
        case WeaponComparisonValueType.RECOIL_MULTIPLIER:
        case WeaponComparisonValueType.SWITCH_SPEED_MULTIPLIER:
            return asPercent;

        case WeaponComparisonValueType.CLIP_TIME:
        case WeaponComparisonValueType.DAMAGE:
        case WeaponComparisonValueType.DAMAGE_HEADSHOT:
        case WeaponComparisonValueType.DAMAGE_HEADSHOT_UNSHIELDED:
        case WeaponComparisonValueType.DAMAGE_LEGSHOT:
        case WeaponComparisonValueType.DAMAGE_LEGSHOT_UNSHIELDED:
        case WeaponComparisonValueType.DAMAGE_PER_BULLET:
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE:
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_HEADSHOT:
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_HEADSHOT_UNSHIELDED:
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_LEGSHOT:
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_LEGSHOT_UNSHIELDED:
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_UNSHIELDED:
        case WeaponComparisonValueType.DAMAGE_PER_SECOND:
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_HEADSHOT:
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_HEADSHOT_UNSHIELDED:
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_LEGSHOT:
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_LEGSHOT_UNSHIELDED:
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_UNSHIELDED:
        case WeaponComparisonValueType.DAMAGE_UNSHIELDED:
        case WeaponComparisonValueType.ROUNDS_PER_MINUTE:
            return asTwoDecimal;

        default:
            return asRaw;
    }
};
