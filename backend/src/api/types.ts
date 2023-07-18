export type RssObject = {
    rss: {
        channel: {
            title: string;
            link: string;
            description: string;
            image: {
                title: string;
                url: string;
            };
            generator: 'Misskey';
            copyright: string;
            item: {
                guid: string;
                link: string;
                pubDate: string;
                'content:encoded': string;
                enclosure?: {
                    '@_url': string;
                    '@_type': string;
                }
            }[];
        }
    
    }
}