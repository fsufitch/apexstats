import { WeaponStats } from 'apexstats/game/stats';
import React from 'react';

export const WeaponComparison = () => {
    return <>
        <h2> Weapon Comparison </h2>

        <p> Coming soon&trade;!</p>

        <hr />

        <h4> But just a sample... </h4>

        <ul>
            <li> Kraber headshot damage: {new WeaponStats('kraber').headshot()}</li>
            <li> Prowler magazine size: {new WeaponStats('prowler').magazineSize()} </li>
            <li> P2020 body DPS: {new WeaponStats('p20').dps()} </li>
            <li> Devotion clip damage with a blue mag: {new WeaponStats('devotion', { mag: 2 }).clipDamage()} </li>
            <li> Sentinel headshot clip damage with a purple mag, while amped: { new WeaponStats('sentinel', {firingMode: 'single_amp', mag: 3}).clipHeadshot() }</li>
            <li> Time to go through a R-99 with no mag: { new WeaponStats('r99').clipTimeSeconds() } seconds </li>
        </ul>
    </>;
}