const custom = (format, fullPath, arrow) => {
  if (typeof format === 'string') return format;
  let [path, line, col] = fullPath.split`:`; // eslint-disable-line prefer-const
  path = path.split`/`;
  const file = path.pop();
  path = path.join`/`;
  const parent = `${path.split`/`.pop()}/`;
  path += '/';
  return format({
    path,
    line,
    col,
    file,
    parent,
    arrow,
  });
};

export default custom;
