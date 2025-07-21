import test, { expect } from "@playwright/test";

test("inputs and saves correct token", async ({ page }) => {
  await page.goto("/settings");

  const input = await page.getByRole("textbox");
  await input.fill("ghp_E98AR8Hbq8NmRuR34Sh7cnetfkxwC12test1");

  const saveBtn = await page.getByRole("button", { name: /Save/ });
  await saveBtn.click();

  await expect(page).toHaveURL("/");
});

test("inputs invalid token and shows error stlyes", async ({ page }) => {
  await page.goto("/settings");

  const input = await page.getByRole("textbox");
  await input.fill("test_test_test_test");

  const saveBtn = await page.getByRole("button", { name: /Save/ });
  await saveBtn.click();

  await expect(input).toHaveClass(/.*bg-red-\d{3}.*/);
  await expect(page).toHaveURL("/settings");
});
