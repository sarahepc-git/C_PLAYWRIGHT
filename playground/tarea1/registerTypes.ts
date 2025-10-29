export type Role = "admin" | "editor" | "viewer";

/**
 * Interfaz de usuario.
 *
 * **Details**
 *
 * Esta interfaz se usará para generar el objeto Usuario.
 */
export interface User {
  id: string;
  username: string;
  role: Role;
  password: string;
  email: string;
}

/**
 * Interfaz de registro de usuario.
 */
export interface Register {
  username: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

/**
 * Interfaz de resultado.
 *
 * **Details**
 *
 * Esta interfaz se usará para generar el resultado dinámico.
 */
export interface Result<T> {
  ok: boolean;
  data?: T;
  message?: string;
}