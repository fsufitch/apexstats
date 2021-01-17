import { RawGameData } from 'apexstats/common/protos';

export const parseGameData = (gameDataYAML: { [k: string]: any }) => {
    // TODO: somehow validate that the data is good

    return {
        gameData: RawGameData.fromObject(gameDataYAML),
        error: '',
    };
};

export class ApexGameDB {
    constructor(public raw: RawGameData) {}
}
