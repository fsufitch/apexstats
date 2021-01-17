import React, { FunctionComponent } from 'react';

import css from './remove-button.module.sass';

interface RemoveButtonProps {
    onClick?: (e: React.MouseEvent) => void;
}

export const RemoveButton: FunctionComponent<RemoveButtonProps> = ({ onClick }: RemoveButtonProps) => {
    onClick = onClick ?? void 0;
    return (
        <button className={css['btn-remove']} onClick={onClick}>
            &times;
        </button>
    );
};
