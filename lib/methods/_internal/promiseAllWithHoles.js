const promiseAllWithHoles = promises => new Promise((resolve, reject) => {
  const result = Array(promises.length);
  let [pending, i] = Array(2).fill(promises.length);
  if (!promises.length) return resolve(result);
  const settlePromise = i => Promise.resolve(promises[i]).then(value => {
    if (i in promises) result[i] = value;
    if (!--pending) resolve(result);
  }, reject);
  while (i--) settlePromise(i);
});

export default promiseAllWithHoles;
