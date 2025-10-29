// playground/tarea1/index.ts
import { register } from "./registerValidate";
import { Register } from "./registerType";

/**
 * Ejecuta una demostración simple de registros de usuario y
 * muestra los resultados en consola.
 */
async function main() {
  const cases: Register[] = [
    // Caso exitoso
    { username: "Jose", password: "123456", confirmPassword: "123456", role: "admin" },

    // Falla por longitud < 6
    { username: "Valeria", password: "1234", confirmPassword: "1234", role: "editor" },

    // Falla por no coincidir
    { username: "Henry", password: "abcdef", confirmPassword: "abcdeg", role: "viewer" },
  ];

  for (const data of cases) {
    const result = await register(data);
    if (result.ok) {
      console.log("[OK]", {
        id: result.data!.id,
        username: result.data!.username,
        role: result.data!.role,
        email: result.data!.email,
      });
    } else {
      console.log("[ERROR]", { username: data.username, message: result.message });
    }
  }
}

main().catch((e) => {
  console.error("Error en la ejecución:", e);
  process.exit(1);
});