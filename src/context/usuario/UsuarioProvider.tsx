import { useContext, useEffect, useReducer, useState } from "react";

import { BonitaLogOut, BonitaUsuarioActivo } from "../../apis/bonita/ApiBonita";
import { iUsuario } from "../../interfaces/bonita/usuario";
import { UsuarioContext } from "./UsuarioContext";
import { usuarioReducer } from "./usuarioReduce";

export interface UsuarioState {
  isReading: boolean;
  usuario?: iUsuario;
}
const INITIAL_STATE: UsuarioState = {
  isReading: false,
  usuario: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const UsuarioProvider = ({ children }: Props) => {
  //comparto o proveeo al resto de la aplicacion  los state y funciones que necesito
  const [state, dispatch] = useReducer(usuarioReducer, INITIAL_STATE);
  //obtenemos del usuarioContext el usuario activo
  const { isReading, usuario, setUsuario } = useContext(UsuarioContext);

  //usamos useEffect para borrar el usuario acivo
  useEffect(() => {
    const nusuario: iUsuario = {
      copyright: "",
      is_guest_user: "",
      branding_version: "",
      branding_version_with_date: "",
      user_id: "",
      user_name: "",
      session_id: "",
      conf: "",
      is_technical_user: "",
      version: "",
    };

    //disparamos la accion "setMarkers"
    dispatch({ type: "setUsuario", payload: nusuario });
  }, []);

  const getUsuario = (usuario: iUsuario) => {
    //disparamos la accion con el usuario seteado
    BonitaUsuarioActivo();
    dispatch({ type: "setUsuario", payload: usuario });
  };

  const getLogoutBonita = async () => {
    await BonitaLogOut();
  };
  console.log(getLogoutBonita);

  const getSample = async (
    start: [number, number],
    end: [number, number]
  ) => {};

  return (
    <UsuarioContext.Provider value={{ ...state, setUsuario, getSample }}>
      {children}
    </UsuarioContext.Provider>
  );
};
