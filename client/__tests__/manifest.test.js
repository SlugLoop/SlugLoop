import manifest from '../app/manifest'

test('defines SlugLoop PWA metadata', () => {
  expect(manifest()).toMatchObject({
    name: 'SlugLoop Bus Tracker Tool',
    short_name: 'SlugLoop',
    start_url: '/',
    display: 'standalone',
    theme_color: '#ffc72c',
    background_color: '#ffc72c',
  })

  expect(manifest().icons).toEqual(
    expect.arrayContaining([
      expect.objectContaining({src: '/icons/android-chrome-192x192.png'}),
      expect.objectContaining({src: '/icons/android-chrome-512x512.png'}),
      expect.objectContaining({src: '/icons/maskable.png', purpose: 'maskable'}),
    ]),
  )
})
