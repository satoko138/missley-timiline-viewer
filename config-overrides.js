const { override, addWebpackPlugin } = require('customize-cra');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = override(
    addWebpackPlugin(new VanillaExtractPlugin())
);
