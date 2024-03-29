type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends ReadonlyArray<(infer ElementType)> ? ElementType : never;

type ArrayCallback<TItem = unknown, TReturn = unknown> =
  (item: TItem, index: number, arr: TItem[]) => TReturn;

/**
 * Maps each item of the array to a new value in place
 *
 * @param array Array to map over
 * @param callbackFn Function that will be called on each item of the provided array
 * @param thisArg Optional `this` value for `callbackFn`
 *
 * @returns Same array with mapped items
 */
function mmap<TArray extends unknown[], TOutput extends unknown[] = TArray, TContext = null>(
  array: TArray,
  callbackFn: ArrayCallback<ArrayElement<TArray>, ArrayElement<TOutput>>,
  thisArg?: TContext,
): TOutput {
  for (let i = 0; i < array.length; i += 1) {
    array[i] = callbackFn.call(
      thisArg,
      array[i] as ArrayElement<TArray>,
      i,
      array as Array<ArrayElement<TArray>>,
    );
  }
  return array as unknown as TOutput;
}

export default mmap;
