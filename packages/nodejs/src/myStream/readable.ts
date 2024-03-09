import EventEmitter from 'events';
import fs from 'fs';
import { FileHandle } from 'fs/promises';
import path from 'path';


export class MyReadable extends EventEmitter {
  private fileHandler?: FileHandle;
  private offset = 0;
  private isPause = false;
  private isEnded = false;

  constructor(
    private p: string,
    private highWaterMark: number = 10,
  ) {
    super();

    this.p = path.resolve(__dirname, p);
    this.on('newListener', (event) => {
      if (event === 'readable') {
        this.read();
      } else if (event === 'data') {
        this.keepRead();
      }
    })
  }

  private async _read() {
    if (!this.fileHandler) {
      await this.open();
    }

    if (!this.fileHandler) {
      return false;
    }

    if (this.isPause || this.isEnded) {
      return false;
    }

    const buf = Buffer.alloc(this.highWaterMark);
    const { buffer, bytesRead } = await this.fileHandler.read(buf, 0, this.highWaterMark, this.offset);

    if (!bytesRead) {
      this.isEnded = true;
      this.emit('end');
      await this.close();
      return false;
    }

    let _buf = buffer;
    if (bytesRead < this.highWaterMark) {
      _buf = buffer.subarray(0, bytesRead);
    }

    this.offset += bytesRead;
    this.emit('data', _buf);
    return true;
  }

  async read() {
    this._read();
  }

  private async keepRead() {
    let flag = true;

    while (flag) {
      flag = await this._read();
    }
  }

  pause() {
    if (this.isPause) {
      return;
    }

    this.isPause = true;

    this.emit('pause');
  }

  resume() {
    if (!this.isPause) {
      return;
    }

    this.isPause = false;
    this.keepRead();
  }

  private async open() {
    const fileHandler = await fs.promises.open(this.p, 'r');
    this.fileHandler = fileHandler;
  }

  private async close() {
    await this.fileHandler?.close();
    this.emit('close');
  }

}