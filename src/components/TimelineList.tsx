import React, { useRef, useCallback, useState } from 'react';
import styles from './TimelineList.module.scss';
import Spinner from './Spinner';
import ConfirmDialog, { ConfirmParam } from './ConfirmDialog';
import { useWatch } from '../util/useWatch';
import { Condition } from '../types/common';
import { Author, GetTimelineResult, Post } from '../types/api-types';
import PostCard from './PostCard';
import { authorArea, authorName, container, icon, postsArea } from './TimelineList.css';

type Props = {
    condition?: Condition;
}
export default function MediaList(props: Props) {
    const loadingRef = useRef(false);
    const [ loading, setLoading ] = useState(false);
    const [ posts, setPosts ] = useState<Post[]>([]);
    const [ author, setAuthor] = useState<Author|undefined>();

    const [ confirm, setConfirm ] = useState<ConfirmParam|undefined>();

    useWatch(() => {
        console.log('condition', props.condition);
        // 条件変更時は一覧リセットして検索
        setPosts([]);

        onLoad();
    }, [props.condition]);

    const onLoad = useCallback(async() => {
        if (!props.condition) {
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
        setPosts([]);
        setAuthor(undefined);

        try {
            const param = Object.entries(props.condition).map(entry => {
                return entry[0] + '=' + entry[1]
            }).join('&');
            const url = '/api/list' + (param.length > 0 ? `?${param}` : '');
            const res = await fetch(encodeURI(url));
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const result = await res.json() as GetTimelineResult;
            setPosts(result.posts);
            setAuthor(result.author);
    
        } catch(e) {
            console.warn(e);

        } finally {
            setLoading(false);
            loadingRef.current = false;
        }

    }, [props.condition]);

    const onConfirmClose = useCallback(() => {
        setConfirm(undefined);
    }, []);

    return (
        <>
            <div className={container}>
                {loading ?
                    <div className={styles.SpinnerOverlay}>
                        <Spinner />
                    </div>
                    :
                    <>
                        <div className={authorArea}>
                            <img src={author?.icon} className={icon} />
                            <a href={author?.link} className={authorName}>{author?.name}</a> のつぶやき
                        </div>
                        <div className={postsArea}>
                            {posts.map((post) => {
                                return (
                                    <PostCard key={post.id} post={post} />
                                )
                            })}
                        </div>
                    </>
                }
            </div>
            <ConfirmDialog show={confirm!==undefined} {...confirm} onClose={onConfirmClose} />
        </>
    );
}