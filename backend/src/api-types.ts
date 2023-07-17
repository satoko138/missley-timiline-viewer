export type Post = {
    id: string;
    link: string;
    content: string;
    pub_date: string;
}
export type Author = {
    name: string;
    link: string;
    description: string;
    icon: string;
}
export type GetTimelineParam = {
    server: string;
    account: string;
}

export type GetTimelineResult = {
    author: Author;
    posts: Post[];
}
