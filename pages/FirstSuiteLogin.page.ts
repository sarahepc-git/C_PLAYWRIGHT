import {Locator, Page} from "@playwright/test";

export class FirstSuiteLoginPage{
 readonly page: Page;
 readonly usernameInput: Locator;
 readonly passwordInput: Locator;
 readonly submitButton: Locator;
 readonly flashMessage: Locator;

constructor (page: Page){
 this.page = page;

 this.usernameInput = page.locator("#username");
 this.passwordInput = page.locator("#password")
 this.submitButton = page.locator('button[type="submit"]')

 this.flashMessage = page.locator("#flash")
}

async open(){
    await this.page.goto('https://the-internet.herokuapp.com/')
}

async navigateToLogin(){
 await this.page.getByText('Form Authentication').click()
}

async login(user: string, pass: string){
    await this.usernameInput.fill(user)
    await this.passwordInput.fill(pass)
    await this.submitButton.click();
}

}