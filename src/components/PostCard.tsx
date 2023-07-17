import React, { useMemo, useRef, useState } from 'react';
import { Post } from '../types/api-types';
import { card, pubDate } from './PostCard.css';
import reactStringReplace from "react-string-replace";
import { HiOutlineExternalLink } from 'react-icons/hi';
import OgpCard from './OgpCard';
import { useWatch } from '../util/useWatch';
import { PostAreaRectInfo } from './TimelineList';

type Props = {
    post: Post;
    parentAreaRectInfo: PostAreaRectInfo;
}

const regExp = /(https?:\/\/\S+)/g;
export default function PostCard(props: Props) {
    const content = useMemo(() => {
        // URL文字列をリンクに変更
        let i = 0;
        return reactStringReplace(props.post.content, regExp, (match) => {
            return (
                <a href={match} rel="noopener noreferrer" key={'a-' + i++} target="_blank">
                    {match}
                    <HiOutlineExternalLink />
                </a>
            );
        }
        );
    }, [props.post.content]);

    const embedUrl = useMemo(() => {
        const match = props.post.content.match(regExp);
        if (!match) return null;
        return match[0];
    }, [props.post.content]);

    // 表示領域に入ったらOgp表示
    const myRef = useRef<HTMLDivElement>(null);
    const [showEmbed, setShowEmbed] = useState(false);
    useWatch(() => {
        if (!embedUrl) return;
        if (!myRef.current) return;
        if (showEmbed) return;
        const top = myRef.current.getBoundingClientRect().top;
        const isShow = top < props.parentAreaRectInfo.height;
        setShowEmbed(isShow);
    }, [embedUrl, props.parentAreaRectInfo]);

    return (
        <div className={card} ref={myRef}>
            <div className={pubDate}>{props.post.pub_date}</div>
            <div>{content}</div>
            {(showEmbed && embedUrl) && 
                <OgpCard url={embedUrl} />
            }
        </div>
    );
}