import { createContext } from "react";
import { iUsuario } from "../../interfaces/bonita/usuario";

//definimos la interfaz con las propiedades de contexto de usuario
interface UsuarioContextProps {
  isReading: boolean;
  usuario?: iUsuario;
  //lo incorporamos a las props para que se pueda usar en el context
  setUsuario: (usuario: iUsuario) => void;

  getSample: (start: [number, number], end: [number, number]) => Promise<void>;
}

export const UsuarioContext = createContext({} as UsuarioContextProps);
