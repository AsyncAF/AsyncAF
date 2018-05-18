import logAF from '../logAF';

/**
 * Sets logging options for {@link AsyncAF#logAF logAF}
 *
 * accepts an options object with the following optional properties:
 * - label (`Boolean`) - set to `false` to disable logging the location of calls to logAF
 * - duration (`Boolean`) - set to `false` to disable logging the time it takes (in secs) to complete each call to logAF
 * - labelFormat (`String`|`Function`) - alters the format of logAF labels; choose between `file` (*default*), `path`, `parent`, `arrow`, or a custom string or function
 *
 * ```js
 * const promise = new Promise(resolve => setTimeout(
 *   () => resolve(1), 1000)
 * );
 * ```
 * **default logging**
 * ```js
 * logAF(promise, 2);
 *
 * // @filename.js:24:1:
 * // 1 2
 * // in 0.998 secs
 * ```
 * **turn off label**
 * ```js
 * logAF.options({ label: false });
 * logAF(promise, 2);
 *
 * // 1 2
 * // in 0.999 secs
 * ```
 * **turn off duration**
 * ```js
 * logAF.options({ duration: false });
 * logAF(promise, 2);
 *
 * // @filename.js:24:1:
 * // 1 2
 * ```
 * **change labelFormat**
 *
 * &#9679; file (*default*)
 *
 * ```js
 * logAF.options({ labelFormat: 'file' });
 * logAF(promise, 2);
 *
 * // @filename.js:24:1:
 * // 1 2
 * // in 0.998 secs
 * ```
 * &#9679; path
 *
 * ```js
 * logAF.options({ labelFormat: 'path' });
 * logAF(promise, 2);
 *
 * // @/Path/to/current/directory/filename.js:24:1:
 * // 1 2
 * // in 0.997 secs
 * ```
 * &#9679; parent
 *
 * ```js
 * logAF.options({ labelFormat: 'parent' });
 * logAF(promise, 2);
 *
 * // @parentDirectory/filename.js:24:1:
 * // 1 2
 * // in 0.998 secs
 * ```
 * &#9679; arrow
 *
 * ```js
 * logAF.options({ labelFormat: 'arrow' });
 * logAF(promise, 2);
 *
 * // ========================> 1 2
 * // in 0.999 secs
 * ```
 *
 * &#9679; custom (create your own labelFormat)
 *  - to set a custom labelFormat, set it to any string other than the formats above
 *
 * ```js
 * logAF.options({
 *  labelFormat: 'I logged this:'
 * });
 * logAF(promise, 2);
 *
 * // I logged this: 1 2
 * // in 1.000 secs
 * ```
 *
 * - labelFormat also accepts a function with access to an object containing the location variables `file`, `path`, `parent`, `arrow`, `line`, and `col`
 *
 * e.g., to set the labelFormat to `file:line:col =>`:
 * ```js
 * logAF.options({
 *  labelFormat: ({file, line, col}) => `${file}:${line}:${col} =>`
 * });
 * logAF(promise, 2);
 *
 * // filename.js:24:1 => 1 2
 * // in 0.998 secs
 * ```
 *
 * and just to demonstrate all the location variables in one custom format:
 * ```js
 * logAF.options({
 *   labelFormat: ({arrow, line, col, parent, file, path}) =>
 * `${arrow}
 * line: ${line}
 * col: ${col}
 * parent: ${parent}
 * file: ${file}
 * path: ${path}
 * `
 * });
 * logAF(promise, 2);
 *
 * // ========================>
 * // line: 24
 * // col: 1
 * // parent: parentDirectory/
 * // file: filename.js
 * // path: /Full/path/to/the/parentDirectory/
 * // 1 2
 * // in 0.998 secs
 * ```
 *
 * to reset `logAF.options` to its default values, call `logAF.options.reset`
 * ```js
 * logAF.options.reset();
 *
 * // options are now:
 * // label: true,
 * // duration: true,
 * // labelFormat: 'file'
 * ```
 *
 * @static
 * @param {Object} options the options for logAF
 * @param {Boolean} [options.label=true] set to false to turn off the label
 * @param {Boolean} [options.duration=true] set to false to turn off duration
 * @param {String|Function} [options.labelFormat=file] see examples for sample label formats
 * @returns {undefined} sets the options for logAF
 * @see {@link AsyncAF#logAF logAF}
 * @see logAF.options.reset to reset options to default
 * @memberof AsyncAF
 * @alias AsyncAF#logAF_options
 */
const logAfOptions = (options = {}) => {
  const {label, duration, labelFormat} = options;
  if (typeof label === 'boolean') logAF.label = label;
  if (typeof duration === 'boolean') logAF.duration = duration;
  if (labelFormat)
    if (typeof labelFormat === 'string' || typeof labelFormat === 'function')
      logAF.labelFormat = labelFormat;
    else
      logAF.wrappedWarn('Warning: logAF labelFormat option must be set to \'file\' (default), \'path\', \'parent\', \'arrow\', or a custom string or function\n');
};

export default logAfOptions;
