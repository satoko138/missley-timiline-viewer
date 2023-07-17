import React, { useState, useMemo } from 'react';
import TimelineList from './components/TimelineList';
import ConditionForm from './components/ConditionForm';
import { Condition } from './types/common';
import { useSearchParams } from 'react-router-dom';
import { useMounted } from './util/useMounted';
import { app, conditionArea, timelineArea } from './App.css';
import { myTheme } from './styles/misskeyTheme.css';

function App() {
    const [ searchParams ] = useSearchParams();
    const [ condition, setCondition ] = useState<Condition|undefined>();
    const [ initialized, setInitialized ] = useState(false);

    useMounted(() => {
        const server = searchParams.get('server') ?? '';
        const account = searchParams.get('account') ?? '';
        setCondition({
            server,
            account,
        })
        setInitialized(true);
    });

    const showCondition = useMemo(() => {
        return searchParams.get('server') === null || searchParams.get('account') === null;
    }, [searchParams])

    if (!initialized) {
        // 初期化完了前にMediaListで全件取得が動いてしまうので、初期化完了を待つ
        return null;
    }

    return (
        <div className={`${app} ${myTheme}`}>
            {showCondition &&
                <div className={conditionArea}>
                    <ConditionForm onChange={(condition) => setCondition(condition)} />
                </div>
            }
            <div className={timelineArea}>
                <TimelineList condition={condition} />
            </div>
        </div>
    );
}

export default App;
