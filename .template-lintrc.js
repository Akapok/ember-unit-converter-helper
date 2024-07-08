'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    // Linter isnot able to distinct curlies from components and for helper
    'no-curly-component-invocation': false,
  },
};
