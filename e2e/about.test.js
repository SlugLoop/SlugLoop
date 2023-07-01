// e2e/sample.test.js
const { test, expect } = require("@playwright/test");

test("Test About Page Title", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("SlugLoop"); // Replace 'Your Page Title' with your expected title
});
