const { test, expect } = require("@playwright/test");

test("Contact Us Form", async ({ page }) => {
  await page.goto("/contact");
  await page.fill("Name", "FirstName"); // Name
  await page.fill("Email", "firstName@gmail.com"); // Email
  await page.fill("Message", "Test Message"); // Message
  await page.click("submit-button");

  const successfulSubmit = await page.textContent(".success");
  expect(successfulSubmit).toBe("Message sent successfully");

  const nameValue = await page.inputValue("Name");
  const emailValue = await page.inputValue("Email");
  const passwordValue = await page.inputValue("Message");
  expect(nameValue).toBe("FirstName");
  expect(emailValue).toBe("firstName@gmail.com");
  expect(passwordValue).toBe("Test Message");
});
