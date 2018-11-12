import promiseAllWithHoles from './promiseAllWithHoles';

const serial = arr => (function resolveSerially(resolved, i) {
  const {length} = resolved;
  if (!length) return Promise.resolve(resolved);
  const hole = !(i in arr);
  return Promise.resolve(arr[i]).then(el => {
    if (!hole) resolved[i] = el;
    if (i === length - 1) return resolved;
    return resolveSerially(resolved, i + 1);
  });
}(Array(arr.length >>> 0), 0));

const parallel = (arr, mapper, thisArg = undefined) => promiseAllWithHoles(arr, el => el)
  .then(!mapper ? undefined : arr => promiseAllWithHoles(
    Array.prototype.map.call(arr, mapper, thisArg),
  ));

export {
  serial,
  parallel,
};
