module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-clean-order"],

  plugins: [
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-order",
  ],

  rules: {
    "selector-max-id": 0,
    "max-nesting-depth": 3,
    "declaration-block-no-duplicate-properties": true,
    "plugin/declaration-block-no-ignored-properties": true,
  },
};
