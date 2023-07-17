import { GetTimelineParam, GetTimelineResult } from "../api-types";

export async function getTimeline(param: GetTimelineParam): Promise<GetTimelineResult> {
    return {
        posts: []
    };
}