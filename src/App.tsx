import React, { useState, useMemo, useRef, useCallback } from 'react';
import TimelineList from './components/TimelineList';
import ConditionForm from './components/ConditionForm';
import { Condition } from './types/common';
import { useSearchParams } from 'react-router-dom';
import { useMounted } from './util/useMounted';
import { app, conditionArea, spinnerOverlay, timelineArea } from './App.css';
import { myTheme } from './styles/misskeyTheme.css';
import { GetTimelineResult } from './types/api-types';
import { useWatch } from './util/useWatch';
import ConfirmDialog, { ConfirmParam } from './components/ConfirmDialog';
import Spinner from './components/Spinner';
import IframeScriptField from './components/IframeScriptField';

function App() {
    const [ searchParams ] = useSearchParams();
    const [ condition, setCondition ] = useState<Condition|undefined>();
    const [ initialized, setInitialized ] = useState(false);
    const [ data, setData ] = useState<GetTimelineResult|undefined>();
    const loadingRef = useRef(false);
    const [ loading, setLoading ] = useState(false);
    const [ confirm, setConfirm ] = useState<ConfirmParam|undefined>();

    useMounted(() => {
        const server = searchParams.get('server');
        const account = searchParams.get('account');
        if (server && account) {
            setCondition({
                server,
                account,
            })
        }
        setInitialized(true);
    });

    const showCondition = useMemo(() => {
        return searchParams.get('server') === null || searchParams.get('account') === null;
    }, [searchParams])

    const onLoad = useCallback(async() => {
        if (!condition) {
            return;
        }
        if (condition.server.length === 0) {
            setConfirm({
                message: 'Serverを入力してください'
            });
            return;
        }
        if (condition.account.length === 0) {
            setConfirm({
                message: 'Accountを入力してください'
            });
            return;
        }
        if (loadingRef.current) {
            // 二重ロード禁止
            console.log('二重ロード禁止')
            return;
        }
        console.log('load start');
        loadingRef.current = true;
        setLoading(true);
        setData(undefined);

        try {
            const param = Object.entries(condition).map(entry => {
                return entry[0] + '=' + entry[1]
            }).join('&');
            const url = '/api/list' + (param.length > 0 ? `?${param}` : '');
            const res = await fetch(encodeURI(url));
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const result = await res.json() as GetTimelineResult;
            setData(result);
    
        } catch(e) {
            console.warn(e);
            setConfirm({
                message: 'タイムライン取得に失敗しました。サーバ名、アカウントが正しいか確認してください',
            })

        } finally {
            setLoading(false);
            loadingRef.current = false;
        }

    }, [condition]);

    useWatch(() => {
        onLoad();
    }, [condition]);

    const onConfirmClose = useCallback(() => {
        setConfirm(undefined);
    }, []);

    if (!initialized) {
        // 初期化完了前にMediaListで全件取得が動いてしまうので、初期化完了を待つ
        return null;
    }

    return (
        <div className={`${app} ${myTheme}`}>
            {showCondition &&
                <>
                    <div className={conditionArea}>
                        <ConditionForm onChange={(condition) => setCondition(condition)} />
                    </div>
                    {(data && condition) &&
                        <IframeScriptField condition={condition} />
                    }
                </>
            }
            {(data && condition) &&
                <div className={timelineArea}>
                    <TimelineList condition={condition} data={data} />
                </div>
            }
            {loading &&
                <div className={spinnerOverlay}>
                    <Spinner />
                </div>
            }
            <ConfirmDialog show={confirm!==undefined} {...confirm} onClose={onConfirmClose} />
        </div>
    );
}

export default App;
