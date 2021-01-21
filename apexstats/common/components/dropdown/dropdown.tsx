import React, { forwardRef, ForwardRefRenderFunction, FunctionComponent } from 'react';
import { Dropdown } from 'react-bootstrap';

import css from './dropdown.module.sass';

export type DropdownChoice =
    | {
          id: string;
          label: string;
          header?: false;
      }
    | { id?: undefined; label: string; header: true };

interface DropdownProps {
    title: string;
    choices: DropdownChoice[];
    onSelect?: (id: string) => void;
    ref?: React.Ref<any>;
}

const Choice: FunctionComponent<{ choice: DropdownChoice }> = (props: { choice: DropdownChoice }) => {
    return (
        <>
            {props.choice.header ? (
                <Dropdown.Header>
                    {' '}
                    <strong>{props.choice.label}</strong>{' '}
                </Dropdown.Header>
            ) : (
                <Dropdown.Item eventKey={props.choice.id}>{props.choice.label}</Dropdown.Item>
            )}
        </>
    );
};

const CustomDropdownRenderFunction: ForwardRefRenderFunction<any, DropdownProps> = (props: DropdownProps, ref) => {
    const onSelect = (id: string | null) => {
        if (!props.onSelect || id === null) return;
        props.onSelect(id);
    };

    console.log('ref', ref);
    return (
        <Dropdown ref={ref} onSelect={onSelect}>
            <Dropdown.Toggle variant="primary">{props.title}</Dropdown.Toggle>

            <Dropdown.Menu className={css['scrollable']} data-bs-display="static">
                {props.choices.map((choice, i) => (
                    <Choice key={i} choice={choice} />
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const CustomDropdown = forwardRef(CustomDropdownRenderFunction);
