import { GetOgpResult } from "../api-types";
import ogpParser from 'ogp-parser';

export async function getOgp(url: string): Promise<GetOgpResult> {
    const metadata = await ogpParser(url);
    const ogp = metadata.ogp as Ogp;
    return {
        title: metadata.title ?? '',
        description: ogp["og:description"] ?? '',
        image: ogp["og:image"],
    }
}

type Ogp = {
    'og:description'?: string;
    'og:image'?: string;
}