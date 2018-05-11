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

const otherPath = `${libPath}methods/other/`;

const staticMethods = [
  logAF,
].map(method => [
  method,
  `${otherPath + method.name}`,
  makeScoped(method.name),
]);

/* ____________________________
  |      PROTOTYPE METHODS     |
  |____________________________| */

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

const arrayPath = `${libPath}methods/arrays/`;

const arrayMethods = [
  mapAF,
  forEachAF,
  filterAF,
  reduceAF,
  everyAF,
  someAF,
  includesAF,
  findAF,
  findIndexAF,
  indexOfAF,
  lastIndexOfAF,
  joinAF,
].map(method => [
  method,
  `${arrayPath + method.name}`,
  makeScoped(method.name),
]);

const prototypeMethods = [
  ...arrayMethods,
];

/* ____________________________
  |         COLLECTIONS        |
  |____________________________| */

// import arrays from './lib/collections/arrays';

// const collectionPath = `${libPath}collections/`;

const collections = [
  // [`@${libName}/arrays`, `${collectionPath}arrays`],
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
