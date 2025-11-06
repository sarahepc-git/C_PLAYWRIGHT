import { Page, Selectors } from "@playwright/test";

/**
 * Espera a que un selector exista y sea visible
 * @param page - Instancia del test (navegador) 
 * @param selector - Identificador del elemento (string)
 */

export async function waitVisible(page:Page, selector: string){

  await page.waitForSelector(selector, {state : "visible", timeout: 500}) 
  //se puede poner tambien "attached" que significa que el elemento existe pero no ha terminado de cargar (existe pero no se ve)
}

/**
 * Espera explicita en la pagina. Evalua lo siguiente: 
 * - SE CARGÓ COMPLETAMENTE EL DOM
 * - NO EXISTEN SOLICITUDES PENDIENTES DE RED
 */
export async function waitPageStable(page: Page) 
{
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle") 
}

