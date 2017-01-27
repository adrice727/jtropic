;(() => { // eslint-disable-line no-extra-semi
  /** Check for undefined or null */
  const isNil = input => !input;

  /** Check for string */
  const isString = input => typeof input === 'string';

  /** Check for array */
  const isArray = input => Array.isArray(input);

  /** Check for object */
  const isObject = input => typeof input === 'object' && !isNil(input);


  /**
   * @param {Object}
   * @returns {Object}
   */
  const parseObject = (input, fields) => {
    return Object.keys(input).reduce((acc, key) => {
      // eslint-disable-next-line no-param-reassign
      acc[key] = parse(input[key]);
      return acc;
    }, {});
  };

  /**
   * Attempt to parse a string as JSON
   * @param {String} input
   * @returns {Object} result
   *                   result.data - The parsed/unparsed data
   *                   result.isJSON - Is the input JSON?
   */
  const parseString = (input) => {
    try {
      const data = JSON.parse(input);
      return { data, isJSON: true };
    } catch (e) {
      const data = input;
      return { data, isJSON: false };
    }
  };

  /**
   * @param {Array} input
   * @returns {Array}
   */
  const parseArray = input => input.reduce((acc, element) => acc.concat(parse(element)), []);

  /**
   * @param {*} input
   * @param {Boolean} [fields]
   * @returns {/*}
   */
  const parse = (input, fields) => {

    if (isString(input)) {
      return parseString(input);
    }

    if (isArray(input)) {
      return parseArray(input);
    }

    if (isObject(input)) {
      return parseObject(input, fields);
    }

    return input;
  };

  /**
   * Same as parse, but returns any object fields which are JSON
   * @param {*} input
   * @returns {*}
   */
  const parseWithFields = input => parse(input, true);

  const simparse = {
    parse,
    parseWithFields,
  };

  if (typeof exports === 'object' && !!module) {
    module.exports = simparse;
    /* eslint-disable no-undef */
  } else if (typeof define === 'function' && define.amd) {
    define(() => simparse);
    /* eslint-disable no-undef */
  } else {
    this.simparse = simparse;
  }
})(this);
