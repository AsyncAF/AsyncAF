import nameFn from './nameFunction';

const createNewlessClass = Class => {
  const {name} = Class;
  const Newless = function (...args) {
    return new Class(...args);
  };
  Newless.prototype = Class.prototype;
  Object.setPrototypeOf(Newless, Class);
  Newless.prototype.constructor = Newless;
  return nameFn(Newless, name);
};

export default createNewlessClass;
