import { useContext, useEffect, useState } from 'react';
import { GameDBContext } from './data/gamedb-context';

import { Weapon, WeaponStats } from 'apexstats/common/protos';

export const useWeaponStats = (id: Weapon) => {
    const { gameDB } = useContext(GameDBContext);
    const [weaponStats, setWeaponStats] = useState<WeaponStats | null>();

    useEffect(() => {
        if (!gameDB) return;
        setWeaponStats(gameDB.getWeaponStats(id));
    }, [gameDB]);

    return { weaponStats };
};
