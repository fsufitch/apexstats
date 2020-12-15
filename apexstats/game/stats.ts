import { weapons, FiringModeID } from './data';

export type WeaponStatCategory = 'base' | 'damage' | 'handling';
export type Unit = 'damage' | 'second' | 'percent';

export class WeaponStats {
    constructor(private weaponID: string, private options: {
        firingMode?: FiringModeID,
        mag?: 0 | 1 | 2 | 3;
        bolt?: 0 | 1 | 2 | 3;
        barrel?: 0 | 1 | 2 | 3 | 4;
        hammerpoint?: boolean;
        skullpiercer?: boolean;
    }={}) { }

    private get weapon() {
        if (weapons[this.weaponID] === undefined) {
            throw `Weapon ${this.weaponID} does not exist`;
        }
        console.log(`Found weapon`, weapons[this.weaponID]);
        return weapons[this.weaponID];
    };
    private get mode() {
        const supportedModes = Object.keys(this.weapon.modes) as FiringModeID[];
        let modeID = this.options.firingMode;
        if (modeID === undefined && supportedModes.length < 2) {
            modeID = supportedModes[0];
        }

        if (modeID == undefined) {
            throw `Firing mode not specified for ${this.weaponID} but required`;
        }

        const mode = this.weapon.modes[modeID];
        if (mode === undefined) {
            throw `Firing mode ${this.weaponID}.${this.options.firingMode} does not exist`;
        }
        console.log(`Found mode`, mode);
        return mode;
    }

    damage = () => this.mode.spread * (this.options.hammerpoint ? this.mode.damage_hammerpoint!! : this.mode.damage);
    headshot = () => this.damage() * this.headshotMultiplier();
    legshot = () => this.damage() * this.legshotMultiplier();

    headshotMultiplier = () => this.options.skullpiercer ? this.mode.headshot_skullpiercer!! : this.mode.headshot;
    legshotMultiplier = () => this.mode.legshot;

    rpm = () => this.mode.rpm * (this.options.bolt ? this.weapon.shotgun_bolt_rpm_multiplier!![this.options.bolt - 1] : 1)
    rps = () => this.rpm() / 60
    magazineSize = () => {
        switch(this.weapon.magazine.length) {
            case 0:
                return Infinity;
            case 1:
                return this.weapon.magazine[0];
            case 4:
                return this.weapon.magazine[this.options.mag || 0];
        }
    }
    clipTimeSeconds = () => this.magazineSize() / this.rps()

    dps = () => this.damage() * this.rps()
    dpsHeadshot = () => this.headshot() * this.rps();
    dpsLegshot = () => this.legshot() * this.rps();

    burstDamage = () => this.damage() * this.mode.burst;
    burstHeadshot = () => this.headshot() * this.mode.burst;
    burstLegshot = () => this.legshot() * this.mode.burst;

    clipDamage = () => this.magazineSize() * this.damage();
    clipHeadshot = () => this.magazineSize() * this.headshot();
    clipLegshot = () => this.magazineSize() * this.legshot();
}