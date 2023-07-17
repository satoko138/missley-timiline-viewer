import React, { useRef, useCallback, useState } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import styles from './TimelineList.module.scss';
import Spinner from './Spinner';
import ConfirmDialog, { ConfirmParam } from './ConfirmDialog';
import { useWatch } from '../util/useWatch';
import { Condition } from '../types/common';
import { GetTimelineResult, Post } from '../types/api-types';

type Props = {
    condition?: Condition;
}
export default function MediaList(props: Props) {
    const loadingRef = useRef(false);
    const [ loading, setLoading ] = useState(false);
    const [ posts, setPosts ] = useState<Post[]>([]);

    const [ confirm, setConfirm ] = useState<ConfirmParam|undefined>();

    useWatch(() => {
        console.log('condition', props.condition);
        // 条件変更時は一覧リセットして検索
        setPosts([]);

        onLoad();
    }, [props.condition]);

    const onLoad = useCallback(async(cursor?: string) => {
        if (loadingRef.current) {
            // 二重ロード禁止
            console.log('二重ロード禁止')
            return;
        }
        console.log('load start');
        loadingRef.current = true;
        setLoading(true);

        const paramMap = {} as {[key: string]: string};
        if (cursor) {
            paramMap['cursor'] = cursor;
        }
        if (props.condition) {
            paramMap['keyword'] = props.condition.keyword;
        }
        const param = Object.entries(paramMap).map(entry => {
            return entry[0] + '=' + entry[1]
        }).join('&');
        const url = '/api/list' + (param.length > 0 ? `?${param}` : '');
        const res = await fetch(encodeURI(url));
        const result = await res.json() as GetTimelineResult;
        setPosts((state) => {
            return state.concat(result.posts);
        });

        setLoading(false);
        loadingRef.current = false;
    }, [props.condition]);

    const onConfirmClose = useCallback(() => {
        setConfirm(undefined);
    }, []);

    return (
        <div className={styles.Container}>
            <div className={styles.Container}>
                {loading &&
                    <div className={styles.SpinnerOverlay}>
                        <Spinner />
                    </div>
                }
                <div className={styles.TableArea}>
                    <table className={styles.Table}>
                        <thead>
                            <tr>
                                <th>
                                    配信日
                                </th>
                                <th className={styles.Title}>
                                    タイトル
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, index) => {
                                return (
                                    <tr key={post.id}>
                                        <td>
                                            {post.publish_date}
                                        </td>
                                        <td>
                                            {post.title}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmDialog show={confirm!==undefined} {...confirm} onClose={onConfirmClose} />
        </div>
    );
}