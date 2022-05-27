module.exports = {
  env: {
    es2020: true,
    node: true
  },
  extends: ["plugin:vue/essential", "prettier"],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {}
};
