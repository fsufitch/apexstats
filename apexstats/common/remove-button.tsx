import React, { FunctionComponent } from 'react';

import css from './remove-button.module.sass';

export const RemoveButton: FunctionComponent<{ onClick?: (e: React.MouseEvent) => void }> = ({ onClick }) => {
    onClick = onClick ?? (() => { });
    return <button
        className={css['btn-remove']}
        onClick={onClick}>&times;</button>;
}