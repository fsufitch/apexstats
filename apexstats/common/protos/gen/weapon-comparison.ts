// @generated by protobuf-ts 1.0.12 with parameters optimize_code_size
// @generated from protobuf file "weapon-comparison.proto" (syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
import { WeaponConfiguration } from "./weapons";
/**
 * @generated from protobuf message WeaponComparisonSerializer
 */
export interface WeaponComparisonSerializer {
    /**
     * @generated from protobuf field: repeated WeaponComparisonValueType valueTypes = 1;
     */
    valueTypes: WeaponComparisonValueType[];
    /**
     * @generated from protobuf field: repeated WeaponConfiguration weaponConfigurations = 2;
     */
    weaponConfigurations: WeaponConfiguration[];
}
/**
 * @generated from protobuf enum WeaponComparisonValueType
 */
export enum WeaponComparisonValueType {
    /**
     * @generated from protobuf enum value: WEAPON_COMPARISON_VALUE_TYPE_UNKNOWN = 0;
     */
    WEAPON_COMPARISON_VALUE_TYPE_UNKNOWN = 0,
    /**
     * Fundamentals
     *
     * @generated from protobuf enum value: DAMAGE_PER_BULLET = 1;
     */
    DAMAGE_PER_BULLET = 1,
    /**
     * @generated from protobuf enum value: BULLETS_PER_SHOT = 2;
     */
    BULLETS_PER_SHOT = 2,
    /**
     * @generated from protobuf enum value: SHOTS_PER_ROUND = 3;
     */
    SHOTS_PER_ROUND = 3,
    /**
     * @generated from protobuf enum value: MAGAZINE_SIZE = 4;
     */
    MAGAZINE_SIZE = 4,
    /**
     * @generated from protobuf enum value: ROUNDS_PER_MINUTE = 5;
     */
    ROUNDS_PER_MINUTE = 5,
    /**
     * @generated from protobuf enum value: HEADSHOT_MULTIPLIER = 6;
     */
    HEADSHOT_MULTIPLIER = 6,
    /**
     * @generated from protobuf enum value: LEGSHOT_MULTIPLIER = 7;
     */
    LEGSHOT_MULTIPLIER = 7,
    /**
     * Damage
     *
     * @generated from protobuf enum value: DAMAGE = 8;
     */
    DAMAGE = 8,
    /**
     * @generated from protobuf enum value: DAMAGE_HEADSHOT = 9;
     */
    DAMAGE_HEADSHOT = 9,
    /**
     * @generated from protobuf enum value: DAMAGE_LEGSHOT = 10;
     */
    DAMAGE_LEGSHOT = 10,
    /**
     * @generated from protobuf enum value: DAMAGE_UNSHIELDED = 11;
     */
    DAMAGE_UNSHIELDED = 11,
    /**
     * @generated from protobuf enum value: DAMAGE_HEADSHOT_UNSHIELDED = 12;
     */
    DAMAGE_HEADSHOT_UNSHIELDED = 12,
    /**
     * @generated from protobuf enum value: DAMAGE_LEGSHOT_UNSHIELDED = 13;
     */
    DAMAGE_LEGSHOT_UNSHIELDED = 13,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_SECOND = 14;
     */
    DAMAGE_PER_SECOND = 14,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_SECOND_HEADSHOT = 15;
     */
    DAMAGE_PER_SECOND_HEADSHOT = 15,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_SECOND_LEGSHOT = 16;
     */
    DAMAGE_PER_SECOND_LEGSHOT = 16,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_SECOND_UNSHIELDED = 17;
     */
    DAMAGE_PER_SECOND_UNSHIELDED = 17,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_SECOND_HEADSHOT_UNSHIELDED = 18;
     */
    DAMAGE_PER_SECOND_HEADSHOT_UNSHIELDED = 18,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_SECOND_LEGSHOT_UNSHIELDED = 19;
     */
    DAMAGE_PER_SECOND_LEGSHOT_UNSHIELDED = 19,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_MAGAZINE = 20;
     */
    DAMAGE_PER_MAGAZINE = 20,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_MAGAZINE_HEADSHOT = 21;
     */
    DAMAGE_PER_MAGAZINE_HEADSHOT = 21,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_MAGAZINE_LEGSHOT = 22;
     */
    DAMAGE_PER_MAGAZINE_LEGSHOT = 22,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_MAGAZINE_UNSHIELDED = 23;
     */
    DAMAGE_PER_MAGAZINE_UNSHIELDED = 23,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_MAGAZINE_HEADSHOT_UNSHIELDED = 24;
     */
    DAMAGE_PER_MAGAZINE_HEADSHOT_UNSHIELDED = 24,
    /**
     * @generated from protobuf enum value: DAMAGE_PER_MAGAZINE_LEGSHOT_UNSHIELDED = 25;
     */
    DAMAGE_PER_MAGAZINE_LEGSHOT_UNSHIELDED = 25,
    /**
     * Handling
     *
     * @generated from protobuf enum value: CLIP_TIME = 26;
     */
    CLIP_TIME = 26,
    /**
     * @generated from protobuf enum value: AMMO_PER_SHOT = 27;
     */
    AMMO_PER_SHOT = 27,
    /**
     * @generated from protobuf enum value: SHOTS_PER_CLIP = 28;
     */
    SHOTS_PER_CLIP = 28,
    /**
     * @generated from protobuf enum value: ADS_MOVE_MULTIPLIER = 29;
     */
    ADS_MOVE_MULTIPLIER = 29,
    /**
     * @generated from protobuf enum value: RECOIL_MULTIPLIER = 30;
     */
    RECOIL_MULTIPLIER = 30,
    /**
     * @generated from protobuf enum value: RANDOMNESS_MULTIPLIER = 31;
     */
    RANDOMNESS_MULTIPLIER = 31,
    /**
     * @generated from protobuf enum value: SWITCH_SPEED_MULTIPLIER = 32;
     */
    SWITCH_SPEED_MULTIPLIER = 32
}
/**
 * Type for protobuf message WeaponComparisonSerializer
 */
class WeaponComparisonSerializer$Type extends MessageType<WeaponComparisonSerializer> {
    constructor() {
        super("WeaponComparisonSerializer", [
            { no: 1, name: "valueTypes", kind: "enum", repeat: 1 /*RepeatType.PACKED*/, T: () => ["WeaponComparisonValueType", WeaponComparisonValueType] },
            { no: 2, name: "weaponConfigurations", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => WeaponConfiguration }
        ]);
    }
}
export const WeaponComparisonSerializer = new WeaponComparisonSerializer$Type();