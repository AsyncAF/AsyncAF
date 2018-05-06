/* eslint-disable import/first */
const libName = 'async-af';
const libPath = './lib/';

/* ____________________________
  |           CLASSES          |
  |____________________________| */

import AsyncAfWrapper from './lib/classes/AsyncAfWrapper';

const classPath = `${libPath}classes/`;

const classes = [
  [`${libName}`, `${classPath}AsyncAF`],
  [`@${libName}/wrapper`, `${classPath}AsyncAfWrapper`, AsyncAfWrapper],
];

/* ____________________________
  |         COLLECTIONS        |
  |____________________________| */

// import arrays from './lib/collections/arrays';

// const collectionPath = `${libPath}collections/`;

const collections = [
  // [`@${libName}/arrays`, `${collectionPath}arrays`],
];

/* ____________________________
  |       STATIC METHODS       |
  |____________________________| */

import logAF from './lib/methods/other/logAF';

const otherPath = `${libPath}methods/other/`;

const staticMethods = [
  [`@${libName}/log`, `${otherPath}logAF`, logAF],
];

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

const arrayPath = `${libPath}methods/arrays/`;

const prototypeMethods = [
  [`@${libName}/map`, `${arrayPath}mapAF`, mapAF],
  [`@${libName}/forEach`, `${arrayPath}forEachAF`, forEachAF],
  [`@${libName}/filter`, `${arrayPath}filterAF`, filterAF],
  [`@${libName}/reduce`, `${arrayPath}reduceAF`, reduceAF],
  [`@${libName}/every`, `${arrayPath}everyAF`, everyAF],
  [`@${libName}/some`, `${arrayPath}someAF`, someAF],
  [`@${libName}/includes`, `${arrayPath}includesAF`, includesAF],
];

export default [
  ...classes,
  ...collections,
  ...staticMethods,
  ...prototypeMethods,
];

/* eslint-disable-next-line no-unused-vars */
const pluckMethods = packages => packages.map(([pkg, file, method]) => method);

const staticMethodsOnly = pluckMethods(staticMethods);
const prototypeMethodsOnly = pluckMethods(prototypeMethods);

export {
  staticMethodsOnly as staticMethods,
  prototypeMethodsOnly as prototypeMethods,
};
