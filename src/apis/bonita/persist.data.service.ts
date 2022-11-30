import { useState } from "react";
import { IGlpilogin } from "../../interfaces/gLpi/login";
import { iUsuario } from "../../interfaces/usuario";

//#region Login
export const persistUsuarioState = (usuarioActivo: iUsuario) => {
  type iUarioActivo = iUsuario;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [usuario, setUsuario] = useState<iUarioActivo>(usuarioActivo);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [initSession, SetInitSession] = useState("");
  window.localStorage.setItem("usuario", JSON.stringify({ ...usuarioActivo }));

  window.localStorage.setItem(
    "persistUsuarioState",
    JSON.stringify({ ...usuario })
  );
};
export const clearUsuario = () => {
  window.localStorage.removeItem("usuario");
};

export const managenUsuarioState = (usuario: iUsuario) => {
  persistUsuarioState(usuario);
};

//#endregion
