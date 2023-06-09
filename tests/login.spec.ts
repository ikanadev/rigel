import { test, expect } from "@playwright/test";
import { APP_URL, testUser } from "./utils";

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test("Check elements existence", async ({ page }) => {
    await expect(page).toHaveTitle(/Auleca/);

    expect(page.getByPlaceholder("Correo")).not.toBeNull();
    expect(page.getByPlaceholder("Contraseña")).not.toBeNull();
    const loginButton = page.getByRole("button", { name: "Iniciar" });
    expect(loginButton).not.toBeNull();
    await expect(loginButton).toBeDisabled();
  });

  test("Login process", async ({ page }) => {
    await page.getByPlaceholder("Correo").fill(testUser.email);
    await page.getByPlaceholder("Contraseña").fill(testUser.password);
    const loginButton = page.getByRole("button", { name: "Iniciar" });
    expect(loginButton).not.toBeNull();
    await expect(loginButton).toBeEnabled();
    await loginButton.click();
    await page.waitForURL(APP_URL);
  });
});
