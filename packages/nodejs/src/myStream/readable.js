"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyReadable = void 0;
const events_1 = __importDefault(require("events"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class MyReadable extends events_1.default {
    constructor(p, highWaterMark = 10) {
        super();
        this.p = p;
        this.highWaterMark = highWaterMark;
        this.offset = 0;
        this.isPause = false;
        this.isEnded = false;
        this.p = path_1.default.resolve(__dirname, p);
        this.on('newListener', (event) => {
            if (event === 'readable') {
                this.read();
            }
            else if (event === 'data') {
                this.keepRead();
            }
        });
    }
    _read() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.fileHandler) {
                yield this.open();
            }
            if (!this.fileHandler) {
                return false;
            }
            if (this.isPause || this.isEnded) {
                return false;
            }
            const buf = Buffer.alloc(this.highWaterMark);
            const { buffer, bytesRead } = yield this.fileHandler.read(buf, 0, this.highWaterMark, this.offset);
            if (!bytesRead) {
                this.isEnded = true;
                this.emit('end');
                yield this.close();
                return false;
            }
            let _buf = buffer;
            if (bytesRead < this.highWaterMark) {
                _buf = buffer.subarray(0, bytesRead);
            }
            this.offset += bytesRead;
            this.emit('data', _buf);
            return true;
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            this._read();
        });
    }
    keepRead() {
        return __awaiter(this, void 0, void 0, function* () {
            let flag = true;
            while (flag) {
                flag = yield this._read();
            }
        });
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
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            const fileHandler = yield fs_1.default.promises.open(this.p, 'r');
            this.fileHandler = fileHandler;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.fileHandler) === null || _a === void 0 ? void 0 : _a.close());
            this.emit('close');
        });
    }
}
exports.MyReadable = MyReadable;
