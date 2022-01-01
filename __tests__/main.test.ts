import mmap from '../src';

const callbackFn = jest.fn();

test('Correctly maps array values in place', () => {
  const array: number[] = [1, 2, 3];
  const result = mmap(array, (v) => v * 2);
  expect(result).toEqual([2, 4, 6]);
  expect(result).toBe(array);
});

test('Callback function called with correct arguments', () => {
  const array = [1];
  mmap(array, callbackFn);
  expect(callbackFn).toBeCalledTimes(1);
  expect(callbackFn).toBeCalledWith(1, 0, array);
});

test('Passing context for callbackFn', () => {
  const ctx = { a: 2 };
  function cb(this: typeof ctx, n: number) {
    return n * (this?.a || 4);
  }
  const array = [1, 2, 3];

  expect(mmap(array, cb, ctx)).toEqual([2, 4, 6]);
});
