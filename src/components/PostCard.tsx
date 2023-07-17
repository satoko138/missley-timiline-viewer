import React from 'react';
import { Post } from '../types/api-types';
import { card, pubDate } from './PostCard.css';

type Props = {
    post: Post;
}

export default function PostCard(props: Props) {
    return (
        <div className={card}>
            <div className={pubDate}>{props.post.pub_date}</div>
            <div>{props.post.content}</div>
        </div>
    );
}