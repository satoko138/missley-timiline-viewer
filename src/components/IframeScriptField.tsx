import React, { useCallback, useMemo, useState } from 'react';
import { Condition } from '../types/common';
import { iframeArea, iframeTextArea, label } from './IframeScriptField.css';
import Button from './Button';
import { input } from '../styles/common.css';

type Props = {
    condition: Condition;
}

export default function IframeScriptField(props: Props) {
    const [ showCopied, setShowCopied ] = useState(false);

    const iframeScript = useMemo(() => {
        const url = `${document.location.protocol}//${document.location.host}?server=${props.condition.server}&account=${props.condition.account}`;
        return `<iframe title="Misskey Timelines" src="${encodeURI(url)}"</iframe>`;

    }, [props.condition]);

    const onCopyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(iframeScript);
        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 1000);
    }, [iframeScript]);


    return (
        <div className={iframeArea}>
            <label className={label}>
                iframe
            </label>
            <span>
                {showCopied ?
                    <span>Copied</span>
                    :
                    <Button type='outline-primary' onClick={onCopyToClipboard}>Copy</Button>
                }
            </span>
            <textarea readOnly className={`${input} ${iframeTextArea}`} value={iframeScript} />
        </div>
);
}