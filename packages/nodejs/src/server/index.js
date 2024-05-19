"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http = __importStar(require("http"));
const ws_1 = require("ws");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    /** add other headers too */
};
const matchRouter = (req, res) => {
    if (!req.url) {
        res.writeHead(302, { Location: `/static/index` }).end();
        return;
    }
    const _url = new url_1.URL(`http://localhost:8080${req.url}`);
    const [_, dir, fileName] = _url.pathname.split('/');
    console.log(dir, _url.pathname, _url.searchParams);
    switch (dir) {
        case 'static':
            (0, fs_1.readFile)(path_1.default.resolve(__dirname, '../bundle/index.html'), (err, data) => {
                if (err) {
                    throw err;
                }
                res.writeHead(200, headers);
                res.end(data);
            });
            break;
        case 'dist':
            (0, fs_1.readFile)(path_1.default.resolve(__dirname, '../dist/', path_1.default.basename(fileName)), (err, data) => {
                if (err) {
                    throw err;
                }
                if (path_1.default.extname(fileName) === '.js') {
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
};
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
    console.log('listening 8080');
});
server.on('connection', () => {
    console.log('connection');
});
exports.close = () => server.close();
const wss = new ws_1.WebSocketServer({ port: 3001 });
let _ws;
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
    ws.send('something');
    _ws = ws;
});
(0, fs_1.watch)(path_1.default.resolve(__dirname, '../dist'), (eventType, fileName) => {
    console.log(eventType, fileName);
    _ws === null || _ws === void 0 ? void 0 : _ws.send(JSON.stringify({
        changeFile: fileName
    }));
});
