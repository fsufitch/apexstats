import React from 'react';

import { legends, weapons, metadata } from 'apexstats/game/data';
import { GameDBContext } from 'apexstats/game/data/gamedb-context';
import { useWeaponStats } from 'apexstats/game/weapon-stats';
import {
    EquippedModifier,
    ModifierType,
    Rarity,
    Weapon,
    WeaponConfiguration,
    WeaponModeType,
} from 'apexstats/common/protos';
import { Base64 } from 'js-base64';

export const About = () => {
    const downloadGameData = () => {
        const data = JSON.stringify({ legends, weapons: weapons, metadata }, null, 2);
        const bytes = new Blob([data], { type: 'application/json' });

        const a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(bytes);
        a.download = `apexdata_${metadata.gameVersion}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const { weaponStats: ws } = useWeaponStats(13);

    const wc = WeaponConfiguration.create({
        weaponID: Weapon.LONGBOW,
        mode: WeaponModeType.SEMI_AUTOMATIC,
        modifiers: [
            EquippedModifier.create({ rarity: Rarity.RARE, type: ModifierType.BARREL_STAB }),
            EquippedModifier.create({ rarity: Rarity.EPIC, type: ModifierType.SNIPER_MAG }),
            EquippedModifier.create({ rarity: Rarity.LEGENDARY, type: ModifierType.SKULLPIERCER }),
            EquippedModifier.create({ rarity: Rarity.EPIC, type: ModifierType.SNIPER_STOCK }),
        ],
    });

    const bytes = WeaponConfiguration.encode(wc).finish();
    const b64 = Base64.fromUint8Array(bytes, true);
    const json = JSON.stringify(wc.toJSON());

    return (
        <>
            <h2> About </h2>
            <h4> What is this site? </h4>
            <p>{!ws ? 'nope' : JSON.stringify(ws.toJSON())}</p>
            <p>
                <code>
                    [{bytes.length}] {bytes.toString()} &rarr; [{b64.length}] {b64} &rarr; {json}
                </code>
            </p>
            <p>
                This site is intended to be useful as a quick reference while playing Apex Legends. It attempts to
                answer a variety of numbers-oriented questions so you don&apos;t have to think about them in length.
            </p>
            <h4> Where is the data from? </h4>
            <p>
                Data is currently sourced from the{' '}
                <a href="https://apexlegends.gamepedia.com/">Apex Legends on Gamepedia</a>. The data spans{' '}
                {Object.keys(legends).length} legends and {Object.keys(weapons).length} weapons, and represents game
                state on {metadata.gameVersion}. You can download the site&apos;s raw game data as JSON by clicking{' '}
                <a href="javascript:void(0)" onClick={downloadGameData}>
                    here
                </a>
                .
            </p>
            <GameDBContext.Consumer>
                {({ gameDB, error, loaded }) => (
                    <p>
                        A new version of the data is deserialized via protocol buffer.{' '}
                        {!loaded ? (
                            <>The data has not yet loaded</>
                        ) : error ? (
                            <>
                                There was error loading the data: <code>{error}</code>
                            </>
                        ) : (
                            <>
                                The data was successfully loaded. It contains {gameDB?.raw.weapons.length} weapons and{' '}
                                {gameDB?.raw.legends.length} legends.
                            </>
                        )}
                    </p>
                )}
            </GameDBContext.Consumer>

            <h4> Isn&apos;t this accomplished already (or even better) by the wiki itself, or by X other site? </h4>
            <p>
                Yes and no. It is true, this site provides no &quot;new&quot; information. Instead, the aim is to be an{' '}
                <em>presentational</em> upgrade on top of the available tools and sites. It has an emphasis usability,
                especially that on mobile devices. As such, ads (or other slow content) are missing, and information is
                available with a minimum of browsing, clicking, and scrolling. On top of everything else, it is a static
                single-page site, so loading/reloading it should be fast and trivial.
            </p>
            <h4> Can I copy this site? </h4>
            <p>
                Sure! The site itself is MIT licensed and its source code is available{' '}
                <a href="https://github.com/fsufitch/apexstats">here, on Github</a>.
            </p>
        </>
    );
};
