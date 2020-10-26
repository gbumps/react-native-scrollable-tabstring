module.exports = {
    parserOptions: {
      ecmaVersion: 7,
      ecmaFeatures: {
        impliedStrict: true,
        jsx: true,
        experimentalObjectRestSpread: true
      },
      sourceType: 'module'
    },
    parser: 'babel-eslint',
    env: {
      node: true,
      es6: true
    },
    extends: [
      // "@react-native-community",
      'airbnb',
      'plugin:react/recommended',
    ],
    plugins: [
      'react',
      'react-native',
      // "@react-native-community"
    ],
    rules: {
      'max-len': ["error", { "code": 200 }],
      'comma-dangle': 0,
      'radix': 0,
      'global-require': 1,
      'no-nested-ternary': 0,
      'no-return-assign': 0,
      'react/require-default-props': 0,
      'react/prefer-stateless-function': 0,
      'function-paren-newline': 0,
      'import/prefer-default-export': 0,
      'react/forbid-prop-types': 0,
      'react/jsx-filename-extension': 0,
      'arrow-body-style': 'warn',
      'no-console': 0,
      'react/prop-types': 0,
      'react/no-string-refs': 0,
      'no-undef': 'error',
      'linebreak-style': 0,
      'class-methods-use-this': 0,
      'no-underscore-dangle': 0,
      'import/no-extraneous-dependencies': ["error", { devDependencies: true }],
      'react/no-did-mount-set-state': 0,
      'react/sort-comp': 0,
      'camelcase': 0,
      // Indent with 4 spaces∂
      "indent": ["error", 4],
      // Indent JSX with 4 spaces
      "react/jsx-indent": ["error", 4],
      // Indent props with 4 spaces
      "react/jsx-indent-props": ["error", 4],
      // "import/no-unresolved": ["error", {commonjs: true, caseSensitive: true}],
      "no-use-before-define": [2, { "functions": false, "classes": false, "variables": false }],
      "react/jsx-props-no-spreading": [0, {}],
      "consistent-return": [0],
      "import/no-unresolved": [0],
      "no-mixed-operators": [0],
      "no-unused-expressions": [0],
      "no-useless-constructor": [0],
      "no-plusplus": [0]
    }
  }
  