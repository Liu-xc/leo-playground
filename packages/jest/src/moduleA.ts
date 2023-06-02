import { SomeModule } from "./moduleB";

export class CalcModule {
  private cache: SomeModule;

  constructor() {
    this.cache = SomeModule.getInstance();
  }

  sum = (a: number, b: number) => {
    const key = `${a}+${b}`;
    const cacheRes = this.cache.getStoredResult(key);
    if (cacheRes !== undefined) {
      return cacheRes;
    }

    const res = a + b;
    this.cache.storeResult(key, res);

    return res;
  }
}

