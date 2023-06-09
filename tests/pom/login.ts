import { Page, Locator } from "@playwright/test";
import { APP_URL, testUser } from "../utils";

export class LoginPage {
	readonly page: Page;
	readonly emailInput: Locator;
	readonly passInput: Locator;
	readonly loginButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.emailInput = page.getByPlaceholder("Correo");
		this.passInput = page.getByPlaceholder("Contraseña");
		this.loginButton = page.getByRole("button", { name: "Iniciar" });
	}

  async goto() {
    await this.page.goto(`${APP_URL}signin`);
  }

	async login() {
		await this.emailInput.fill(testUser.email);
		await this.passInput.fill(testUser.password);
		await this.loginButton.click();
		await this.page.waitForURL(APP_URL);
	}
}
