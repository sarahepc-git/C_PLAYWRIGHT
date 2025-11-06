import { expect, Locator, Page } from "@playwright/test";


export class SwagLabsCheckoutPage{
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zipCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;

  
 constructor (page: Page){
 this.page = page;

 
 this.firstName = page.locator('[data-test="firstName"]');
 this.lastName = page.locator('[data-test="lastName"]');
 this.zipCode = page.locator('[data-test="postalCode"]');
 this.continueButton = page.locator('[data-test="continue"]');
 this.finishButton = page.locator('[data-test="finish"]');
 this.completeHeader = page.locator('.complete-header');
 this.burgerMenuButton = page.locator('#react-burger-menu-btn');
 this.logoutLink = page.locator('#logout_sidebar_link');
 
}

async checkout(firstName: string, LastName: string, zipCode: string){
    await this.firstName.fill(firstName)
    await this.lastName.fill(LastName)
    await this.zipCode.fill(zipCode)
}


  async continueToOverview() {
    await this.continueButton.click();
  }
  
  async finishPurchase() {
    await this.finishButton.click();
  }


  async logout() {
    await this.burgerMenuButton.click();
    await this.logoutLink.click();
  }
}