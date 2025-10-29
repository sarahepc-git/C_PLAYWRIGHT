import { Register } from "./registerTypes";

/**
 * Función de validación de longitud de contraseña mínima de 6 caracteres.
 *
 * @param password Contraseña ingresada.
 * @returns `true` si la contraseña es válida, `false` si no cumple con la longitud mínima.
 * @example
 * validacionLongitudPassword("123456"); // true
 * validacionLongitudPassword("abc"); // false
 */
export function validacionLongitudPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Función de validación y confirmación de contraseña que coincidan.
 *
 * @param password Contraseña original.
 * @param confirmPassword Confirmación de la contraseña.
 * @returns `true` si ambas contraseñas coinciden, `false` si no.
 * @example
 * validacionConfirmacionPassword("123456", "123456"); // true
 * validacionConfirmacionPassword("abc", "xyz"); // false
 */
export function validacionConfirmacionPassword(
  password: string,
  confirmPassword: string
): boolean {
  return password === confirmPassword;
}

/**
 * Función para generar email en base a role+username.
 *
 * @param username Nombre de usuario.
 * @param role Rol del usuario.
 * @returns Correo electrónico en formato `${role}.${username}@email.com`.
 * @example
 * generacionEmail("carlos", "admin"); // "admin.carlos@email.com"
 */
export function generacionEmail(username: string, role: string): string {
  return `${role}.${username}@email.com`;
}

/**
 * Valida un registro de usuario verificando las contraseñas y generando el email.
 *
 * @param register Datos del registro: `{ username, password, confirmPassword, role }`.
 * @returns Un objeto con la validación del registro:
 * - `{ ok: true, data, message }` si el registro es válido.
 * - `{ ok: false, message }` si hay algún error.
 * @example
 * const result = validacionRegistro({
 *   username: "roberto",
 *   password: "123abc",
 *   confirmPassword: "123abc",
 *   role: "admin"
 * });
 * console.log(result);
 */
export function validacionRegistro(register: Register) {
  const { username, password, confirmPassword, role } = register;

  if (!validacionLongitudPassword(password)) {
    return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
  }

  if (!validacionConfirmacionPassword(password, confirmPassword)) {
    return { ok: false, message: "Las contraseñas no coinciden." };
  }

  const email = generacionEmail(username, role);
  return { ok: true, message: "Registro válido.", data: { username, role, email } };
}
