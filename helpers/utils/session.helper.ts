import { Page } from "@playwright/test";
import { Logger } from "./log.helper";

const DEFAULT_SESSION_PATH = "auth/suite2.session.json"

/**
 * Guarda el estado actual (cookies, localStorage, sessionStorage) en un archivo JSON
 * @param page 
 * @param filePath 
 */

export async function saveSession(page:Page, 
  filePath= DEFAULT_SESSION_PATH): Promise <void>
{
 Logger.step(`Guardando sesion en ${filePath}`);
 await page.context().storageState({path : filePath});
}