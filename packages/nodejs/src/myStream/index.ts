import { MyReadable } from "./readable";
import { MyWritable } from "./writable";

const myReadable = new MyReadable('../template/index.html', 3);
const myWritable = new MyWritable('../bundle/index.html', 3);

myWritable.on('needDrain', () => {
  console.log('need drain');
  myReadable.pause();
});

myWritable.on('drain', () => {
  console.log('drain');
  myReadable.resume();
});


myReadable.on('data', (data) => {
  console.log('read data', data.toString())
  myWritable.write(data);
});

myReadable.on('end', () => {
  console.log('readable close')
})