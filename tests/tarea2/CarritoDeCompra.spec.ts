import  { test, expect } from "@playwright/test";
import { SwagLabsLoginPage } from "../../pages/tarea2/SwagLabsLogin.page";
import { SwagLabsProductPage } from "../../pages/tarea2/SwagLabsProduct.page";
import { SwagLabsCartPage } from "../../pages/tarea2/SwagLabsCart.page";
import { SwagLabsCheckoutPage } from "../../pages/tarea2/SwagLabsCheckout.page";


const STORAGE_FILE = 'auth/tarea2/saucedemo.session.json';

test.describe.serial('Suite 1: Login y agregar al carrito', async() => {
  
test('Agregar a carrito', async({page}) =>{

   const loginPage = new SwagLabsLoginPage(page)
   const productsCart = new SwagLabsProductPage(page)

  await loginPage.open();
  
  //1.2Navegar entre opciones e ingresar al formulario de login
  
  await loginPage.navigateToLogin();
  
  // 2. Realizar login con credenciales válidas
  
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/.*inventory.html/);

  await productsCart.sortProductsBy("hilo");

  await productsCart.addProductsByIndex([0,2,4]);

  await productsCart.validateBadge(3);

  await page.context().storageState({ path: STORAGE_FILE });
  console.log(`Estado de sesión guardado en: ${STORAGE_FILE}`);
})
})

test.describe.serial('Suite 2: Checkout y deslogueo', async() => {
  test.use({ storageState: STORAGE_FILE });

  test('Checkout', async({page}) =>{   
  const cartPage = new SwagLabsCartPage(page)
  const checkoutPage = new SwagLabsCheckoutPage(page)

  
  await page.goto('https://www.saucedemo.com/cart.html');

  await cartPage.title.locator("Your Cart");

  await cartPage.removeProductbyIndex([1]);
  
  await cartPage.validateBadge(2);

  await cartPage.checkout();

  await expect(page).toHaveURL(/.*checkout-step-one.html/); 

  await checkoutPage.checkout('Sarah', 'Pacheco','00000');
  await checkoutPage.continueToOverview();
  
  
  await checkoutPage.finishPurchase();
  await expect(checkoutPage.completeHeader).toBeVisible();
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');

  await checkoutPage.logout();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(checkoutPage.firstName).not.toBeVisible(); // Input ya no debe existir

   await page.context().storageState({ path: STORAGE_FILE });
    console.log(`Estado final (logout) guardado en: ${STORAGE_FILE}`);
  });
});