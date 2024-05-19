import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import Router from '@koa/router';

const WEB_PAGE_PATH = path.resolve(__dirname, '../../../cloud-web-page/dist');


const app = new Koa();
const router = new Router();

app.use(serve(path.resolve(WEB_PAGE_PATH, './')));
app.use(router.routes());

app.listen(8080);