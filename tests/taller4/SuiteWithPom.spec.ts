import test, { expect } from "@playwright/test";
import { FirstSuiteLoginPage } from "../../pages/FirstSuiteLogin.page";


test.describe('Suite 1: Login con POM y assertions', async() => {


test('Login exitoso', async({ page}) =>{
  
  const loginPage = new FirstSuiteLoginPage(page)


  // 1. Navegar a la página de login
  // //1.1 Ingresar a la pagina raíz
  
  await loginPage.open();
  
  //1.2Navegar entre opciones e ingresar al formulario de login
  
  await loginPage.navigateToLogin();
  
  // 2. Realizar login con credenciales válidas
  
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
 
  // 3. Validaciones con assertions
  // 3.1 Título "Secure Area" usando getByRole (selector accesible por rol heading)
  
  const headingSecure=page.getByRole('heading', { name:'Secure Area', exact:true});
  
  await expect(headingSecure).toBeVisible();
  
  // 3.2 Mensaje flash usando toHaveText (regex parcial)
  await expect(loginPage.flashMessage).toHaveText(/You logged into a secure area!/);
  
  // 3.3 Verificar que salió el botón Logout (selector por texto)
  const logoutButton=page.getByRole('link', {name:'Logout'})
  
  await expect(logoutButton).toBeVisible();
  
  // 3.4 Cerrar sesión y asegurar redirección
  
  await logoutButton.click()

  await expect(page).toHaveURL(/login/)
});
  
  
  test('Login inválido', async({ page}) => {
    const loginPage=new FirstSuiteLoginPage(page);
    // 1. Navegar a la página de login
    await loginPage.open();
    await loginPage.navigateToLogin();
    // 2. Hacer logincon credenciales inválidas
    await loginPage.login('usuarioIncorrecto', 'claveIncorrecta');
    
    // 3 Asegurar el fallo de credenciales
    await expect(loginPage.flashMessage).toHaveText(/Your username is invalid!/);
  });

})