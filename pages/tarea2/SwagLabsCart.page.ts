import { expect, Locator, Page } from "@playwright/test";



export class SwagLabsCartPage{
  readonly page: Page;
  readonly shoppingCart: Locator;
  readonly title: Locator;
  readonly productButtons: Locator;
  readonly productsBadge: Locator;
  readonly checkoutButton: Locator;


constructor (page: Page){
 this.page = page;

 this.shoppingCart = page.locator('.shopping_cart_link');
 this.title = page.locator('.tittle');
 this.productButtons = page.locator('.cart_list button');
 this.productsBadge = page.locator('.shopping_cart_badge');
 this.checkoutButton = page.locator('#checkout');
}

async shoppingCartClick() {
    await this.shoppingCart.click;
  }

async validateTittle(expected: string) {
    await expect(this.title).toHaveText(expected);
  }

async removeProductbyIndex(indexes: number[]) {
    for (const i of indexes) {
      await this.productButtons.nth(i).click();
    }
  }

  async validateBadge(expected: number) {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await expect(this.productsBadge).toHaveText(String(expected));
  } 

  async checkout() {
    await this.checkoutButton.click();
  }

}