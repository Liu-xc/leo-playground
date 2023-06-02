import { get, set } from 'lodash-es';

export class SomeModule {
  static getInstance() {
    return new SomeModule();
  }

  constructor() {
    if (window.someModule) {
      return window.someModule;
    }

    window.someModule = this;
  }

  storeResult(key: string, value: number) {
    set(window, `results.${key}`, value);
  }

  getStoredResult(key: string) {
    return get(window, `results.${key}`);
  }
}