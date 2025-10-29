import test, { expect } from "@playwright/test";

test.describe("Navegacion basica", () => {
  //navegacion a google
  test("Navegar a goolge", async ({ page }) => {
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle(/Google/);
  });

  //navegacion a youtube
 test('Navegación a Youtube', async ({page}) => {
  await page.goto('https://www.youtube.com');
  await expect(page).toHaveTitle(/YouTube/);
})

  //Interactuar con una pagina
    test.describe("Acciones todos", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://demo.playwright.dev/todomvc/#/");
    });
    test("Agregar 3 todos y contar elementos", async ({ page }) => {
      await page.fill(".new-todo", "Comprar leche");
      await page.keyboard.press("Enter");
      await page.fill(".new-todo", "Pagar luz");
      await page.keyboard.press("Enter");
      await page.fill(".new-todo", "Llamar a mamá");
      await page.keyboard.press("Enter");
      const elements = page.locator(".todo-list li");
      const numElement = await elements.count();
      console.log("Ingresados:", numElement);
      const todosTexts = await elements.allInnerTexts();
      console.log("Textos Ingresados:", todosTexts);
    });

    test('Completar el primer y último todo y filtrar"Completed"', async ({ page }) => {
      const input = page.locator(".new-todo");
      for (const t of ["Uno", "Dos", "Tres"]) {
        await input.fill(t);
        await page.keyboard.press("Enter");
      }
      // Completar todos
      await page.click(".todo-list li:first-child .toggle");
      await page.click(".todo-list li:last-child .toggle");
      // Filtrar
      await page.click(".filters li:nth-child(3) a");
      const completedItems = page.locator(".todo-list li");
      const completedCount = await completedItems.count();
      console.log("Completados:", completedCount);
      const completedTexts = await page.locator(".todo-list lilabel").allInnerTexts();
      console.log("Textos completados:", completedTexts);
    });
  });
});
