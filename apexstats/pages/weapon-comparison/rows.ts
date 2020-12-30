import { WeaponStats } from 'apexstats/game/stats';

export interface WeaponComparisonRow {
    id: string;
    label: string;
    extract: (s: WeaponStats) => number;
    display: (val: number) => string;
}

interface Divider {
    label: string;
}

const asRaw = (n: number) => `${n}`;
const asTwoDecimal = (n: number) => new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2}).format(n);
const asPercent = (n: number) => new Intl.NumberFormat(undefined, { style: 'percent' }).format(n);

export const rowChoices: (WeaponComparisonRow | Divider)[] = [
    { label: 'Fundamentals' },

    { id: 'f-dmg', label: 'Damage per bullet, body', extract: s => s.bulletDamage(), display: asRaw },
    { id: 'f-spr', label: 'Bullets per round (spread)', extract: s => s.mode.spread, display: asRaw },
    { id: 'f-bur', label: 'Shots per round (burst)', extract: s => s.mode.burst, display: asRaw },
    { id: 'f-mag', label: 'Magazine Size', extract: s => s.magazineSize(), display: asRaw },
    { id: 'f-rpm', label: 'Rounds per minute', extract: s => s.rpm(), display: asRaw },
    { id: 'f-head', label: 'Headshot multiplier', extract: s => s.headshotMultiplier(), display: asPercent },
    { id: 'f-leg', label: 'Legshot multiplier', extract: s => s.legshotMultiplier(), display: asPercent },
    { id: 'f-adsm', label: 'ADS move speed', extract: s => s.weapon.ads_move, display: asPercent },

    { label: 'Damage' },

    { id: 'd-dmg', label: 'Damage', extract: s => s.damage(), display: asRaw },
    { id: 'd-head', label: 'Headshot damage', extract: s => s.headshot(), display: asRaw },
    { id: 'd-leg', label: 'Legshot damage', extract: s => s.legshot(), display: asRaw },
    { id: 'd-dps', label: 'Damage per second', extract: s => s.dps(), display: asRaw },
    { id: 'd-dps-head', label: 'Headshot damage per second', extract: s => s.dpsHeadshot(), display: asRaw },
    { id: 'd-dps-leg', label: 'Legshot damage per second', extract: s => s.dpsLegshot(), display: asRaw },
    { id: 'd-mag', label: 'Damage per magazine', extract: s => s.clipDamage(), display: asRaw },
    { id: 'd-mag-head', label: 'Headshot damage per magazine', extract: s => s.clipHeadshot(), display: asRaw },
    { id: 'd-mag-leg', label: 'Legshot damage per magazine', extract: s => s.clipLegshot(), display: asRaw },

    { label: 'Handling' },

    { id: 'h-mag-time', label: 'Time to empty magazine (s)', extract: s => s.clipTimeSeconds(), display: asTwoDecimal },
    { id: 'h-recoil', label: 'Recoil multiplier', extract: s => s.recoil(), display: asRaw },
];

export const defaltRowIDs = ['f-mag', 'd-dmg', 'd-head', 'd-dps', 'd-mag', 'h-mag-time' ];