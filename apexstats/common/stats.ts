import { WeaponConfiguration, WeaponComparisonValueType, Weapon } from 'apexstats/common/protos';
import { useContext } from 'react';
import { GameDBContext } from './db';

export interface RawStats {
    weapon: Weapon;

    damagePerBullet: number;
    damagePerBullet_Unshielded: number;

    headshotMultiplier: number;
    legshotMultiplier: number;

    ammoPerShot: number;
    bulletsPerShot: number;
    shotsPerRound: number;
    roundsPerMinute: number;
    magazine: number;

    adsMoveMultiplier: number;
    recoilMultiplier: number;
    randomnessMultiplier: number;
    switchSpeedMultiplier: number;
}

type ShotLocation = 'head' | 'leg' | 'body';
export class CalculatedStats {
    constructor(private raw: RawStats) {}

    damagePerBullet = (location: ShotLocation = 'body', unshielded?: boolean) =>
        (unshielded ? this.raw.damagePerBullet_Unshielded : this.raw.damagePerBullet) *
        (location === 'head' ? this.raw.headshotMultiplier : location === 'leg' ? this.raw.legshotMultiplier : 1);

    damagePerShot = (location: ShotLocation = 'body', unshielded?: boolean) =>
        this.damagePerBullet(location, unshielded) * this.raw.bulletsPerShot;

    damagePerRound = (location: ShotLocation = 'body', unshielded?: boolean) =>
        this.damagePerShot(location, unshielded) * this.raw.shotsPerRound;

    roundsPerSecond = this.raw.roundsPerMinute / 60;

    damagePerSecond = (location: ShotLocation = 'body', unshielded?: boolean) =>
        this.damagePerRound(location, unshielded) * this.roundsPerSecond;

    shotsPerClip = this.raw.magazine / this.raw.ammoPerShot;
    clipTimeSeconds = this.shotsPerClip / this.roundsPerSecond;

    damagePerMagazine = (location: ShotLocation = 'body', unshielded?: boolean) =>
        this.shotsPerClip * this.damagePerShot(location, unshielded);
}
export interface ConfiguredWeaponStats {
    raw: RawStats;
    calculated: CalculatedStats;
}

export const useStatCalculator = () => {
    const { gameDB, loaded } = useContext(GameDBContext);
    return (conf: WeaponConfiguration): ConfiguredWeaponStats => {
        if (!loaded || !gameDB) throw new Error('Tried to use stat calculator with non-loaded game DB');

        const weaponStats = gameDB.getWeaponStats(conf.weaponID);
        if (!weaponStats) throw new Error(`weapon not found: ${conf.weaponID}`);

        const weaponMode = weaponStats.modes.find((m) => m.type === conf.mode);
        if (!weaponMode) throw new Error(`weapon mode not found: ${weaponMode}`);

        const raw: RawStats = {
            weapon: conf.weaponID,
            damagePerBullet: weaponMode.damagePerBullet,
            damagePerBullet_Unshielded: weaponMode.damagePerBullet,
            headshotMultiplier: weaponMode.headshotMultiplier,
            legshotMultiplier: weaponMode.legshotMultiplier,
            ammoPerShot: weaponMode.ammoPerShot,
            bulletsPerShot: weaponMode.bulletsPerShot,
            shotsPerRound: weaponMode.shotsPerRound,
            roundsPerMinute: weaponMode.roundsPerMinute,
            magazine: weaponStats.magazine,
            adsMoveMultiplier: weaponStats.adsMoveMultiplier,
            recoilMultiplier: 1.0,
            randomnessMultiplier: 1.0,
            switchSpeedMultiplier: 1.0,
        };

        conf.modifiers
            .map(({ rarity, type }) => ({
                statChanges: weaponStats.modifiers.find((mod) => type === mod.type)?.statChanges ?? [],
                rarity,
            }))
            .map(({ statChanges, rarity }) =>
                statChanges.length < 2 ? statChanges[0] : statChanges.find((s) => s.rarity === rarity)
            )
            .forEach((statChanges) => {
                if (!statChanges) return;
                raw.damagePerBullet = statChanges.damagePerBullet ?? raw.damagePerBullet;
                raw.damagePerBullet_Unshielded = statChanges.unshieldedDamage ?? raw.damagePerBullet_Unshielded;
                raw.headshotMultiplier = statChanges.headshotMultiplier ?? raw.headshotMultiplier;
                // raw.bulletsPerShot = ... // no modifiers change this
                raw.shotsPerRound = statChanges.shotsPerRound ?? raw.shotsPerRound;
                // raw.legshotMultiplier = ... // no modifiers change this
                raw.roundsPerMinute = raw.roundsPerMinute * (statChanges.rpmMultiplier ?? 1);
                raw.magazine = statChanges.magazine ?? raw.magazine;
                raw.recoilMultiplier = statChanges.recoilMultiplier ?? raw.recoilMultiplier;
                raw.randomnessMultiplier = statChanges.randomnessMultiplier ?? raw.randomnessMultiplier;
            });

        const calculated = new CalculatedStats(raw);
        return { raw, calculated };
    };
};

export enum StatSection {
    FUNDAMENTALS,
    DAMAGE,
    HANDLING,
}

export const StatSectionContents = {
    [StatSection.FUNDAMENTALS]: [
        WeaponComparisonValueType.DAMAGE_PER_BULLET,
        WeaponComparisonValueType.BULLETS_PER_SHOT,
        WeaponComparisonValueType.SHOTS_PER_ROUND,
        WeaponComparisonValueType.MAGAZINE_SIZE,
        WeaponComparisonValueType.ROUNDS_PER_MINUTE,
        WeaponComparisonValueType.HEADSHOT_MULTIPLIER,
        WeaponComparisonValueType.LEGSHOT_MULTIPLIER,
        WeaponComparisonValueType.ADS_MOVE_MULTIPLIER,
    ],
    [StatSection.DAMAGE]: [
        WeaponComparisonValueType.DAMAGE,
        WeaponComparisonValueType.DAMAGE_HEADSHOT,
        WeaponComparisonValueType.DAMAGE_LEGSHOT,
        WeaponComparisonValueType.DAMAGE_UNSHIELDED,
        WeaponComparisonValueType.DAMAGE_HEADSHOT_UNSHIELDED,
        WeaponComparisonValueType.DAMAGE_LEGSHOT_UNSHIELDED,
        WeaponComparisonValueType.DAMAGE_PER_SECOND,
        WeaponComparisonValueType.DAMAGE_PER_SECOND_HEADSHOT,
        WeaponComparisonValueType.DAMAGE_PER_SECOND_LEGSHOT,
        WeaponComparisonValueType.DAMAGE_PER_SECOND_UNSHIELDED,
        WeaponComparisonValueType.DAMAGE_PER_SECOND_HEADSHOT_UNSHIELDED,
        WeaponComparisonValueType.DAMAGE_PER_SECOND_LEGSHOT_UNSHIELDED,
        WeaponComparisonValueType.DAMAGE_PER_MAGAZINE,
        WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_HEADSHOT,
        WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_LEGSHOT,
        WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_UNSHIELDED,
        WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_HEADSHOT_UNSHIELDED,
        WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_LEGSHOT_UNSHIELDED,
    ],
    [StatSection.HANDLING]: [
        WeaponComparisonValueType.CLIP_TIME,
        WeaponComparisonValueType.SHOTS_PER_CLIP,
        WeaponComparisonValueType.RECOIL_MULTIPLIER,
        WeaponComparisonValueType.RANDOMNESS_MULTIPLIER,
        WeaponComparisonValueType.SWITCH_SPEED_MULTIPLIER,
    ],
};

export const getWeaponComparisonValueExtractor = (
    type: WeaponComparisonValueType
): ((s: ConfiguredWeaponStats) => number) => {
    switch (type) {
        case WeaponComparisonValueType.ADS_MOVE_MULTIPLIER:
            return (s) => s.raw.adsMoveMultiplier;
        case WeaponComparisonValueType.AMMO_PER_SHOT:
            return (s) => s.raw.ammoPerShot;
        case WeaponComparisonValueType.BULLETS_PER_SHOT:
            return (s) => s.raw.bulletsPerShot;
        case WeaponComparisonValueType.CLIP_TIME:
            return (s) => s.calculated.clipTimeSeconds;
        case WeaponComparisonValueType.DAMAGE:
            return (s) => s.calculated.damagePerRound();
        case WeaponComparisonValueType.DAMAGE_HEADSHOT:
            return (s) => s.calculated.damagePerRound('head');
        case WeaponComparisonValueType.DAMAGE_HEADSHOT_UNSHIELDED:
            return (s) => s.calculated.damagePerRound('head', true);
        case WeaponComparisonValueType.DAMAGE_LEGSHOT:
            return (s) => s.calculated.damagePerRound('leg');
        case WeaponComparisonValueType.DAMAGE_LEGSHOT_UNSHIELDED:
            return (s) => s.calculated.damagePerRound('leg', true);
        case WeaponComparisonValueType.DAMAGE_UNSHIELDED:
            return (s) => s.calculated.damagePerRound(undefined, true);
        case WeaponComparisonValueType.DAMAGE_PER_BULLET:
            return (s) => s.raw.damagePerBullet;
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE:
            return (s) => s.calculated.damagePerMagazine();
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_HEADSHOT:
            return (s) => s.calculated.damagePerMagazine('head');
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_HEADSHOT_UNSHIELDED:
            return (s) => s.calculated.damagePerMagazine('head', true);
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_LEGSHOT:
            return (s) => s.calculated.damagePerMagazine('leg');
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_LEGSHOT_UNSHIELDED:
            return (s) => s.calculated.damagePerMagazine('leg', true);
        case WeaponComparisonValueType.DAMAGE_PER_MAGAZINE_UNSHIELDED:
            return (s) => s.calculated.damagePerMagazine(undefined, true);
        case WeaponComparisonValueType.DAMAGE_PER_SECOND:
            return (s) => s.calculated.damagePerSecond();
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_HEADSHOT:
            return (s) => s.calculated.damagePerSecond('head');
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_HEADSHOT_UNSHIELDED:
            return (s) => s.calculated.damagePerSecond('head', true);
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_LEGSHOT:
            return (s) => s.calculated.damagePerSecond('leg');
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_LEGSHOT_UNSHIELDED:
            return (s) => s.calculated.damagePerSecond('leg', true);
        case WeaponComparisonValueType.DAMAGE_PER_SECOND_UNSHIELDED:
            return (s) => s.calculated.damagePerSecond(undefined, true);
        case WeaponComparisonValueType.HEADSHOT_MULTIPLIER:
            return (s) => s.raw.headshotMultiplier;
        case WeaponComparisonValueType.LEGSHOT_MULTIPLIER:
            return (s) => s.raw.legshotMultiplier;
        case WeaponComparisonValueType.MAGAZINE_SIZE:
            return (s) => s.raw.magazine;
        case WeaponComparisonValueType.RANDOMNESS_MULTIPLIER:
            return (s) => s.raw.randomnessMultiplier;
        case WeaponComparisonValueType.RECOIL_MULTIPLIER:
            return (s) => s.raw.recoilMultiplier;
        case WeaponComparisonValueType.ROUNDS_PER_MINUTE:
            return (s) => s.raw.roundsPerMinute;
        case WeaponComparisonValueType.SHOTS_PER_CLIP:
            return (s) => s.calculated.shotsPerClip;
        case WeaponComparisonValueType.SHOTS_PER_ROUND:
            return (s) => s.raw.shotsPerRound;
        case WeaponComparisonValueType.SWITCH_SPEED_MULTIPLIER:
            return (s) => s.raw.switchSpeedMultiplier;

        default:
            throw new Error(`UNKNOWN_WCVT: ${type}`);
    }
};
