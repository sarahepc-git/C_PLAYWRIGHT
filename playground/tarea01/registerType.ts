/** Roles válidos para la aplicación de registro. Ejemplos "admin" | "editor" | "viewer"  +*/
export type Role = "admin" | "editor" | "viewer";

/** Estructura de datos para el intento de registro.  */
export interface Register {
  username: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

/** Estructura de usuario resultante tras un registro exitoso.
 * Se incluye `password` por requerimiento del enunciado.  */
export interface User {
  id: string;
  username: string;
  role: Role;
  password: string;
  email: string;
}

/** Resultado genérico de operaciones */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}
