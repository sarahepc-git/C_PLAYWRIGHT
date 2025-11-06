import test, { expect } from "@playwright/test";
import { Logger } from "../../helpers/utils/log.helper";
import { waitPageStable, waitVisible } from "../../helpers/utils/wait.helper";
import { saveSession } from "../../helpers/utils/session.helper";
import { addFirstNProductsToCart } from "../../helpers/ui/cart.helper";
import { snapshot } from "node:test";


const STORAGE_FILE = 'auth/suite2.session.json';

// Suite 1: genera la sesión y la guarda en disco
test.describe.serial('Suite 1: Almacenar estado autentificado', () => {
  
  test.beforeEach(async ()=> {
    Logger.start("TEST")
  }) 

  test.afterEach(async ()=>{
    Logger.end()
  }) 

  test('Login inicial y guardar sesión', async ({ page }) => {
    Logger.info("Loging inicial y guardar sesion")
    // 1. Ir al login
    await page.goto('https://www.saucedemo.com/');

    await waitPageStable(page)

    // 2. Ingresar credenciales
    Logger.info("Completando credenciales de usuario estandar")
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // 3. Esperar inventario visible
    Logger.info("Esperando vista de inventario")
    await page.waitForSelector('.inventory_list');
    await expect(page.locator('.inventory_list')).toBeVisible();

    // 4. Guardar sesión logueada en disco
    Logger.info("Guardando sesion autentificada")
    await saveSession(page);
    //await page.context().storageState({ path: STORAGE_FILE });
    //console.log('Sesión inicial guardada en', STORAGE_FILE);
  });
});


test.describe.serial('Suite 2: - Navegación con sesión persistente (carrito y checkout)', () => {

  test.use({ storageState: STORAGE_FILE });

  test.beforeEach(async ()=> {
    Logger.start("TEST")
  }) 

  test.afterEach(async ()=>{
    Logger.end("")
  }) 


  test('Agregar 2 productos al carrito y guardar sesión actualizada', async ({ page }) => {
    
    // Navegamos a la pagina de inventario con el estado actualizado
    Logger.step("Navegar a la ruta de inventario")
    await page.goto('https://www.saucedemo.com/inventory.html');

    await waitVisible(page, ".inventory_list");
    //await expect(page.locator('.inventory_list')).toBeVisible();

    // Click en los primeros 2 botones "Add to cart"
    Logger.step("Seleccionar los 3 primeros elementos de la lista")
    await addFirstNProductsToCart(page, 3);
    /*const addButtons = page.locator('.inventory_item button');
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();*/

    // Badge del carrito debe marcar 2 productos
    Logger.debug("Validando badge del carrito == 3")
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('3');

    // Guardar sesión actualizada
    Logger.info("Almacenar estado de los 3 elementos seleccionados")
    await saveSession(page)
    /*await page.context().storageState({ path: STORAGE_FILE });
    console.log('Carrito con 2 productos guardado en', STORAGE_FILE);*/
  });

  test('Finalizar la compra de los productos seleccionados', async ({ page }) => {
  
    Logger.info("Ir al carrito con la sesion precargada")
    // Navegar a la pagina de checkout
    await page.goto('https://www.saucedemo.com/cart.html');

    try {
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(3);  
    } catch (error) {
      Logger.error("Ocurrio un error",error,);
      throw new Error ("Error en validacion")
    }
    
    // Realizar Checkout
    await page.click('#checkout');
    await page.fill('#first-name', 'Carlos');
    await page.fill('#last-name', 'Ramirez');
    await page.fill('#postal-code', '00001');
    await page.click('#continue');
    await page.click('#finish');

    // Validar mensaje final
    Logger.debug("Validando mensaje final de checkout")
    const doneMsg = page.locator('.complete-header');
    await expect(doneMsg).toHaveText('Thank you for your order!');
   
    Logger.info("Guardar estado final")
    await saveSession(page);
    //await page.context().storageState({ path: STORAGE_FILE });
    // console.log('Checkout completado con sesión persistente');
    
  });


test.afterAll(async ()=>{
  Logger.end("Suite finalizado")
})
});