import { test, expect } from "@playwright/test";
import { LoginPage } from "./pom/login";
import { SubjectsPage } from "./pom/subjects";

test.describe("Login", () => {
	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
    await loginPage.goto();
		await loginPage.login();
	});

	test("Ensure the default class existence", async ({ page }) => {
    const subjectsPage = new SubjectsPage(page);
    subjectsPage.selectClass();
    /*
    expect(page.getByText('SER')).not.toBeNull();
    */
	});
});
