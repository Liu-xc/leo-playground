
onconnect = (msg: MessageEvent) => {
  const [port] = msg.ports;
  console.log('connected');

  port.onmessage = (ev) => {
    console.log(ev);
    port.postMessage('hello, i am sharedWorker');
  }
}