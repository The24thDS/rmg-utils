import { test, expect } from "@playwright/test";

test("visual test", async ({ page }) => {
  await page.goto("/privacy");
  // Wait for all network requests for images to complete
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveScreenshot();
});
