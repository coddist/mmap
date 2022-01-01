# MMAP

Nothing fancy and complicated, just a mutable map function that maps array items in place.

## Usage

Install:

```
# with Yarn
yarn add @coddist/mmap

# with NPM
npm install @coddist/mmap

```

Enjoy:

```js
import mmap from '@coddist/mmap';

const array = [1.324, 34.1234, 42.346828];
const result = mmap(array, Math.floor); // [1, 34, 42]
result === array; // true
```

## Motivation

Works tiny bit faster than native `Array.prototype.map` due to the fact it maps in place without creating new instances. And well, sometimes that's just what we need.

## API

Mutates array provided as the first argument, modifying each item to the result of calling function, the second argument, on this item.

| **Parameter** | **Type**   | **Default value** | **Notes**                                 |
| ------------- | ---------- | ----------------- | ----------------------------------------- |
| `array`       | `any[]`    |                   |                                           |
| `callbackFn`  | `function` |                   |                                           |
| `thisArg`     | `object`   | `null`            | Optional `this` argument for `callbackFn` |

```js
mmap(array, cb, cbCtx);
```

`CallbackFn` is called passing following arguments:

- `item`: the current element of the array
- `index`: the index of the `item`
- `array`: actual array `mmap` is called upon

### Return value

Returns the same array `mmap` was called upon

## TypeScript usage

By default, TypeScript will expect return value of provided function to be of the same time as array element. This will fail:

```ts
const array = [1, 2, 3];
const cb = (n) => String(n);

mmap(array, cb); // TS Error: Type 'string' is not assignable to type 'number'
```

Generally, it's not advised to use this function with callbacks returning different type, but if you 100% know what you're doing you can provide input and output generic types like so:

```ts
const array = [1, 2, 3];
const cb = (n) => String(n);

const result = mmap<number[], string[]>(array, cb);
/**
 * Same as doing:
 * `const result = array as unknown as string[]`
 */
```

**NOTE** that TS will still treat `array` as `number[]` which it no longer will be, so using native `map` method would be wiser in this case.
