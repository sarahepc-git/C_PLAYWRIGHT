// playground/tarea01/registerValidate.ts

import { Register, Result, Role, User } from "./registerType";

/**
 * Valida que la longitud de la contraseña cumpla un mínimo.
 * @param password Contraseña a validar.
 * @param minLength Longitud mínima (por defecto 6).
 * @returns true si cumple, false en caso contrario.
 * @example
 * validatePasswordLength("123456"); // true
 * validatePasswordLength("12345");  // false
 */
export function validatePasswordLength(password: string, minLength = 6): boolean {
  return typeof password === "string" && password.length >= minLength;
}


/**
 * Valida que password y confirmPassword coincidan.
 * @param password Contraseña.
 * @param confirmPassword Confirmación de contraseña.
 * @returns true si coinciden, false en caso contrario.
 * @example
 * validatePasswordsMatch("abc123", "abc123"); // true
 * validatePasswordsMatch("abc123", "xyz");    // false
 */
export function validatePasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}


/**
 * Genera el email a partir de role + username y un dominio.
 * Formato: `${role}.${username}@${domain}` en minúsculas,
 * sanitizando espacios y mayúsculas.
 * @param role Rol del usuario.
 * @param username Nombre de usuario.
 * @param domain Dominio (por defecto "email.com").
 * @returns Email generado.
 * @example
 * generateEmail("admin", "carlos"); // "admin.carlos@email.com"
 */
export function generateEmail(role: Role, username: string, domain = "email.com"): string {
  const cleanRole = String(role).trim().toLowerCase();
  const cleanUser = String(username).trim().toLowerCase().replace(/\s+/g, "");
  return `${cleanRole}.${cleanUser}@${domain}`;
}


/**
 * Función principal de registro:
 * - Verifica longitud mínima de contraseña (>=6).
 * - Verifica coincidencia de password y confirmPassword.
 * - Genera email basado en role + username.
 * - Retorna Result<User>.
 * @param data Datos de registro { username, password, confirmPassword, role }.
 * @returns { ok:true, data:User } | { ok:false, message:string }
 * @example
 * const r = await register({
 *   username:"carlos", password:"123456", confirmPassword:"123456", role:"admin"
 * });
 * if (r.ok) console.log(r.data.email); // "admin.carlos@email.com"
 */

export async function register(data: Register): Promise<Result<User>> {
  const { username, password, confirmPassword, role } = data;

  // 1) Validación de longitud
  if (!validatePasswordLength(password, 6)) {
    return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
  }

  // 2) Coincidencia de contraseñas
  if (!validatePasswordsMatch(password, confirmPassword)) {
    return { ok: false, message: "La contraseña y su confirmación no coinciden." };
  }

  // 3) Generación de email
  const email = generateEmail(role, username);

  // 4) Creación de User simulado (id simple para demo)
  const user: User = {
    id: `user_${Date.now()}`,
    username,
    role,
    password,
    email,
  };

  return { ok: true, data: user };
}