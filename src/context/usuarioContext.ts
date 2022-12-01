import { createContext } from "react";

import { iUsuario } from "../interfaces/usuario";

export interface usuario {
  copyright: string;
  is_guest_user: string;
  branding_version: string;
  branding_version_with_date: string;
  user_id: string;
  user_name: string;
  session_id: string;
  conf: string;
  is_technical_user: string;
  version: string;
}

export const UsuarioContext = createContext<iUsuario>({} as iUsuario);
