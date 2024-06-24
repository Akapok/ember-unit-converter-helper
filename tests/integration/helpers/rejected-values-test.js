import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, setupOnerror, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | Convert | rejected-values', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    resetOnerror();
  });

  test.each(
    'it throws an error when the units are not compatible',
    [
      {
        from: 'm',
        to: 'kg',
      },
      {
        from: 'dg',
        to: 'c',
      },
      {
        from: 'm',
        to: 's',
      },
      {
        from: 'ml',
        to: 'kg',
      },
    ],
    async function (assert, { from, to }) {
      this.set('inputValue', 1234);
      this.set('from', from);
      this.set('to', to);

      setupOnerror((error) => {
        assert.strictEqual(
          error.message,
          'Ember-unit-converter-helper: Units are not compatible',
        );
      });

      await render(hbs`{{convert this.inputValue this.from this.to}}`)
    },
  );

  test.each(
    'it throws an error when the unit is unknown',
    [
      {
        from: 'md',
        to: 'm',
        unknown: 'md'
      },
      {
        from: 'f',
        to: 'fr',
        unknown: 'fr'
      },
      {
        from: 'plop',
        to: 'kg',
        unknown: 'plop'
      },
      {
        from: 'm',
        to: 'x',
        unknown: 'x'
      },
    ],
    async function (assert, { from, to, unknown }) {
      this.set('inputValue', 1234);
      this.set('from', from);
      this.set('to', to);

      setupOnerror((error) => {
        assert.strictEqual(
          error.message,
          `Ember-unit-converter-helper: unknown unit ${unknown}`,
        );
      });

      await render(hbs`{{convert this.inputValue this.from this.to}}`);
    },
  );

  // it throws an error when the value is negative and the unit is not Celsius with different cases
  test.each(
    'it throws an error when the value is negative and the unit is not Celsius',
    [
      {
        from: 'f',
        to: 'c',
      },
      {
        from: 'm',
        to: 'dm',
      },
      {
        from: 'kg',
        to: 'mg',
      },
      {
        from: 'hl',
        to: 'cl',
      },
    ],
    async function (assert, { from, to }) {
      this.set('inputValue', -1234);
      this.set('from', from);
      this.set('to', to);

      setupOnerror((error) => {
        assert.strictEqual(
          error.message,
          'Ember-unit-converter-helper: Negative value allowed only for Celsius',
        );
      });

      await render(hbs`{{convert this.inputValue this.from this.to}}`);
    },
  );
  
  // it throws an error when the value is not a number
  test('it throws an error when the value is not a number', async function (assert) {
    this.set('inputValue', 'plop');
    this.set('from', 'm');
    this.set('to', 'dm');

    setupOnerror((error) => {
      assert.strictEqual(
        error.message,
        'Ember-unit-converter-helper: The value must be a number, got a string',
      );
    });

    await render(hbs`{{convert this.inputValue this.from this.to}}`);
  });

  // it throws an error when one of the arguments is missing
  test.each(
    'it throws an error when one of the arguments is missing',
    [
      {
        from: 'm',
        to: 'dm',
      },
      {
        value: 1234,
        to: 'dm',
      },
      {
        value: 1234,
        from: 'm',
      },
    ],
    async function (assert, { value, from, to }) {
      this.set('inputValue', value);
      this.set('from', from);
      this.set('to', to);

      setupOnerror((error) => {
        assert.strictEqual(
          error.message,
          'Ember-unit-converter-helper: Missing arguments. The helper needs at least 3 arguments: value, from, to',
        );
      });

      await render(hbs`{{convert this.inputValue this.from this.to}}`);
    },
  );

  // it throws an error when the units are not strings
  test.each(
    'it throws an error when the units are not strings',
    [
      {
        value: 1234,
        from: 1,
        to: 'dm',
      },
      {
        value: 1234,
        from: 'm',
        to: 1,
      },
      {
        value: 1234,
        from: 1,
        to: 1,
      },
    ],
    async function (assert, { value, from, to }) {
      this.set('inputValue', value);
      this.set('from', from);
      this.set('to', to);

      setupOnerror((error) => {
        assert.strictEqual(
          error.message,
          'Ember-unit-converter-helper: The units must be strings.',
        );
      });

      await render(hbs`{{convert this.inputValue this.from this.to}}`);
    },
  );
  
});
