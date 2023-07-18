import React, { useCallback, useMemo, useState } from 'react';
import { Condition } from '../types/common';
import { iframeArea, iframeTextArea, description, copyButtonArea } from './IframeScriptField.css';
import Button from './Button';
import { input } from '../styles/common.css';

type Props = {
    condition: Condition;
}

export default function IframeScriptField(props: Props) {
    const [ showCopied, setShowCopied ] = useState(false);

    const iframeScript = useMemo(() => {
        const url = `${document.location.protocol}//${document.location.host}?server=${props.condition.server}&account=${props.condition.account}`;
        return `<iframe title="Misskey Timelines" style="border:0" width="200" height="300" src="${encodeURI(url)}"></iframe>`;

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
            <p className={description}>以下スクリプトをブログ等に貼り付けてください（[Copy]ボタンでクリップボードにコピーされます）。style, width, height等はお好みの値に調整してください。</p>
            <textarea readOnly className={`${input} ${iframeTextArea}`} value={iframeScript} />
            <div className={copyButtonArea}>
                {showCopied ?
                    <span>Copied</span>
                    :
                    <Button type='outline-primary' onClick={onCopyToClipboard}>Copy</Button>
                }
            </div>
        </div>
);
}