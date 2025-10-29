/**Rol permitido en la app */
export type Role = "admin" | "editor" | "viewer";

/**Interfaz de datos de registro 
 * Representa los datos que el usuario envía al registrarse
*/
export interface Register {
  username: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

/**Interfaz de usuario registrado 
 * Representa el usuario ya creado en el sistema.
*/
export interface User {
  id: string;
  username: string;
  role: Role;
  password: string;
  email: string;
}

/**Interfaz genérica de resultado */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}