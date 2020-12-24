import React, { FunctionComponent } from 'react';

import styles from 'apexstats/style';

export const RemoveButton: FunctionComponent<{ onClick?: (e: React.MouseEvent) => void }> = ({ onClick }) => {
    onClick = onClick ?? (() => {});
    return <button
        className={styles['btn-remove']} 
        onClick={onClick}>&times;</button>;
}