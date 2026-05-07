const {expect, test} = require('@playwright/test')

test('home page links to the journey field log and the preserved map', async ({page}) => {
  await page.goto('/')

  await expect(page.getByText(/field notes from a hackathon/i).first()).toBeVisible()
  await page.getByRole('link', {name: /read the field log/i}).first().click()
  await expect(page).toHaveURL(/\/journey$/)
})

test('static archive routes render core content', async ({page}) => {
  await page.goto('/journey')
  await expect(page.getByText(/from a reddit thread/i).first()).toBeVisible()

  await page.goto('/timeline')
  await expect(page.getByText(/from a reddit thread/i).first()).toBeVisible()

  await page.goto('/about')
  await expect(page.getByText(/four engineers/i).first()).toBeVisible()
  await expect(page.getByText('Bill Zhang')).toBeVisible()
  await expect(page.getByText('Alex Liu')).toBeVisible()
  await expect(page.getByText('Annie Liu')).toBeVisible()
  await expect(page.getByText('Nicholas Szwed')).toBeVisible()

  await page.goto('/contact')
  await expect(page.getByText(/the back of the notebook/i).first()).toBeVisible()
})

test('desktop folder-tab navigation reaches all routes', async ({page}) => {
  await page.setViewportSize({width: 1280, height: 800})
  await page.goto('/')

  await page.getByRole('link', {name: 'Field log', exact: true}).first().click()
  await expect(page).toHaveURL(/\/journey$/)

  await page.getByRole('link', {name: 'Crew', exact: true}).first().click()
  await expect(page).toHaveURL(/\/about$/)

  await page.getByRole('link', {name: 'Links', exact: true}).first().click()
  await expect(page).toHaveURL(/\/contact$/)
})

test('mobile menu opens and links reach the map', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/')
  await page.getByRole('button', {name: /toggle navigation/i}).click()
  await page.getByRole('link', {name: /open map/i}).first().click()
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
  await expect(page.getByText(/preserved demo of the original wiring/i)).toBeVisible()
  await expect(page.getByText(/no buses match right now/i)).toBeVisible()

  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
    'href',
    '/manifest.webmanifest',
  )
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'href',
    '/icons/apple-touch-icon.png',
  )
})
