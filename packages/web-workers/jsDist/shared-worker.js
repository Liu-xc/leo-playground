"use strict";
self.onconnect = (msg) => {
    const [port] = msg.ports;
    console.log('connected');
    port.onmessage = (ev) => {
        console.log(ev);
        port.postMessage('hello, i am sharedWorker');
    };
};
