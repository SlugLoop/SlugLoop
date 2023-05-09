module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{html,js,css,png,jpg,json}'],
  swDest: 'build/service-worker.js',
  clientsClaim: true,
  skipWaiting: true,
}
