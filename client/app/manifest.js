export default function manifest() {
  return {
    short_name: 'SlugLoop',
    name: 'SlugLoop Bus Tracker Tool',
    description:
      'SlugLoop is a tool for tracking the UCSC Loop and Metro Buses in real time.',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui'],
    theme_color: '#ffc72c',
    background_color: '#ffc72c',
    icons: [
      {
        src: '/icons/favicon-32x32.png',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-192x192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        src: '/icons/maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Open Map',
        short_name: 'Map',
        description: 'Open the SlugLoop route map.',
        url: '/map',
        icons: [{src: '/icons/android-chrome-192x192.png', sizes: '192x192'}],
      },
      {
        name: 'View Timeline',
        short_name: 'Timeline',
        description: 'View the SlugLoop project timeline.',
        url: '/timeline',
        icons: [{src: '/icons/android-chrome-192x192.png', sizes: '192x192'}],
      },
    ],
  }
}
