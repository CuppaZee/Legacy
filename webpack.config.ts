const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = async function (env: any, argv: any) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  if (config['plugins']) {
    config['plugins'].forEach((plugin: any) => {
      // detect workbox plugin
      if (plugin['config'] && plugin['config']['swDest'] === 'service-worker.js') {
        // tell it never to cache index.html or service-worker.js
        plugin['config']['exclude'].push(/index.html/);
        plugin['config']['exclude'].push(/service-worker.js/);

        // (optional) tell it to start new service worker versions immediately, even if tabs
        // are still running the old one.
        plugin['config']['skipWaiting'] = true;
      }
    });
    config['plugins'].push(new MomentLocalesPlugin({
      localesToKeep: [
        'cs',
        'da',
        'de',
        'en-gb',
        'en',
        'fi',
        'fr',
        'hu',
        'lt',
        'nl',
        'pt',
        'sv'
      ],
    }))
    // if (env.mode === 'production') {
    //   config.plugins.push(
    //     new BundleAnalyzerPlugin({
    //       path: 'web-report',
    //     })
    //   );
    // }
  }
  return config;
};
