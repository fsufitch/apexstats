import { weapons, FiringModeID } from './data';

export type WeaponStatCategory = 'base' | 'damage' | 'handling';
export type Unit = 'damage' | 'second' | 'percent';

export interface WeaponConfiguration {
    firingMode?: FiringModeID;
    mag?: 0 | 1 | 2 | 3;
    bolt?: 0 | 1 | 2 | 3;
    barrel?: 0 | 1 | 2 | 3 | 4;
    hammerpoint?: boolean;
    skullpiercer?: boolean;
}

export class WeaponStats {
    description(): number {
        throw new Error('Method not implemented.');
    }
    constructor(public weaponID: string, private config: WeaponConfiguration = {}) {}

    get weapon() {
        if (weapons[this.weaponID] === undefined) {
            throw `Weapon ${this.weaponID} does not exist`;
        }
        return weapons[this.weaponID];
    }

    get firingModeID() {
        const supportedModes = Object.keys(this.weapon.modes) as FiringModeID[];
        let modeID = this.config.firingMode;
        if (modeID === undefined && supportedModes.length < 2) {
            modeID = supportedModes[0];
        }

        if (modeID == undefined) {
            throw `Firing mode not specified for ${this.weaponID} but required`;
        }
        return modeID;
    }

    get mode() {
        const modeID = this.firingModeID;
        const mode = this.weapon.modes[modeID];
        if (mode === undefined) {
            throw `Firing mode ${this.weaponID}.${modeID} does not exist`;
        }
        return mode;
    }

    bulletDamage = () => (this.config.hammerpoint ? this.mode.damage_hammerpoint || 0 : this.mode.damage);
    bulletHeadshot = () => this.bulletDamage() * this.headshotMultiplier();
    bulletLegshot = () => this.bulletDamage() * this.legshotMultiplier();

    damage = () => this.mode.spread * this.bulletDamage();
    headshot = () => this.damage() * this.headshotMultiplier();
    legshot = () => this.damage() * this.legshotMultiplier();

    headshotMultiplier = () => (this.config.skullpiercer ? this.mode.headshot_skullpiercer || 0 : this.mode.headshot);
    legshotMultiplier = () => this.mode.legshot;

    rpm = () =>
        this.mode.rpm *
        (this.config.bolt && this.weapon.shotgun_bolt_rpm_multiplier
            ? this.weapon.shotgun_bolt_rpm_multiplier[this.config.bolt - 1]
            : 1);
    rps = () => this.rpm() / 60;
    magazineSize = () => {
        switch (this.weapon.magazine.length) {
            case 0:
                return Infinity;
            case 1:
                return this.weapon.magazine[0];
            case 4:
                return this.weapon.magazine[this.config.mag || 0];
        }
    };
    clipTimeSeconds = () => this.magazineSize() / this.rps();

    dps = () => this.damage() * this.rps();
    dpsHeadshot = () => this.headshot() * this.rps();
    dpsLegshot = () => this.legshot() * this.rps();

    burstDamage = () => this.damage() * this.mode.burst;
    burstHeadshot = () => this.headshot() * this.mode.burst;
    burstLegshot = () => this.legshot() * this.mode.burst;

    clipDamage = () => this.magazineSize() * this.damage();
    clipHeadshot = () => this.magazineSize() * this.headshot();
    clipLegshot = () => this.magazineSize() * this.legshot();

    recoil = () =>
        this.config.barrel && this.weapon.barrel_recoil_multiplier
            ? this.weapon.barrel_recoil_multiplier[this.config.barrel - 1] ?? 1.0
            : 1.0;
}
