a = Promise.resolve(() => {
  console.log(1);
})
  .finally()
  .then(() => {
    console.log(a);
  });
b = new Promise((resolve) => resolve(2)).then();
console.log(a, b);
