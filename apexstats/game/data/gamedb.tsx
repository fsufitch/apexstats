import { RawGameData } from 'apexstats/common/protos';

export const parseGameData = (gameDataYAML: { [k: string]: any }) => {
    const verificationMessage = RawGameData.verify(gameDataYAML);
    if (verificationMessage) {
        return {
            gameData: null,
            error: verificationMessage,
        };
    }

    return {
        gameData: RawGameData.fromObject(gameDataYAML),
        error: '',
    };
};

export class ApexGameDB {
    constructor(public raw: RawGameData) {}
}
