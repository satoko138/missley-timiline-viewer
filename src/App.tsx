import React, { useState, useMemo, useRef, useCallback } from 'react';
import TimelineList from './components/TimelineList';
import ConditionForm from './components/ConditionForm';
import { Condition } from './types/common';
import { useSearchParams } from 'react-router-dom';
import { useMounted } from './util/useMounted';
import { app, conditionArea, explainParagraphStyle, footerStyle, gitHubLogStyle, spinnerOverlay, timelineArea, titleStyle } from './App.css';
import { myTheme } from './styles/misskeyTheme.css';
import { GetTimelineResult } from './types/api-types';
import { useWatch } from './util/useWatch';
import ConfirmDialog, { ConfirmParam } from './components/ConfirmDialog';
import Spinner from './components/Spinner';
import IframeScriptField from './components/IframeScriptField';
import { marked } from 'marked';

const explain = `
Misskeyのタイムラインをブログ等に埋め込むためのスクリプトを生成します。
- 投稿を最新20件まで表示します。
- 以下は非対応です。
  - 絵文字
  - Renote

 以下を入力して「検索」ボタンを押下してください。
`
const explainHtml = marked.parse(explain);
const copyright = marked.parse(process.env.REACT_APP_COPYRIGHT_MARKDOWN ?? '');

function App() {
    const [ searchParams ] = useSearchParams();
    const [ condition, setCondition ] = useState<Condition|undefined>();
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

    return (
        <div className={`${app} ${myTheme}`}>
            {showCondition &&
                <>
                    <h1 className={titleStyle}>{process.env.REACT_APP_TITLE ?? ''}</h1>
                    <p className={explainParagraphStyle} dangerouslySetInnerHTML={{__html: explainHtml}} />
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
            {showCondition &&
                <div className={footerStyle}>
                    <span dangerouslySetInnerHTML={{__html: copyright}} />
                    {process.env.REACT_APP_GITHUB_URL &&
                        <span className={gitHubLogStyle}>
                            <a href={process.env.REACT_APP_GITHUB_URL} target='_blank' rel='noreferrer'>
                                <img src="./github-mark-white.svg" className={gitHubLogStyle} alt="git hub" />
                            </a>
                        </span>
                    }
                </div>
            }
            <ConfirmDialog show={confirm!==undefined} {...confirm} onClose={onConfirmClose} />
        </div>
    );
}

export default App;
