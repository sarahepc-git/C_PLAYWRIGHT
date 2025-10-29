import type { Register } from "./registerTypes";
import { formatUser, registerUser } from "./registerValidate";

/**
 * Función principal: orquesta el flujo de registro y muestra los resultados.
 *
 * @example
 * ```ts
 * main();
 * ```
 */
const main = async () => {
  const candidates: Register[] = [
    { username: "Joel", password: "123456", confirmPassword: "123456", role: "admin" },
    { username: "Kathy", password: "abcdef", confirmPassword: "abc123", role: "editor" },
    { username: "Frank", password: "123", confirmPassword: "123", role: "viewer" },
    { username: "Christian", password: "123456", confirmPassword: "123456", role: "viewer" }
  ];

  for (const c of candidates) {
    const res = await registerUser(c);
    if (res.ok && res.data) {
      console.log("✅ Registro exitoso:", formatUser(res.data));
    } else {
      console.log("❌ Error:", c.username, "-", res.message);
    }
  }
};

main();