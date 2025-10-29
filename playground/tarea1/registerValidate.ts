import { randomUUID } from "crypto";
import type { Register, Result, User } from "./registerTypes";

/**
 * Valida que la contraseña tenga una longitud mínima de 6 caracteres.
 *
 * @param password Contraseña a validar
 * @returns `true` si cumple con la longitud mínima, `false` en caso contrario
 *
 * @example
 * ```ts
 * validatePasswordLength("123456"); // true
 * validatePasswordLength("123");    // false
 * ```
 */
export const validatePasswordLength = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Verifica que la contraseña y su confirmación coincidan.
 *
 * @param password Contraseña original
 * @param confirmPassword Confirmación ingresada
 * @returns `true` si ambas coinciden
 *
 * @example
 * ```ts
 * validatePasswordMatch("abc123", "abc123"); // true
 * validatePasswordMatch("abc123", "xyz");    // false
 * ```
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

/**
 * Genera un correo electrónico basado en el rol y nombre de usuario.
 *
 * @param role Rol del usuario (admin, editor, viewer)
 * @param username Nombre del usuario
 * @returns Email generado en el formato `role.username@gmail.com`
 *
 * @example
 * ```ts
 * generateEmail("admin", "carlos");
 * // "admin.carlos@gmail.com"
 * ```
 */
export const generateEmail = (role: string, username: string): string => {
  return `${role}.${username}@gmail.com`;
};

/**
 * Registra un usuario.
 *
 * @param data Datos de registro `{ username, password, confirmPassword, role }`.
 * @returns `{ ok:true, data:User }` si el registro fue exitoso,
 * o `{ ok:false, message:string }` si hubo error en la validación.
 *
 * @example
 * ```ts
 * const r = await registerUser({
 *   username: "carlos",
 *   password: "123456",
 *   confirmPassword: "123456",
 *   role: "admin"
 * });
 * if (r.ok && r.data) console.log(r.data.gmail);
 * ```
 */
export const registerUser = async (
  data: Register
): Promise<Result<User>> => {
  const { username, password, confirmPassword, role } = data;

  // Validar longitud
  if (!validatePasswordLength(password)) {
    return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
  }

  // Validar coincidencia
  if (!validatePasswordMatch(password, confirmPassword)) {
    return { ok: false, message: "Las contraseñas no coinciden." };
  }

  // Simula proceso de validación o registro externo
  await new Promise<void>((r) => setTimeout(r, 500));

  const user: User = {
    id: randomUUID(),
    username,
    role,
    password,
    email: generateEmail(role, username),
  };

  return { ok: true, data: user, message: "Registro exitoso" };
};

/**
 * Formatea los datos de un usuario para mostrar en consola o logs.
 *
 * @param u Usuario a formatear
 * @returns Cadena de texto con el formato `[role] username (email)`
 *
 * @example
 * ```ts
 * const u = { role: "admin", username: "carlos", email: "admin.carlos@email.com" };
 * console.log(formatUser(u)); // [admin] carlos (admin.carlos@gmail.com)
 * ```
 */
export const formatUser = (u: User): string =>
  `[${u.role}] ${u.username} (${u.email})`;