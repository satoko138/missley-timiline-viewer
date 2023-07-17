import React, { useState, useCallback } from 'react';
import Button from './Button';
import { Condition } from '../types/common';
import TextField from './TextField';
import { conditionForm, container } from './ConditionForm.css';
import { input } from '../styles/common.css';

type Props = {
    onChange?: (condition: Condition | undefined) => void;
}

export default function ConditionForm(props: Props) {
    const [ server, setServer ] = useState('');
    const [ account, setAccount ] = useState('');

    const onSearch = useCallback(() => {
        if (!props.onChange) return;
        const condition: Condition = { server, account };
        props.onChange(condition);

    }, [props, server, account]);

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
                <Button type='primary' onClick={onSearch}>検索</Button>
            </div>
        </div>
    );
}