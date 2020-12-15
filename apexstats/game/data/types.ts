/** Game classification of weapon */
export type WeaponType = 'ar' | 'smg' | 'lmg' | 'sniper' | 'sg' | 'pistol';

/** Game classification of ammo type; types with '+' suffix indicate "special" ammo for care package weapons */
export type AmmoType = 'light' | 'heavy' | 'energy' | 'sniper' | 'shell' | 'light+' | 'heavy+' | 'energy+' | 'sniper+' | 'shell+';

/** List of magazine sizes a weapon can handle:
 * - empty list means "no magazine" (e.g. L-STAR)
 * - single element means no magazine upgrade (e.g. shotguns)
 * - 4-element list corresponds to upgrade-able mag: [none, white, blue, purple] 
 * */
export type MagazineSizes = [] | [number] | [number, number, number, number];

export type FiringModeID = 'single' | 'single_amp' | 'burst' | 'auto';

/** Firing speed multipliers corresponding to white, blue, and purple shotgun bolts */
export type ShotgunBoltFiringSpeed = [number, number, number];

/** Recoil reduction multipliers corresponding to white, blue, purple, and gold barrel mods */
export type BarrelRecoilReduction = [number, number, number, number];

export type FiringMode = {
    /** Damage per "bullet" */
    damage: number;
    /** "Bullets" per burst; 1 = non-burst*/
    burst: number;
    /** "Bullets" per shot (i.e. shotguns); 1 = single bullet per shot */
    spread: number;
    /** Firing speed, in RPM */
    rpm: number;

    /** Headshot damage multiplier (typically over 1.0) */
    headshot: number;
    /** Legshot damage multiplier (typically under 1.0) */
    legshot: number;

    /** Textual note to display along with this fire mode */
    note: string;

    /** Base damage against health with the hammerpoint mod; null if hammerpoint unsupported */
    damage_hammerpoint?: number;
    /** Headshot multiplier with skullpiercer mod; null if skullpiercer unsupported */
    headshot_skullpiercer?: number;
};

export type Weapon = {
    type: WeaponType;
    ammo: AmmoType;
    magazine: MagazineSizes;
    /** Percentage of usual move speed when in ADS with a weapon */
    ads_move: number;

    /** True if this weapon is care-package only */
    care_package?: boolean;
    /** Barrel recoil reduction multipliers; null if barrel mods unsupported */
    barrel_recoil_multiplier?: BarrelRecoilReduction;
    /** Shotgun firing speed multipliers; null if shotgun bolts unsupported */
    shotgun_bolt_rpm_multiplier?: ShotgunBoltFiringSpeed;

    modes: { [id in FiringModeID]?: FiringMode },
}

export type WeaponDB = { [id: string]: Weapon }