"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readable_1 = require("./readable");
const writable_1 = require("./writable");
const myReadable = new readable_1.MyReadable('../template/index.html', 3);
const myWritable = new writable_1.MyWritable('../bundle/index.html', 3);
myWritable.on('needDrain', () => {
    console.log('need drain');
    myReadable.pause();
});
myWritable.on('drain', () => {
    console.log('drain');
    myReadable.resume();
});
myReadable.on('data', (data) => {
    console.log('read data', data.toString());
    myWritable.write(data);
});
myReadable.on('end', () => {
    console.log('readable close');
});
