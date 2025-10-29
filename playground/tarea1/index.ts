import { Register, Result, User } from "./registerTypes";
import { validacionRegistro } from "./registerValidate";

/**
 * Registra un usuario.
 *
 * **Detalles**
 *
 * Orquesta el flujo de validación y creación del usuario, devolviendo el resultado final.
 *
 * @param data Datos de registro `{ username, password, confirmPassword, role }`.
 * @returns { ok:true, data:User } si el registro fue exitoso, o { ok:false, message:string } si falló.
 * @example
 * const r = registroUsuario({
 *   username: "roberto",
 *   password: "123abc",
 *   confirmPassword: "123abc",
 *   role: "admin"
 * });
 * console.log(r);
 */
export function registroUsuario(data: Register): Result<User> {
  const validation = validacionRegistro(data);

  if (!validation.ok) {
    return {
      ok: false,
      message: validation.message,
    };
  }

  const { username, role, email } = validation.data!;

  const user: User = {
    id: crypto.randomUUID(),
    username,
    role,
    password: data.password,
    email,
  };

  return {
    ok: true,
    data: user,
    message: "Usuario registrado correctamente.",
  };
}

/**
 * Función principal de la aplicación.
 *
 * **Detalles**
 *
 * Ejecuta flujos de registro, validaciones fallidas y muestra los resultados en consola.
 *
 */
function main() {
  const casos: Register[] = [
    {
      username: "Sarah",
      password: "abc123",
      confirmPassword: "abc123",
      role: "admin",
    },
    {
      username: "Morelia",
      password: "secure456",
      confirmPassword: "secure456",
      role: "editor",
    },
    {
      username: "Flor",
      password: "pass789",
      confirmPassword: "pass789",
      role: "viewer",
    },
    // ❌ Caso contraseña demasiado corta
    {
      username: "Juan",
      password: "1234",
      confirmPassword: "1234",
      role: "editor",
    },
    // ❌ Caso contraseña no coincide
    {
      username: "Roberto",
      password: "abc123",
      confirmPassword: "abc321",
      role: "viewer",
    },
  ];

  console.log("=== RESULTADOS DE REGISTRO ===\n");

  casos.forEach((caso, index) => {
    const result = registroUsuario(caso);
    console.log(`Caso ${index + 1}`);
    console.log(JSON.stringify(result, null, 2));
    console.log("-----------------------------");
  });
}

main();
