import { useCallback, useRef, useState } from 'react';
import { GetTimelineResult } from '../types/api-types';
import PostCard from './PostCard';
import { authorArea, authorName, container, icon, innerContainer, postsArea } from './TimelineList.css';
import { useMounted } from '../util/useMounted';

type Props = {
    data: GetTimelineResult;
}
export type PostAreaRectInfo = {
    scrollY: number;
    top: number;
    height: number;
}
export default function TimelineList(props: Props) {
    const postAreaRef = useRef<HTMLDivElement>(null);
    const [postAreaRectInfo, setPostAreaRectInfo] = useState<PostAreaRectInfo>({scrollY: 0, top: 0, height: 0});

    useMounted(() => {
        handleScroll();
    })
    const handleScroll = useCallback(() => {
        if (!postAreaRef.current) return;
        const scrollY = postAreaRef.current.scrollTop;
        const top = postAreaRef.current.getBoundingClientRect().top;
        const height = postAreaRef.current.getBoundingClientRect().height;
        setPostAreaRectInfo({
            scrollY,
            top,
            height,
        });
    }, []);

    return (
        <>
            <div className={container}>
                <div className={innerContainer}>
                    <div className={authorArea}>
                        <img src={props.data.author.icon} className={icon} alt="icon" />
                        <a href={props.data.author.link} className={authorName}>{props.data.author.name}</a> のつぶやき
                    </div>
                    <div className={postsArea} ref={postAreaRef} onScroll={handleScroll}>
                        {props.data.posts.map((post) => {
                            return (
                                <PostCard key={post.id} post={post} parentAreaRectInfo={postAreaRectInfo} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}