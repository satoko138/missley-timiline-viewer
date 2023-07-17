export type Post = {
    id: string;
    title: string;
    publish_date: string;
}
export type GetTimelineParam = {
    server: string;
    account: string;
}

export type GetTimelineResult = {
    posts: Post[];
}
