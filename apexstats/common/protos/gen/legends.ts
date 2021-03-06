// @generated by protobuf-ts 1.0.12 with parameters optimize_code_size
// @generated from protobuf file "legends.proto" (syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
import { Legend } from "./enums";
/**
 * @generated from protobuf message LegendStats
 */
export interface LegendStats {
    /**
     * @generated from protobuf field: Legend id = 1;
     */
    id: Legend;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
}
/**
 * Type for protobuf message LegendStats
 */
class LegendStats$Type extends MessageType<LegendStats> {
    constructor() {
        super("LegendStats", [
            { no: 1, name: "id", kind: "enum", T: () => ["Legend", Legend] },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
export const LegendStats = new LegendStats$Type();
