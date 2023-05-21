console.log('service: hello world');
chrome.runtime.onMessage.addListener((msg) => {
  console.log('i received message: ', msg)
})