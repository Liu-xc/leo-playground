self.onmessage = (msg: MessageEvent) => {
  console.log(msg);
  self.postMessage('hello, i am worker');
}
