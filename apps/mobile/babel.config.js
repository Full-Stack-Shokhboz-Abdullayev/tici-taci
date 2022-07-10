module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      'react-native-reanimated/plugin',
      // '@babel/plugin-transform-flow-strip-types'
      ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
  };
};
