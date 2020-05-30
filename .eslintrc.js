module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  node: true,
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    d3: true,

    __dirname: true,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {},
};
