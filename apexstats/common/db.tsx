import React, { createContext, FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';

import gameDataYAML from './gamedata.yaml';

import { RawGameData, Weapon, WeaponType } from 'apexstats/common/protos';

export const parseGameData = (gameDataYAML: { [k: string]: any }) => {
    // TODO: somehow validate that the data is good

    return {
        gameData: RawGameData.fromJson(gameDataYAML, { ignoreUnknownFields: true }),
        error: '',
    };
};

export class ApexGameDB {
    constructor(public raw: RawGameData) {}

    version = () => this.raw.version;

    export = () => RawGameData.toJson(this.raw, { enumAsInteger: false });

    getWeaponStats = (id: Weapon) => {
        const filtered = this.raw.weapons.filter((w) => w.id === id);
        return filtered.length ? filtered[0] : null;
    };

    getWeaponsOfType = (type: WeaponType) => this.raw.weapons.filter((w) => w.type == type).map((w) => w.id);
}

export interface GameDBContextPayload {
    loaded: boolean;
    gameDB: ApexGameDB | null;
    error: string;
}

export const GameDBContext = createContext<GameDBContextPayload>({
    loaded: false,
    gameDB: null,
    error: '',
});

export const GameDBLoader: FunctionComponent = (props: PropsWithChildren<unknown>) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [gameDB, setGameDB] = useState<ApexGameDB | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Load game data asynchronously
        const { gameData, error } = parseGameData(gameDataYAML);
        setLoaded(true);
        if (error) {
            setError(error);
        } else if (!gameData) {
            setError('no error, but game data was nil');
        } else {
            const gameDB = new ApexGameDB(gameData);
            setGameDB(gameDB);
        }
    }, []);

    return <GameDBContext.Provider value={{ loaded, gameDB: gameDB, error }}>{props?.children}</GameDBContext.Provider>;
};
