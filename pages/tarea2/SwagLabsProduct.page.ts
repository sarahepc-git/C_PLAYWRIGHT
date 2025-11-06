import { expect, Locator, Page } from "@playwright/test";


export class SwagLabsProductPage{
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productButtons: Locator;
  readonly productsBadge: Locator;
  
 constructor (page: Page){
 this.page = page;

 
 this.sortDropdown = page.locator('[data-test="product-sort-container"]');
 this.productButtons = page.locator('.inventory_list button');
 this.productsBadge = page.locator('.shopping_cart_badge');
 
}

async sortProductsBy(optionValue: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption({ value: optionValue });
  }


async addProductsByIndex(indexes: number[]) {
    for (const i of indexes) {
      await this.productButtons.nth(i).click();
    }
  }

 async validateBadge(expected: number) {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await expect(this.productsBadge).toHaveText(String(expected));
  }
}