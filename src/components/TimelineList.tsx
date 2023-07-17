import { GetTimelineResult } from '../types/api-types';
import PostCard from './PostCard';
import { authorArea, authorName, container, icon, innerContainer, postsArea } from './TimelineList.css';

type Props = {
    data: GetTimelineResult;
}
export default function TimelineList(props: Props) {
    return (
        <>
            <div className={container}>
                <div className={innerContainer}>
                    <div className={authorArea}>
                        <img src={props.data.author.icon} className={icon} alt="icon" />
                        <a href={props.data.author.link} className={authorName}>{props.data.author.name}</a> のつぶやき
                    </div>
                    <div className={postsArea}>
                        {props.data.posts.map((post) => {
                            return (
                                <PostCard key={post.id} post={post} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}