export const sumTwo = (a: number, b: number) => a + b;

setTimeout(() => {
  import(/* webpackPreload: true, webpackChunkName: "asyncChunk" */ './asyncChunk').then(({ asyncFunction }) => {
    asyncFunction();
  });
  import(/* webpackPreload: true, webpackChunkName: "dynamicChunk" */'./dynamicChunk').then(({ dynamicFunction }) => {
    dynamicFunction()
  });
}, 3000);
