var _this = this;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function () {
  // eslint-disable-line no-extra-semi
  /** Check for undefined or null */
  var isNil = function isNil(input) {
    return !input;
  };

  /** Check for string */
  var isString = function isString(input) {
    return typeof input === 'string';
  };

  /** Check for array */
  var isArray = function isArray(input) {
    return Array.isArray(input);
  };

  /** Check for object */
  var isObject = function isObject(input) {
    return (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && !isNil(input);
  };

  /**
   * @param {Object}
   * @returns {Object}
   */
  var parseObject = function parseObject(input, fields) {
    return Object.keys(input).reduce(function (acc, key) {
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
  var parseString = function parseString(input) {
    try {
      var data = JSON.parse(input);
      return { data: data, isJSON: true };
    } catch (e) {
      var _data = input;
      return { data: _data, isJSON: false };
    }
  };

  /**
   * @param {Array} input
   * @returns {Array}
   */
  var parseArray = function parseArray(input) {
    return input.reduce(function (acc, element) {
      return acc.concat(parse(element));
    }, []);
  };

  /**
   * @param {*} input
   * @param {Boolean} [fields]
   * @returns {/*}
   */
  var parse = function parse(input, fields) {

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
  var parseWithFields = function parseWithFields(input) {
    return parse(input, true);
  };

  var simparse = {
    parse: parse,
    parseWithFields: parseWithFields
  };

  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && !!module) {
    module.exports = simparse;
    /* eslint-disable no-undef */
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return simparse;
    });
    /* eslint-disable no-undef */
  } else {
    _this.simparse = simparse;
  }
})(this);