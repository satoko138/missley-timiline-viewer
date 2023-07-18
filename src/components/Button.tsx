import React, { useCallback } from 'react';
import { buttonStyle, variant } from './Button.css';

type Props = {
    children?: string;
    onClick?: () => void;
    type: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary';
}

export default function Button(props: Props) {
    const onClick = useCallback(() => {
        if (props.onClick) {
            props.onClick();
        }
    }, [props]);

    return (
        <button className={`${buttonStyle} ${variant[props.type]}`} onClick={onClick}>
            {props.children}
        </button>
    );
}