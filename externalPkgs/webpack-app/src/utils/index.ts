export const sumTwo = (a: number, b: number) => a + b;

setTimeout(() => {
  import('./asyncChunk').then(({ asyncFunction }) => {
    asyncFunction();
  });
}, 300);
