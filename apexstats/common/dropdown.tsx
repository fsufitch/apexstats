import React, { forwardRef, ForwardRefRenderFunction, FunctionComponent } from 'react';
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
    ref?: React.Ref<any>,
}

const Choice: FunctionComponent<DropdownChoice> = ({ id, label, header }: DropdownChoice) => {
    return <>
        {header ?
            <Dropdown.Header> <strong>{label}</strong> </Dropdown.Header>
            :
            <Dropdown.Item eventKey={id}>{label}</Dropdown.Item>
        }
    </>;
};

const CustomDropdownRenderFunction: ForwardRefRenderFunction<any, DropdownProps> = (props: DropdownProps, ref) => {
    const onSelect = props.onSelect ?? void(0);

    console.log('ref', ref);
    return <Dropdown ref={ref} onSelect={onSelect}>
        <Dropdown.Toggle variant="primary">
            {props.title}
        </Dropdown.Toggle>

        <Dropdown.Menu className={css['scrollable']} data-bs-display="static">
            {props.choices.map((choice, i) =>
                <Choice key={i} id={choice.id} label={choice.label} header={choice.header} />
            )}
        </Dropdown.Menu>
    </Dropdown>;
};

export const CustomDropdown = forwardRef(CustomDropdownRenderFunction);