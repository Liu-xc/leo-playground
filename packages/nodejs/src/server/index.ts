import { readFile, readFileSync, watch } from 'fs';
import * as http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { URL } from 'url';
import { hostname } from 'os';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000, // 30 days
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  /** add other headers too */
}

const matchRouter = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
  if (!req.url) {
    res.writeHead(302, { Location: `/static/index` }).end();
    return;
  }

  const _url = new URL(`http://localhost:8080${req.url}`);
  const [_, dir, fileName] = _url.pathname.split('/');
  console.log(dir, _url.pathname, _url.searchParams)

  switch (dir) {
    case 'static':
      readFile(path.resolve(__dirname, '../bundle/index.html'), (err, data) => {
        if (err) {
          throw err;
        }

        res.writeHead(200, headers);
        res.end(data);
      });
      break;
    case 'dist':
      readFile(path.resolve(__dirname, '../dist/', path.basename(fileName)), (err, data) => {
        if (err) {
          throw err;
        }

        if (path.extname(fileName) === '.js') {
          res.setHeader('Content-Type', 'application/javascript');
        }

        res.writeHead(200, headers);
        res.end(data);
      });
      break;
    default:
      res.writeHead(302, { Location: `/static/index` }).end();
      break;
  }

}



const server = http.createServer((req, res) => {
  console.log('request', req.url, req.method);
  if (req.method === 'OPTIONS') {
    // 处理预检请求
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.writeHead(200);
    res.end();
  }

  matchRouter(req, res);
});

server.listen(8080, () => {
  console.log('listening 8080')
});

server.on('connection', () => {
  console.log('connection');
});

exports.close = () => server.close();

const wss = new WebSocketServer({ port: 3001 });
let _ws: WebSocket;
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
  _ws = ws;
});

watch(path.resolve(__dirname, '../dist'), (eventType, fileName) => {
  console.log(eventType, fileName);
  _ws?.send(JSON.stringify({
    changeFile: fileName
  }));
});