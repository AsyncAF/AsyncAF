import custom from './customFormat';

const setFormat = labelFormat => {
  const error = new Error();
  /* istanbul ignore if */
  if (!error.stack) return '';
  const [targetLine] = error.stack.split`\n`.filter(
    (_, i, lines) => /logAF(\s+|\s+\[.+\]\s+)\(/.test(lines[i ? i - 1 : i]),
  );
  const fullPath = targetLine.slice(targetLine.indexOf`/`).replace(')', '');
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
  };
  return formats[labelFormat]
    ? formats[labelFormat]()
    : custom(labelFormat, fullPath, formats.arrow());
};

export default setFormat;
