import name from './lib/methods/_internal/nameFunction';

/* eslint-disable import/first */
const libName = 'async-af';
const libPath = './lib/';

const makeScoped = name => `@${libName}/${name.replace(/(AsyncAf|AF)/g, '').toLowerCase()}`;

/* ____________________________
  |           CLASSES          |
  |____________________________| */

const classPath = `${libPath}classes/`;

const classes = [
  [{name: 'AsyncAF'}, `${classPath}AsyncAF`, libName],
  [{name: 'AsyncAfWrapper'}, `${classPath}AsyncAfWrapper`, makeScoped('AsyncAfWrapper')],
];

/* ____________________________
  |       STATIC METHODS       |
  |____________________________| */

import logAF from './lib/methods/other/logAF';

const staticMethods = [
  name(logAF, 'logAF'),
].map(method => [
  method,
  `${libPath}methods/other/${method.name}`,
  makeScoped(method.name),
]);

/* ____________________________
  |      PROTOTYPE METHODS     |
  |____________________________| */

// Arrays
import mapAF from './lib/methods/arrays/mapAF';
import forEachAF from './lib/methods/arrays/forEachAF';
import filterAF from './lib/methods/arrays/filterAF';
import reduceAF from './lib/methods/arrays/reduceAF';
import everyAF from './lib/methods/arrays/everyAF';
import someAF from './lib/methods/arrays/someAF';
import includesAF from './lib/methods/arrays/includesAF';
import findAF from './lib/methods/arrays/findAF';
import findIndexAF from './lib/methods/arrays/findIndexAF';
import indexOfAF from './lib/methods/arrays/indexOfAF';
import lastIndexOfAF from './lib/methods/arrays/lastIndexOfAF';
import joinAF from './lib/methods/arrays/joinAF';
import concatAF from './lib/methods/arrays/concatAF';

const arrayMethods = [
  name(mapAF, 'mapAF'),
  name(forEachAF, 'forEachAF'),
  name(filterAF, 'filterAF'),
  name(reduceAF, 'reduceAF'),
  name(everyAF, 'everyAF'),
  name(someAF, 'someAF'),
  name(includesAF, 'includesAF'),
  name(findAF, 'findAF'),
  name(findIndexAF, 'findIndexAF'),
  name(indexOfAF, 'indexOfAF'),
  name(lastIndexOfAF, 'lastIndexOfAF'),
  name(joinAF, 'joinAF'),
  name(concatAF, 'concatAF'),
].map(method => [
  method,
  `${libPath}methods/arrays/${method.name}`,
  makeScoped(method.name),
]);

// strings
import splitAF from './lib/methods/strings/splitAF';

const stringMethods = [
  name(includesAF, 'includesAF'),
  name(indexOfAF, 'indexOfAF'),
  name(lastIndexOfAF, 'lastIndexOfAF'),
  name(splitAF, 'splitAF'),
  name(concatAF, 'concatAF'),
].map(method => [
  method,
  `${libPath}methods/strings/${method.name}`,
  makeScoped(method.name),
]);

const prototypeMethods = [
  ...arrayMethods,
  ...stringMethods,
];

/* ____________________________
  |         COLLECTIONS        |
  |____________________________| */

// import arrays from './lib/collections/arrays';

const collections = [
  // arrays,
];

export default [
  ...classes,
  ...staticMethods,
  ...prototypeMethods,
  ...collections,
];

const pluckMethods = packages => packages.map(([method]) => method);

const staticMethodsOnly = pluckMethods(staticMethods);
const prototypeMethodsOnly = pluckMethods(prototypeMethods);

export {
  staticMethodsOnly as staticMethods,
  prototypeMethodsOnly as prototypeMethods,
  makeScoped,
};
