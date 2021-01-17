import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

import { parseGameData, ApexGameDB } from "./gamedb";
import gameDataYAML from "./gamedata.yaml";

export interface GameDBContextPayload {
  loaded: boolean;
  gameDB: ApexGameDB | null;
  error: string;
}

export const GameDBContext = createContext<GameDBContextPayload>({
  loaded: false,
  gameDB: null,
  error: "",
});

export const GameDBLoader: FunctionComponent<{}> = (props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [gameDB, setGameDB] = useState<ApexGameDB | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Load game data asynchronously
    const { gameData, error } = parseGameData(gameDataYAML);
    setLoaded(true);
    if (!!error) {
      setError(error);
    } else if (!gameData) {
      setError("no error, but game data was nil");
    } else {
      const gameDB = new ApexGameDB(gameData);
      setGameDB(gameDB);
    }
  }, []);

  return (
    <GameDBContext.Provider value={{ loaded, gameDB: gameDB, error }}>
      {props?.children}
    </GameDBContext.Provider>
  );
};
