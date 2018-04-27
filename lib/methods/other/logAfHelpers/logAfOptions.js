import logAF from '../logAF';

/**
 * Sets logging options for the logAF method
 *
 * accepts an options object with the following optional properties:
 * - label (`Boolean`) - set to `false` to disable logging the location of calls to logAF
 * - duration (`Boolean`) - set to `false` to disable logging the time it takes (in secs) to complete each call to logAF
 * - labelFormat (`String`) - alters the format of logAF labels; choose between `file` (*default*), `path`, `parent`, `arrow`, or `custom`
 *
 * ```js
 * const promise = new Promise(resolve => setTimeout(
 *   () => resolve(1), 1000)
 * );
 * ```
 * **default logging**
 * ```js
 * logAF(promise, 2);
 * // @filename.js:212:9:
 * // 1 2
 * // in 0.998 secs
 * ```
 * **turn off label**
 * ```js
 * logAF.options({ label: false });
 * logAF(promise, 2);
 * // 1 2
 * // in 0.999 secs
 * ```
 * **turn off duration**
 * ```js
 * logAF.options({ duration: false });
 * logAF(promise, 2);
 * // @filename.js:212:9:
 * // 1 2
 * ```
 * **change labelFormat**
 *
 * &#9679; file (*default*)
 *
 * ```js
 * logAF.options({ labelFormat: file });
 * logAF(promise, 2);
 * // @filename.js:212:9:
 * // 1 2
 * // in 0.998 secs
 * ```
 * &#9679; path
 *
 * ```js
 * logAF.options({ labelFormat: path });
 * logAF(promise, 2);
 * // @/Path/to/current/directory/filename.js:212:9:
 * // 1 2
 * // in 0.997 secs
 * ```
 * &#9679; parent
 *
 * ```js
 * logAF.options({ labelFormat: parent });
 * logAF(promise, 2);
 * // @parentDirectory/filename.js:213:9:
 * // 1 2
 * // in 0.998 secs
 * ```
 * &#9679; arrow
 *
 * ```js
 * logAF.options({ labelFormat: arrow });
 * logAF(promise, 2);
 * // ========================> 1 2
 * // in 0.999 secs
 * ```
 *
 * &#9679; custom (create your own labelFormat)
 *  - to set a custom labelFormat, first set it to a string starting with `'custom='`
 *  - after `custom=`, insert your desired format as a string (a string within a string)
 *
 * ```js
 * logAF.options({
 *  labelFormat: 'custom="I logged this:"'
 * });
 * logAF(promise, 2);
 * // I logged this: 1 2
 * // in 1.000 secs
 * ```
 *
 * - your custom format can also access location information as variables, including `file`, `path`, `parent`, `arrow`, `line`, and `col`
 *
 * e.g., to set the labelFormat to `file:line:col =>` you can use template literals
 * ```js
 * logAF.options({
 *  labelFormat: 'custom=`${file}:${line}:${col} =>`'
 * });
 * logAF(promise, 2);
 * // filename.js:212:9 => 1 2
 * // in 0.998 secs
 * ```
 *
 * and just to demonstrate all the location variables in one custom format
 * ```js
 * logAF.options({
 *   labelFormat: 'custom=`${arrow}\nline: ${line}\ncol: ${col}\nparent: ${parent}\nfile: ${file}\npath: ${path}\n`'
 * });
 * logAF(promise, 2);
 * // ========================>
 * // line: 212
 * // col: 9
 * // parent: parentDirectory/
 * // file: filename.js
 * // path: /Full/path/to/the/parentDirectory/
 * // 1 2
 * // in 0.998 secs
 * ```
 * @static
 * @param {Object} options the options for logAF
 * @param {Boolean} [options.label=true] set to false to turn off the label
 * @param {Boolean} [options.duration=true] set to false to turn off duration
 * @param {String} [options.labelFormat=file] see examples for sample label formats
 * @returns {undefined} sets the options for logAF
 * @memberof AsyncAF
 * @alias AsyncAF#logAF_options
 */
const options = function logAfOptions(options = {}) {
  const {label, duration, labelFormat} = options;
  if (typeof label === 'boolean') logAF.label = label;
  if (typeof duration === 'boolean') logAF.duration = duration;
  if (labelFormat) {
    const validFormats = [
      'file',
      'path',
      'parent',
      'arrow',
      'custom',
    ];
    const desiredFormat = labelFormat.slice(0, 6);
    if (!validFormats.includes(desiredFormat)) {
      const msg = 'AsyncAF Warning: logAF labelFormat option must be set to \'file\' (default), \'path\', \'parent\', \'arrow\', or \'custom\'';
      logAF.wrappedWarn(msg);
    } else {
      logAF.labelFormat = desiredFormat;
      logAF.fullFormat = labelFormat;
    }
  }
};

export default options;
