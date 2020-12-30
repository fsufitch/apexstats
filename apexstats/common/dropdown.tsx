import React, { FunctionComponent } from 'react';
import { Dropdown } from 'react-bootstrap';

import css from './dropdown.module.sass';

export interface DropdownChoice {
    id: string,
    label: string,
    header?: boolean,
}

interface DropdownProps {
    title: string,
    choices: DropdownChoice[],
    onSelect?: (id: string | null) => void,
}

const Choice: FunctionComponent<DropdownChoice> = ({ id, label, header }) => {
    return <>
        {!!header ?
            <Dropdown.Header> <strong>{label}</strong> </Dropdown.Header>
            :
            <Dropdown.Item eventKey={id}>{label}</Dropdown.Item>
        }
    </>;
}

export const CustomDropdown: FunctionComponent<DropdownProps> = (props) => {
    const onSelect = props.onSelect ?? (() => { });

    return <Dropdown onSelect={onSelect}>
        <Dropdown.Toggle variant="primary">
            {props.title}
        </Dropdown.Toggle>

        <Dropdown.Menu className={css['scrollable']} data-bs-display="static">
            {props.choices.map((choice, i) =>
                <Choice key={i} id={choice.id} label={choice.label} header={choice.header} />
            )}
        </Dropdown.Menu>
    </Dropdown>;
}