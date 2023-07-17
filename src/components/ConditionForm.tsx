import React, { useState, useCallback } from 'react';
import Button from './Button';
import { Condition } from '../types/common';
import TextField from './TextField';
import { conditionForm, input, container, iframeArea, iframeTextArea } from './ConditionForm.css';

type Props = {
    onChange?: (condition: Condition | undefined) => void;
}

export default function ConditionForm(props: Props) {
    const [ server, setServer ] = useState('');
    const [ account, setAccount ] = useState('');
    const [ iframeScript, setUrl ] = useState('');

    const onSearch = useCallback(() => {
        if (!props.onChange) return;
        const condition: Condition | undefined = (server.length === 0) ? undefined : {keyword: server};
        props.onChange(condition);

        if (condition) {
            const url = `${document.location.protocol}//${document.location.host}?keyword=${server}`;
            setUrl(encodeURI(url));

        } else {
            setUrl('');
        }
    }, [props, server]);

    const onClear = useCallback(() => {
        setServer('');
        if (props.onChange) {
            props.onChange(undefined);
        }
    }, [props]);

    const [ showCopied, setShowCopied ] = useState(false);
    const onCopyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(iframeScript);
        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 1000);
    }, [iframeScript]);

    return (
        <div className={container}>
            <div className={conditionForm}>
                <TextField label='Server'>
                    <input type='text' className={input} placeholder='misskey.io'
                            value={server} onChange={(evt) => setServer(evt.target.value)} />
                </TextField>
                <TextField label='Account'>
                    <input type='text' className={input}
                            value={account} onChange={(evt) => setAccount(evt.target.value)} />
                </TextField>
                <Button type='primary' onClick={onSearch}>絞り込み</Button>
                <Button type='outline-primary' onClick={onClear}>クリア</Button>
            </div>
            <div className={iframeArea}>
                <label>
                    iframe
                </label>
                {showCopied ?
                    <span>Copied</span>
                    :
                    <Button type='outline-primary' onClick={onCopyToClipboard}>Copy</Button>
                }
                <textarea readOnly rows={5} className={`${input} ${iframeTextArea}`} value={iframeScript} />
            </div>
        </div>
    );
}