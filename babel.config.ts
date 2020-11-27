module.exports = function (api: any) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.web.js', '.js', '.json'],
          alias: {}
        }
      ]
    ]
  };
};
