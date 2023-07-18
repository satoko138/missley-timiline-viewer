import React, { useRef, useEffect, useCallback } from 'react';
import { bodyStyle, closeBtnStyle, dialogStyle, headerStyle } from './ConfirmDialog.css';

type Props = {
    show: boolean;
    onClose?: () => void;
} & ConfirmParam;

export type ConfirmParam = {
    message?: string;
}
export default function ConfirmDialog(props: Props) {
    const myRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!myRef.current) return;
        if (props.show) {
            if (!myRef.current.open) {
                myRef.current?.showModal();
            }
        } else {
            myRef.current?.close();
        }
    }, [props.show])

    const onClose = useCallback(() => {
        if (!myRef.current) return;
        myRef.current.close();
        if (props.onClose)
            props.onClose();

    }, [props])

    return (
        <dialog ref={myRef} className={dialogStyle}>
            <div className={headerStyle}>
                <span className={closeBtnStyle} onClick={onClose}>×</span>
            </div>
            <div className={bodyStyle}>
                {props.message ?? ''}
            </div>
        </dialog>
    );
}