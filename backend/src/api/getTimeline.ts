import { getLogger } from "log4js";
import { GetTimelineParam, GetTimelineResult, Post } from "../api-types";
import axios from 'axios';
import { XMLParser } from "fast-xml-parser";
import { RssObject } from './types';
import dayjs from 'dayjs';

const xp = new XMLParser();
const logger = getLogger();

export async function getTimeline(param: GetTimelineParam): Promise<GetTimelineResult> {
    const url = `https://${param.server}/@${param.account}.rss`;
    console.log('url', url);
    try {
        const res = await axios.get(url);
        const rssContents = res.data;
        console.log(rssContents);
        const jObj = xp.parse(rssContents) as RssObject;
        console.log(jObj.rss.channel);
        // console.log(jObj.channel.item);
   
        const posts = jObj.rss.channel.item.map((i): Post => {
            return {
                id: i.guid,
                link: i.link,
                content: i["content:encoded"],
                pub_date: dayjs(i.pubDate).format('YYYY-MM-DD hh:mm'),
            }
        });
        return {
            author: {
                name: jObj.rss.channel.title,
                description: jObj.rss.channel.description,
                icon: jObj.rss.channel.image.url,
                link: jObj.rss.channel.link,
            },
            posts,
        };
    
    } catch(e) {
        logger.warn(e);
        throw new Error('get rss failed');
    }
}