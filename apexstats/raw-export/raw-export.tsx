import React, { FunctionComponent } from 'react';

import { ThemeContext } from 'apexstats/style/themes';
import styles from 'apexstats/style';
import * as data from 'apexstats/game';

export const RawDataExport: FunctionComponent = (props, context) => {
    return <ThemeContext.Consumer>{({theme, themeClass}) =>
    <>
        <div>Theme: {theme}, class: {themeClass} </div>
        <textarea className={`${styles['raw-export']} ${themeClass}`}>{JSON.stringify(data, null, 2)}</textarea>
    </>
    }</ThemeContext.Consumer>
}