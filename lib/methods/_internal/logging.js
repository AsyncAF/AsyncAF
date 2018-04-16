/* eslint-disable no-console */
const wrappedLog = (...args) => {
  console && console.log && console.log(...args);
};

const wrappedWarn = (...args) => {
  console && console.warn && console.warn(...args);
};

export {wrappedLog, wrappedWarn};
