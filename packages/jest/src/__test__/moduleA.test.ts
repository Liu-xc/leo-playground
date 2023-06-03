import { describe, test } from '@jest/globals'
import { CalcModule } from '../moduleA';

describe('test moduleA', () => {
  test('calc', () => {
    const calcModule = new CalcModule();
    expect(calcModule.sum(1, 2)).toBe(3);
  });
});