module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{html,js,css,png,jpg,json}'],
  swDest: 'public/service-worker.js',
  clientsClaim: true,
  skipWaiting: true,
}
