import type { Credentials } from "./types";
import { formatUser, login } from "./validate";

const candidatos: Credentials[] = [
  { username: "admin.carlos", password: "ContraseñaPermitida" },
  { username: "editor.jose", password: "ContraseñaPermitida" },
  { username: "viewer.ana", password: "ContraseñaPermitida" },
  { username: "colaborador.juan", password: "123" },
];

const main = async () => {
  for (const candidato of candidatos) {
    const res = await login(candidato);

    if (res.ok && res.data) console.log("[Usuario autentificado] : ", formatUser(res.data));
    else console.log("[Usuario no autentificado] : ", res.message);
  }
};

main();
