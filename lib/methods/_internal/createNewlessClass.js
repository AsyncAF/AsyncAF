import nameFn from './nameFunction';

/* eslint-disable no-param-reassign */
const createNewlessClass = Class => {
  const Temp = Class;
  const {name} = Class;
  Class = function (...args) {
    return new Temp(...args);
  };
  Class.prototype = Temp.prototype;
  Object.setPrototypeOf(Class, Temp);
  Class.prototype.constructor = Class;
  return nameFn(Class, name);
};

export default createNewlessClass;
