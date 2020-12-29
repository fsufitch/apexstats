import { WeaponTypeID } from "./data"

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