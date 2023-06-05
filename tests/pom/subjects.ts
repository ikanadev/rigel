import { Page, Locator } from "@playwright/test";
import { APP_URL } from "../utils";

export class SubjectsPage {
	readonly page: Page;
	testClass: Locator;

	constructor(page: Page) {
		this.page = page;
		this.testClass = page.locator("a", { hasText: "Matemática" });
	}

  async goto() {
    await this.page.goto(APP_URL);
  }

	async selectClass() {
    console.log('URL:', this.page.url());
		this.testClass = this.page.locator("a", { hasText: "Matemática" });
		await this.testClass.click();
		await this.page.waitForURL('**/class/**/activities');
	}
}
