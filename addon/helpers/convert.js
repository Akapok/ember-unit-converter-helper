import Helper from '@ember/component/helper';
import {
  temperatureConversion,
  commonConversion,
} from '../utils/conversion-function';
import { units, k } from '../utils/units';

export default class convertHelper extends Helper {
  /**
   * Add the unit abbreviation to the converted value
   * @param {number} result - The result of the conversion
   * @param {string} to - The value to convert
   * @returns {string} The converted value with the unit abbreviation
   */
  addUnit(result, to) {
    if (to === 'c') {
      return `${result}°C`;
    }
    if (to === 'f') {
      return `${result}°F`;
    }
    if (to === 'k') {
      return `${result}K`;
    }

    return `${result}${to}`;
  }

  /**
   * Round the result to the number of digits
   * @param {number} result - The result of the conversion
   * @param {number} digits - The number of digits to keep
   * @returns {string} The rounded result
   */
  roundResult(result, digits) {
    if (Math.round(result) !== result) {
      return result.toFixed(digits);
    }
    return result;
  }

  compute(_, { value, from, to, withUnit = true, digits }) {
    let result = undefined;

    if (value === undefined || !from || !to) {
      throw new Error(
        'Ember-unit-converter-helper: Missing arguments. The helper needs at least 3 arguments: value, from, to',
      );
    }

    if (isNaN(value)) {
      throw new TypeError(
        `Ember-unit-converter-helper: The value must be a number, got a ${typeof value}`,
      );
    }

    if (typeof from !== 'string' || typeof to !== 'string') {
      throw new TypeError(
        'Ember-unit-converter-helper: The units must be strings.',
      );
    }

    from = from.toLowerCase();
    to = to.toLowerCase();

    // The only unit that can be negative is Celsius
    if (from != 'c' && value < 0) {
      throw new Error(
        'Ember-unit-converter-helper: Negative value allowed only for Celsius',
      );
    }

    [from, to].forEach((unit) => {
      if (!units[unit]) {
        throw new Error(`Ember-unit-converter-helper: unknown unit ${unit}`);
      }
    });

    const unitFrom = units[from];
    const unitTo = units[to];

    // Conversion is allowed only between units of the same type
    if (unitFrom.parent !== unitTo.parent) {
      throw new Error('Ember-unit-converter-helper: Units are not compatible');
    }

    if (unitFrom.parent === k) {
      result = temperatureConversion(value, from, to);
    } else {
      result = commonConversion(
        unitFrom.toParent(value),
        unitFrom.parent.scale,
        unitTo.scale,
      );
    }

    result = digits ? this.roundResult(result, digits) : result;
    result = withUnit ? this.addUnit(result, to) : result;

    return result;
  }
}
