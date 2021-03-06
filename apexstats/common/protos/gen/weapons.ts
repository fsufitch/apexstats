// @generated by protobuf-ts 1.0.12 with parameters optimize_code_size
// @generated from protobuf file "weapons.proto" (syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
import { Rarity } from "./enums";
import { ModifierType } from "./enums";
import { WeaponModeType } from "./enums";
import { AmmoType } from "./enums";
import { WeaponType } from "./enums";
import { Weapon } from "./enums";
/**
 * @generated from protobuf message WeaponStats
 */
export interface WeaponStats {
    /**
     * @generated from protobuf field: Weapon id = 1;
     */
    id: Weapon;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: WeaponType type = 3;
     */
    type: WeaponType;
    /**
     * @generated from protobuf field: AmmoType ammoType = 4;
     */
    ammoType: AmmoType;
    /**
     * @generated from protobuf field: bool ammoSpecial = 5;
     */
    ammoSpecial: boolean;
    /**
     * @generated from protobuf field: uint32 magazine = 6;
     */
    magazine: number;
    /**
     * @generated from protobuf field: float adsMoveMultiplier = 7;
     */
    adsMoveMultiplier: number;
    /**
     * @generated from protobuf field: repeated WeaponMode modes = 8;
     */
    modes: WeaponMode[];
    /**
     * @generated from protobuf field: repeated Modifier modifiers = 9;
     */
    modifiers: Modifier[];
}
/**
 * @generated from protobuf message WeaponMode
 */
export interface WeaponMode {
    /**
     * @generated from protobuf field: WeaponModeType type = 1;
     */
    type: WeaponModeType;
    /**
     * @generated from protobuf field: uint32 damagePerBullet = 2;
     */
    damagePerBullet: number;
    /**
     * @generated from protobuf field: uint32 bulletsPerShot = 3;
     */
    bulletsPerShot: number;
    /**
     * @generated from protobuf field: uint32 ammoPerShot = 4;
     */
    ammoPerShot: number;
    /**
     * @generated from protobuf field: uint32 shotsPerRound = 5;
     */
    shotsPerRound: number;
    /**
     * @generated from protobuf field: float headshotMultiplier = 6;
     */
    headshotMultiplier: number;
    /**
     * @generated from protobuf field: float legshotMultiplier = 7;
     */
    legshotMultiplier: number;
    /**
     * @generated from protobuf field: float roundsPerMinute = 8;
     */
    roundsPerMinute: number;
    /**
     * @generated from protobuf field: string notes = 9;
     */
    notes: string;
}
/**
 * @generated from protobuf message Modifier
 */
export interface Modifier {
    /**
     * @generated from protobuf field: ModifierType type = 1;
     */
    type: ModifierType;
    /**
     * @generated from protobuf field: repeated StatChanges statChanges = 2;
     */
    statChanges: StatChanges[];
}
/**
 * @generated from protobuf message StatChanges
 */
export interface StatChanges {
    /**
     * @generated from protobuf field: Rarity rarity = 1;
     */
    rarity: Rarity;
    /**
     * @generated from protobuf field: string notes = 2;
     */
    notes: string;
    /**
     * Barrel stab
     *
     * @generated from protobuf field: float recoilMultiplier = 3;
     */
    recoilMultiplier: number;
    /**
     * @generated from protobuf field: float randomnessMultiplier = 4;
     */
    randomnessMultiplier: number;
    /**
     * Shotgun bolt
     *
     * @generated from protobuf field: float rpmMultiplier = 5;
     */
    rpmMultiplier: number;
    /**
     * Light, heavy, and sniper mags
     *
     * @generated from protobuf field: uint32 magazine = 6;
     */
    magazine: number;
    /**
     * Stocks, quickdraw
     *
     * @generated from protobuf field: float switchSpeedMultiplier = 7;
     */
    switchSpeedMultiplier: number;
    /**
     * Double tap
     *
     * @generated from protobuf field: uint32 shotsPerRound = 8;
     */
    shotsPerRound: number;
    /**
     * Hammerpoint
     *
     * @generated from protobuf field: uint32 unshieldedDamage = 9;
     */
    unshieldedDamage: number;
    // Quickdraw
    // ???

    /**
     * Skullpiercer
     *
     * @generated from protobuf field: float headshotMultiplier = 10;
     */
    headshotMultiplier: number;
    // Turbocharger
    // ??

    /**
     * Sentinel Amp
     *
     * @generated from protobuf field: uint32 damagePerBullet = 11;
     */
    damagePerBullet: number;
}
/**
 * @generated from protobuf message WeaponConfiguration
 */
export interface WeaponConfiguration {
    /**
     * @generated from protobuf field: Weapon weaponID = 1;
     */
    weaponID: Weapon;
    /**
     * @generated from protobuf field: WeaponModeType mode = 2;
     */
    mode: WeaponModeType;
    /**
     * @generated from protobuf field: repeated EquippedModifier modifiers = 3;
     */
    modifiers: EquippedModifier[];
}
/**
 * @generated from protobuf message EquippedModifier
 */
export interface EquippedModifier {
    /**
     * @generated from protobuf field: ModifierType type = 1;
     */
    type: ModifierType;
    /**
     * @generated from protobuf field: Rarity rarity = 2;
     */
    rarity: Rarity;
}
/**
 * Type for protobuf message WeaponStats
 */
class WeaponStats$Type extends MessageType<WeaponStats> {
    constructor() {
        super("WeaponStats", [
            { no: 1, name: "id", kind: "enum", T: () => ["Weapon", Weapon] },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "type", kind: "enum", T: () => ["WeaponType", WeaponType] },
            { no: 4, name: "ammoType", kind: "enum", T: () => ["AmmoType", AmmoType] },
            { no: 5, name: "ammoSpecial", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "magazine", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 7, name: "adsMoveMultiplier", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 8, name: "modes", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => WeaponMode },
            { no: 9, name: "modifiers", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Modifier }
        ]);
    }
}
export const WeaponStats = new WeaponStats$Type();
/**
 * Type for protobuf message WeaponMode
 */
class WeaponMode$Type extends MessageType<WeaponMode> {
    constructor() {
        super("WeaponMode", [
            { no: 1, name: "type", kind: "enum", T: () => ["WeaponModeType", WeaponModeType] },
            { no: 2, name: "damagePerBullet", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "bulletsPerShot", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "ammoPerShot", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 5, name: "shotsPerRound", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 6, name: "headshotMultiplier", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 7, name: "legshotMultiplier", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 8, name: "roundsPerMinute", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 9, name: "notes", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
export const WeaponMode = new WeaponMode$Type();
/**
 * Type for protobuf message Modifier
 */
class Modifier$Type extends MessageType<Modifier> {
    constructor() {
        super("Modifier", [
            { no: 1, name: "type", kind: "enum", T: () => ["ModifierType", ModifierType] },
            { no: 2, name: "statChanges", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => StatChanges }
        ]);
    }
}
export const Modifier = new Modifier$Type();
/**
 * Type for protobuf message StatChanges
 */
class StatChanges$Type extends MessageType<StatChanges> {
    constructor() {
        super("StatChanges", [
            { no: 1, name: "rarity", kind: "enum", T: () => ["Rarity", Rarity] },
            { no: 2, name: "notes", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "recoilMultiplier", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 4, name: "randomnessMultiplier", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 5, name: "rpmMultiplier", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 6, name: "magazine", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 7, name: "switchSpeedMultiplier", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 8, name: "shotsPerRound", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 9, name: "unshieldedDamage", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 10, name: "headshotMultiplier", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 11, name: "damagePerBullet", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
}
export const StatChanges = new StatChanges$Type();
/**
 * Type for protobuf message WeaponConfiguration
 */
class WeaponConfiguration$Type extends MessageType<WeaponConfiguration> {
    constructor() {
        super("WeaponConfiguration", [
            { no: 1, name: "weaponID", kind: "enum", T: () => ["Weapon", Weapon] },
            { no: 2, name: "mode", kind: "enum", T: () => ["WeaponModeType", WeaponModeType] },
            { no: 3, name: "modifiers", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => EquippedModifier }
        ]);
    }
}
export const WeaponConfiguration = new WeaponConfiguration$Type();
/**
 * Type for protobuf message EquippedModifier
 */
class EquippedModifier$Type extends MessageType<EquippedModifier> {
    constructor() {
        super("EquippedModifier", [
            { no: 1, name: "type", kind: "enum", T: () => ["ModifierType", ModifierType] },
            { no: 2, name: "rarity", kind: "enum", T: () => ["Rarity", Rarity] }
        ]);
    }
}
export const EquippedModifier = new EquippedModifier$Type();
