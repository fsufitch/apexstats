import { FiringModeID, WeaponTypeID, weapons} from "./data"

export const weaponTypeName = (id: WeaponTypeID) => {
    switch (id) {
        case "ar": return "Assault rifle";
        case "smg": return "Submachine gun";
        case "lmg": return "Light machine gun";
        case "sniper": return "Sniper rifle";
        case "sg": return "Shotgun";
        case "pistol": return "Pistol";
    }
}

export const firingModeName = (mode: FiringModeID) => ({
    single: "semi-auto",
    single_amp: "semi-auto + amped",
    burst: "burst",
    auto: "auto",
    unknown: 'unknown',
}[mode]);

export const weaponName = (id: string, mode: FiringModeID) => {
    const toInt = (x: any) => !x ? 0 : 1;
    const numModes = [
        toInt(weapons[id].modes.single),
        toInt(weapons[id].modes.single_amp),
        toInt(weapons[id].modes.burst),
        toInt(weapons[id].modes.auto),
    ].reduce((acc, curr) => acc + curr, 0);

    if ((numModes) > 1) {
        return `${weapons[id].name} (${firingModeName(mode)})`;
    } else {
        return `${weapons[id].name}`;
    }
}