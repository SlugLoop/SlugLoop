const {expect, test} = require('@playwright/test')

test('home page links to the preserved map', async ({page}) => {
  await page.goto('/')

  await expect(
    page.getByText(/student-built bus tracker that made UCSC move differently/i),
  ).toBeVisible()
  await page.getByRole('link', {name: /open the map artifact/i}).click()
  await expect(page).toHaveURL(/\/map$/)
})

test('static archive routes render core content', async ({page}) => {
  await page.goto('/timeline')
  await expect(page.getByText('The route from frustration to finalist.')).toBeVisible()
  await page.getByRole('link', {name: /return to exhibit/i}).click()
  await expect(page).toHaveURL(/\/$/)

  await page.goto('/about')
  await expect(page.getByText('The people behind the artifact.')).toBeVisible()
  await expect(page.getByText('Bill Zhang')).toBeVisible()
  await expect(page.getByText('Alex Liu')).toBeVisible()
  await expect(page.getByText('Annie Liu')).toBeVisible()
  await expect(page.getByText('Nicholas Szwed')).toBeVisible()

  await page.goto('/contact')
  await expect(page.getByText('Browse the SlugLoop archive.')).toBeVisible()
  await expect(page.getByText('Open the preserved map')).toBeVisible()
})

test('desktop and mobile navigation reach all routes', async ({page}) => {
  await page.setViewportSize({width: 1280, height: 800})
  await page.goto('/')
  await page.getByRole('link', {name: 'Archive', exact: true}).click()
  await expect(page).toHaveURL(/\/timeline$/)
  await page.getByRole('link', {name: 'Team', exact: true}).click()
  await expect(page).toHaveURL(/\/about$/)
  await page.getByRole('link', {name: 'Links', exact: true}).click()
  await expect(page).toHaveURL(/\/contact$/)

  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/')
  await page.getByRole('button', {name: /toggle navigation/i}).click()
  await page.getByRole('button', {name: /open map/i}).click()
  await expect(page).toHaveURL(/\/map$/)
})

test('theme toggle persists across reload', async ({page}) => {
  await page.goto('/')
  await page.evaluate(() => {
    localStorage.setItem('slugloop-theme-mode', 'dark')
  })
  await page.reload()

  await expect.poll(
    async () => page.evaluate(() => localStorage.getItem('slugloop-theme-mode')),
  ).toBe('dark')
  const themeButton = page.getByRole('button', {name: /switch to light mode/i}).first()
  await expect(themeButton).toBeVisible()
  await themeButton.click()
  await expect(page.getByRole('button', {name: /switch to dark mode/i}).first()).toBeVisible()
  await expect.poll(
    async () => page.evaluate(() => localStorage.getItem('slugloop-theme-mode')),
  ).toBe('light')

  await page.reload()
  await expect(page.getByRole('button', {name: /switch to dark mode/i}).first()).toBeVisible()
})

test('map shell and PWA metadata render in test mode', async ({page}) => {
  await page.goto('/map')

  await expect(page.getByTestId('map')).toBeVisible()
  await expect(page.getByTestId('google-map')).toBeVisible()
  await expect(page.getByText('Preserved demo')).toBeVisible()
  await expect(page.getByText(/no recent vehicles match the selected routes/i)).toBeVisible()

  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
    'href',
    '/manifest.webmanifest',
  )
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'href',
    '/icons/apple-touch-icon.png',
  )
})
