import EventEmitter from "events";
import fs from 'fs';
import { FileHandle } from "fs/promises";
import path from "path";

export class MyWritable extends EventEmitter {
  private fileHandler?: FileHandle;
  private queue: Array<Buffer> = [];
  private offset = 0;
  private initing: Promise<void> | null = null;
  private isDraining = false;

  constructor(
    private p: string,
    private highWaterMark = 10
  ) {
    super();

    this.p = path.resolve(__dirname, this.p);
  }

  private async makeAccessibility() {
    // TODO 校验文件是否存在
  }

  private open = async () => {
    if (this.initing) {
      return this.initing;
    }

    this.initing = new Promise(async (resolve, reject) => {
      await this.makeAccessibility();
      const fileHandler = await fs.promises.open(this.p, 'w');
      this.fileHandler = fileHandler;
      this.drain();
      resolve();
    });

    return this, this.initing;
  }

  async close() {
    await this.fileHandler?.close();
    this.emit('close');
  }

  async write(data: Buffer) {
    this.splitData(data);

    if (!this.fileHandler) {
      await this.open();
    }

    // this.dataToWrite.write(data.toString());

    // if (this.dataToWrite.byteLength > this.highWaterMark) {
    //   this.emit('needDrain');
    // }

    if (!this.fileHandler) {
      return false;
    }

    await this.drain()

    return true;
  }

  private async drain() {
    if (!this.fileHandler || this.isDraining) {
      return;
    }

    this.isDraining = true;

    while (this.queue.length) {
      const _d = this.queue.shift();

      if (!_d || !_d.byteLength) {
        continue;
      }

      const { buffer, bytesWritten } = await this.fileHandler.write(_d.toString(), this.offset, 'utf8');
      this.offset += bytesWritten;
    }

    this.isDraining = false;
    this.emit('drain');
  }

  private splitData(data: Buffer) {
    for (let i = 0; i < data.byteLength;) {
      let end = i + this.highWaterMark > data.length ? data.length : i + this.highWaterMark;

      const _d = data.subarray(i, end);

      this.queue.push(_d);
      // console.log('splitData', _d)
      i += this.highWaterMark;
    }

    if (this.queue.length > 1) {
      this.emit('needDrain');
    }
  }
}
