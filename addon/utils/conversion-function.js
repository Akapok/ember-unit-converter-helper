/**
 * Convert temperature units
 * @param {number} value - The value to convert
 * @param {string} from - The unit to convert from. Must be 'c', 'f' or 'k'.
 * @param {string} to - The unit to convert to. Must be 'c', 'f' or 'k'.
 * @returns {number} The converted value
 */
function temperatureConversion(value, from, to) {
  if (from === 'c' && to === 'f') {
    return (value * 9) / 5 + 32;
  }

  if (from === 'c' && to === 'k') {
    return value + 273.15;
  }

  if (from === 'f' && to === 'c') {
    return ((value - 32) * 5) / 9;
  }

  if (from === 'f' && to === 'k') {
    return ((value + 459.67) * 5) / 9;
  }

  if (from === 'k' && to === 'c') {
    return value - 273.15;
  }

  if (from === 'k' && to === 'f') {
    return (value * 9) / 5 - 459.67;
  }

  return value;
}

/**
 * Convert every units based on a decimal system
 * @param {number} value - The value to convert
 * @param {string} from - The unit to convert from
 * @param {string} to - The unit to convert to
 * @param {Object} units - The units to convert
 * @returns {number} The converted value
 */
function commonConversion(value, from, to) {
  return (value * from) / to;
}

export { temperatureConversion, commonConversion };
