import { Locator, Page } from "@playwright/test";


export class SwagLabsLoginPage{
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator
 // readonly flashMessage: Locator;

constructor (page: Page){
 this.page = page;

 this.usernameInput = page.locator("#user-name");
 this.passwordInput = page.locator("#password");
 this.submitButton = page.locator("#login-button")

 //this.flashMessage = page.locator("#login_logo")
}

async open(){
    await this.page.goto('https://www.saucedemo.com/')
}

async navigateToLogin(){
 await this.page.getByText('Swag Labs').click()
}

async login(user: string, pass: string){
    await this.usernameInput.fill(user)
    await this.passwordInput.fill(pass)
    await this.submitButton.click();
}

}