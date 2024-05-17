"use strict";
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
const path = require("path");
var server = http.createServer(function (req, res) {
    var urlItem = req.url;
    console.log(req.url, req.headers.host);
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    const content = fs.readFileSync(path.resolve(__dirname, '../template/index.html'), 'utf-8')
    res.end(content);
});
server.listen(8080, function () {
    console.log('listening 8080');
});
server.on('connection', function () {
    console.log('connection');
});
exports.close = function () { return server.close(); };
