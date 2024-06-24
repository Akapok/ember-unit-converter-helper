import Helper from '@ember/component/helper';
import {
  temperatureConversion,
  timeConversion,
  commonConversion,
} from '../utils/conversion-function';
import { getUnitType } from '../utils/units';

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

  compute([value, from, to, withUnit = true, digits]) {
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
      const unitType = getUnitType(unit);
      if (!unitType) {
        throw new Error(`Ember-unit-converter-helper: unknown unit ${unit}`);
      }
    });

    let unitTypeFrom = getUnitType(from);
    let unitTypeTo = getUnitType(to);

    // Conversion is allowed only between units of the same type
    if (unitTypeFrom.name !== unitTypeTo.name) {
      throw new Error('Ember-unit-converter-helper: Units are not compatible');
    }

    // At this point, unitTypeFrom is the same as unitTypeTo. Take the one you want
    let { name, units } = unitTypeFrom;

    if (name === 'temperature') {
      result = temperatureConversion(value, from, to);
    } else if (name === 'time') {
      result = timeConversion(value, from, to);
    } else {
      result = commonConversion(value, from, to, units);
    }

    result = digits ? this.roundResult(result, digits) : result;
    result = withUnit ? this.addUnit(result, to) : result;

    return result;
  }
}
