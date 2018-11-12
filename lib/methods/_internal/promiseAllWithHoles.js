const promiseAllWithHoles = promises => new Promise((resolve, reject) => {
  const length = promises.length >>> 0;
  const result = Array(length);
  let pending = length;
  let i = length;
  if (!length) return resolve(result);
  const settlePromise = i => Promise.resolve(promises[i]).then(value => {
    if (i in promises) result[i] = value;
    if (!--pending) resolve(result);
  }, reject);
  while (i--) settlePromise(i);
});

export default promiseAllWithHoles;
