import React, { FunctionComponent } from 'react';

import { css } from 'apexstats/style';

export interface DropdownChoice {
    id: string,
    text: string,
    header?: boolean,
}

interface DropdownProps {
    title: string,
    choices: DropdownChoice[],
    onPick?: (id: string) => void,
}

const Choice = (props: { choice: DropdownChoice, onPicked: (e: React.SyntheticEvent) => void }) => {
    return <>
        {!!props.choice.header ? <>
            <li><hr className={css('dropdown-divider')} /></li>
            <li>
                <span className={css('dropdown-item-text')}>
                    <strong>{props.choice.text}</strong>
                </span>
            </li>
        </> : <li><a href="#"
            className={css('dropdown-item')}
            onClick={props.onPicked}>
            {props.choice.text}
        </a></li>
        }
    </>;
}

export const Dropdown: FunctionComponent<DropdownProps> = (props) => {
    const optionPicked = (e: React.SyntheticEvent, id: string) => {
        const cb = props.onPick ?? (() => { });
        cb(id);
        e.preventDefault();
    }

    return <div className={css.dropdown + " dropdown"} id="wtf">
        <button type="button"
            className={css('btn', 'btn-primary', 'dropdown-toggle') + ' dropdown-toggle'}
            data-bs-toggle="dropdown"
            data-bs-display="static">
            {props.title}
        </button>
        <ul className={css('dropdown-menu')}>
            {props.choices.map((choice, i) =>
                <Choice key={i} choice={choice} onPicked={(e) => optionPicked(e, choice.id)} />
            )}
        </ul>
    </div>;
}