import { iUsuario } from "../../interfaces/bonita/usuario";
import { UsuarioState } from "./UsuarioProvider";

type UsuarioAction = { type: "setUsuario"; payload: iUsuario };
/*| {
      type: "setUsuarios";
      payload: iUsuario[];
    };*/

export const usuarioReducer = (
  state: UsuarioState,
  action: UsuarioAction
): UsuarioState => {
  switch (action.type) {
    case "setUsuario":
      return {
        ...state,
        isReading: true,
        usuario: action.payload,
      };
    default:
      return state;
  }
};
