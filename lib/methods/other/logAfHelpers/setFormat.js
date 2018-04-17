import logAF from '../logAF';

const setFormat = function setFormat() {
  const error = new Error();
  /* istanbul ignore if */
  if (!error.stack) return '';
  const [targetLine] = error.stack.split`\n`.filter(
    (_, i, lines) => lines[i ? i - 1 : i].includes`logAF (`,
  );
  const fullPath = targetLine.slice(
    targetLine.indexOf`(` + 1,
    targetLine.indexOf`)`,
  );
  const target = fullPath.lastIndexOf`/`;
  const formats = {
    file() {
      return `@${fullPath.slice(target + 1)}:\n`;
    },
    path() {
      return `@${fullPath}:\n`;
    },
    parent() {
      const start = fullPath.slice(0, target).lastIndexOf`/` + 1;
      return `@${fullPath.slice(start)}:\n`;
    },
    arrow() {
      return '========================>';
    },
    custom(format) { /* eslint-disable no-unused-vars, prefer-const, no-eval */
      let [path, line, col] = fullPath.split`:`;
      path = path.split`/`;
      const file = path.pop();
      path = path.join`/`;
      const parent = `${path.split`/`.pop()}/`;
      path += '/';
      const arrow = formats.arrow();
      return eval(format.toString());
    }, /* eslint-enable */
  };
  if (logAF.labelFormat === 'custom') {
    const format = logAF.fullFormat;
    return formats.custom(format.slice(format.indexOf`=` + 1));
  }
  return formats[logAF.labelFormat]();
};

export default setFormat;
