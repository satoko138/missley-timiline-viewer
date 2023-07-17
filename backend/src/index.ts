import express from 'express';
import { configure, getLogger } from 'log4js';
import { LogSetting } from './config';
import { GetTimelineParam } from './api-types';
import { getTimeline } from './api/getTimeline';

configure(LogSetting);
const logger = getLogger();

const app = express();

// フロントエンド資源
// 本番では./htdocs、開発環境では../buildを参照する
const static_path = process.env.NODE_ENV === 'dev' ? '../build' : './htdocs';
logger.info('static path', static_path);
app.use(express.static(static_path));

/**
 * Timeline一覧を取得
 */
app.get('/api/list', async(req, res) => {
    try {
        const param = req.query as GetTimelineParam;
        logger.info('[start] api/list', param);
        const result = await getTimeline(param);
        // logger.debug('result', result);
        res.send(result);

    } catch(e) {
        logger.warn('list error', e);
        res.status(500).send(e);

    } finally {
        logger.info('[end] api/list')
    }
})

app.listen(80, () => {
    logger.info('start express server');
});
