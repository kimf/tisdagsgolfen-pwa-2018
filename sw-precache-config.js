module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/*.html',
    'build/*.png',
    'build/*.gif',
    'build/*.jpg',
    'build/manifest.json',
    'build/static/**/!(*map*)',
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'build/service-worker.js',
  navigateFallback: 'index.html',
};
