"use strict";
self.onmessage = (msg) => {
    console.log(msg);
    self.postMessage('hello, i am worker');
};
