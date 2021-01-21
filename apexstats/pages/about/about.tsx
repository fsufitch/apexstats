import { GameDBContext } from 'apexstats/common/db';
import React, { useContext } from 'react';

export const About = () => {
    const { gameDB } = useContext(GameDBContext);
    const downloadGameData = () => {
        if (!gameDB) return;
        const data = JSON.stringify(gameDB.export());
        const bytes = new Blob([data], { type: 'application/json' });

        const a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(bytes);
        a.download = `apexdata_${gameDB.version}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <>
            <h2> About </h2>
            <h4> What is this site? </h4>

            <p>
                This site is intended to be useful as a quick reference while playing Apex Legends. It attempts to
                answer a variety of numbers-oriented questions so you don&apos;t have to think about them in length.
            </p>
            <h4> Where is the data from? </h4>
            <p>
                Data is currently sourced from the{' '}
                <a href="https://apexlegends.gamepedia.com/">Apex Legends on Gamepedia</a>. The data spans{' '}
                {gameDB?.raw.legends.length} legends and {gameDB?.raw.weapons.length} weapons, and represents game state
                on {gameDB?.version()}. You can download the site&apos;s raw game data as JSON by clicking{' '}
                <a href="javascript:void(0)" onClick={downloadGameData}>
                    here
                </a>
                .
            </p>

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
