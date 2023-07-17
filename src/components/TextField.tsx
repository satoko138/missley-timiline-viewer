import React, { useId } from 'react';
import { container, label } from './TextField.css';

type Props = {
    label: string;
    children: any;
}

export default function TextField(props: Props) {
    const id = useId();
    const newChildren = React.cloneElement(props.children, {id})

    return (
        <div className={container}>
            <label htmlFor={id} className={label}>{props.label}</label>
            {newChildren}
        </div>
    );
}