"use strict";
exports.__esModule = true;
var http = require("http");
var server = http.createServer(function (req, res) {
    var urlItem = req.url;
    console.log(req.url, req.headers.host);
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>杨璐铭是猪！</h1>');
});
server.listen(8080, function () {
    console.log('listening 8080');
});
server.on('connection', function () {
    console.log('connection');
});
exports.close = function () { return server.close(); };
