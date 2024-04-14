var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EventEmitter from "events";
import fs from 'fs';
import path from "path";
export class MyWritable extends EventEmitter {
    constructor(p, highWaterMark = 10) {
        super();
        this.p = p;
        this.highWaterMark = highWaterMark;
        this.queue = [];
        this.offset = 0;
        this.initing = null;
        this.isDraining = false;
        this.open = () => __awaiter(this, void 0, void 0, function* () {
            if (this.initing) {
                return this.initing;
            }
            this.initing = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.makeAccessibility();
                const fileHandler = yield fs.promises.open(this.p, 'w');
                this.fileHandler = fileHandler;
                this.drain();
                resolve();
            }));
            return this, this.initing;
        });
        this.p = path.resolve(__dirname, this.p);
    }
    makeAccessibility() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO 校验文件是否存在
        });
    }
    close() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.fileHandler) === null || _a === void 0 ? void 0 : _a.close());
            this.emit('close');
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.splitData(data);
            if (!this.fileHandler) {
                yield this.open();
            }
            // this.dataToWrite.write(data.toString());
            // if (this.dataToWrite.byteLength > this.highWaterMark) {
            //   this.emit('needDrain');
            // }
            if (!this.fileHandler) {
                return false;
            }
            yield this.drain();
            return true;
        });
    }
    drain() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.fileHandler || this.isDraining) {
                return;
            }
            this.isDraining = true;
            while (this.queue.length) {
                const _d = this.queue.shift();
                if (!_d || !_d.byteLength) {
                    continue;
                }
                const { buffer, bytesWritten } = yield this.fileHandler.write(_d.toString(), this.offset, 'utf8');
                this.offset += bytesWritten;
            }
            this.isDraining = false;
            this.emit('drain');
        });
    }
    splitData(data) {
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
