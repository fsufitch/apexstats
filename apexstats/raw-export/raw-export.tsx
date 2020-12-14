import React, { FunctionComponent } from 'react';

import { ThemeContext, styleChooser } from 'apexstats/theming/themes';
import * as data from 'apexstats/data';

import rawExportDarkTheme from './raw-dark.style.scss';
import rawExportLightTheme from './raw-light.style.scss';

const exportStyleChooser = styleChooser({ light: rawExportLightTheme, dark: rawExportDarkTheme }, rawExportLightTheme);

export const RawDataExport: FunctionComponent = (props, context) => {
    return <ThemeContext.Consumer>{({theme}) =>
    <>
        <div>{theme} &rarr; {exportStyleChooser(theme).exportArea}</div>
        <textarea className={exportStyleChooser(theme).exportArea}>{JSON.stringify(data, null, 2)}</textarea>
    </>
    }</ThemeContext.Consumer>
}