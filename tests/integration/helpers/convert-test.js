import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | convert', function (hooks) {
  setupRenderingTest(hooks);

  test.each(
    'it can convert different distances',
    [
      {
        from: 'm',
        to: 'cm',
        value: 1,
        expected: '100cm'
      },
      {
        from: 'cm',
        to: 'm',
        value: 25,
        expected: '0.25m'
      },
      {
        from: 'km',
        to: 'm',
        value: 0.5,
        expected: '500m',
      },
      {
        from: 'm',
        to: 'km',
        value: 423,
        expected: '0.423km',
      },
    ],
    async function (assert, { from, to, value, expected }) {
      this.set('inputValue', value);
      this.set('from', from);
      this.set('to', to);

      await render(hbs`{{convert this.inputValue this.from this.to}}`);

      assert.dom().hasText(expected);
    },
  );

  test.each(
    'it can convert different weights',
    [
      {
        from: 'g',
        to: 'mg',
        value: 1,
        expected: '1000mg',
      },
      {
        from: 'mg',
        to: 'g',
        value: 1000,
        expected: '1g',
      },
      {
        from: 'hg',
        to: 'g',
        value: 0.05,
        expected: '5g',
      },
      {
        from: 'g',
        to: 'kg',
        value: 3456,
        expected: '3.456kg',
      },
    ],
    async function (assert, { from, to, value, expected }) {
      this.set('inputValue', value);
      this.set('from', from);
      this.set('to', to);

      await render(hbs`{{convert this.inputValue this.from this.to}}`);

      assert.dom().hasText(expected);
    },
  );

  test.each(
    'it can convert different volumes',
    [
      {
        from: 'l',
        to: 'ml',
        value: 1,
        expected: '1000ml',
      },
      {
        from: 'ml',
        to: 'l',
        value: 1000,
        expected: '1l',
      },
      {
        from: 'cl',
        to: 'ml',
        value: 54,
        expected: '540ml',
      },
      {
        from: 'ml',
        to: 'cl',
        value: 0.1987,
        expected: '0.01987cl',
      },
    ],
    async function (assert, { from, to, value, expected }) {
      this.set('inputValue', value);
      this.set('from', from);
      this.set('to', to);

      await render(hbs`{{convert this.inputValue this.from this.to}}`);

      assert.dom().hasText(expected);
    },
  );

  test.each(
    'it can convert different times',
    [
      {
        from: 's',
        to: 'min',
        value: 60,
        expected: '1min',
      },
      {
        from: 'min',
        to: 's',
        value: 1,
        expected: '60s',
      },
      {
        from: 'h',
        to: 'min',
        value: 2.5,
        expected: '150min',
      },
      {
        from: 'd',
        to: 'h',
        value: 2,
        expected: '48h',
      },
      {
        from: 'w',
        to: 'd',
        value: 4.5,
        expected: '31.5d',
      },
      {
        from: 'y',
        to: 'd',
        value: 4,
        expected: '1460d',
      }
    ],
    async function (assert, { from, to, value, expected }) {
      this.set('inputValue', value);
      this.set('from', from);
      this.set('to', to);

      await render(hbs`{{convert this.inputValue this.from this.to}}`);

      assert.dom().hasText(expected);
    },
  );

  test.each(
    'it can convert different temperatures',
    [
      {
        from: 'c',
        to: 'f',
        value: 0,
        expected: '32°F',
      },
      {
        from: 'c',
        to: 'k',
        value: 0,
        expected: '273.15K',
      },
      {
        from: 'f',
        to: 'c',
        value: 32,
        expected: '0°C',
      },
      {
        from: 'f',
        to: 'k',
        value: 32,
        expected: '273.15K',
      },
      {
        from: 'k',
        to: 'c',
        value: 273.15,
        expected: '0°C',
      },
      {
        from: 'k',
        to: 'f',
        value: 273.15,
        expected: '31.999999999999943°F',
      },
      {
        from: 'c',
        to: 'k',
        value: 24,
        expected: '297.15K',
      },
      {
        from: 'c',
        to: 'f',
        value: -2,
        expected: '28.4°F',
      }
    ],
    async function (assert, { from, to, value, expected }) {
      this.set('inputValue', value);
      this.set('from', from);
      this.set('to', to);

      await render(hbs`{{convert this.inputValue this.from this.to}}`);

      assert.dom().hasText(expected);
    },
  );

  test('it can display the result without unit', async function (assert) {
    this.set('inputValue', 1);
    this.set('from', 'm');
    this.set('to', 'cm');

    await render(hbs`{{convert this.inputValue this.from this.to false}}`);

    assert.dom().hasText('100');
  });

  // it can handle digits option
  test.each(
    'it can handle the digits option',
    [
      {
        from: 'h',
        to: 'w',
        value: 2,
        expected: '0.011904761904761904w',
      },
      {
        from: 'h',
        to: 'w',
        value: 2,
        digits: 2, 
        expected: '0.01w',
      },
      {
        from: 'k',
        to: 'f',
        value: 273.15,
        expected: '31.999999999999943°F',
      },
      {
        from: 'k',
        to: 'f',
        value: 273.15,
        digits: 4,
        expected: '32.0000°F',
      },
      {
        from: 'm',
        to: 'km',
        value: 134.678,
        digits: 2,
        expected: '0.13km',
      },
    ],
    async function (assert, { from, to, value, digits, expected }) {
      this.set('inputValue', value);
      this.set('from', from);
      this.set('to', to);
      this.set('digits', digits);

      await render(hbs`{{convert this.inputValue this.from this.to true this.digits}}`);

      assert.dom().hasText(expected);
    },

    // test with different option for digit and withUnit
    test.each(
      'it can handle the digits and withUnit options',
      [
        {
          from: 'h',
          to: 'w',
          value: 2,
          expected: '0.011904761904761904w',
        },
        {
          from: 'h',
          to: 'w',
          value: 2,
          digits: 2, 
          withUnit: false,
          expected: '0.01',
        },
        {
          from: 'k',
          to: 'f',
          value: 273.15,
          expected: '31.999999999999943°F',
        },
        {
          from: 'k',
          to: 'f',
          value: 273.15,
          digits: 4,
          expected: '32.0000°F',
        },
        {
          from: 'm',
          to: 'km',
          value: 134.678,
          digits: 2,
          withUnit: false,
          expected: '0.13',
        },
      ],
      async function (assert, { from, to, value, digits, withUnit, expected }) {
        this.set('inputValue', value);
        this.set('from', from);
        this.set('to', to);
        this.set('digits', digits);
        this.set('withUnit', withUnit);

        await render(hbs`{{convert this.inputValue this.from this.to this.withUnit this.digits}}`);

        assert.dom().hasText(expected);
      })
   );
});
