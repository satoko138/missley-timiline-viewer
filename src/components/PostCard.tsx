import React, { useMemo } from 'react';
import { Post } from '../types/api-types';
import { card, pubDate } from './PostCard.css';
import reactStringReplace from "react-string-replace";
import { HiOutlineExternalLink } from 'react-icons/hi';
import OgpCard from './OgpCard';

type Props = {
    post: Post;
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
        console.log('match', match);
        if (!match) return null;
        return match[0];
    }, [props.post.content]);

    return (
        <div className={card}>
            <div className={pubDate}>{props.post.pub_date}</div>
            <div>{content}</div>
            {embedUrl && 
                <OgpCard url={embedUrl} />
            }
        </div>
    );
}