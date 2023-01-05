import { useContext, useEffect, useReducer, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import {
  BonitaLogOut,
  BonitaUsuarioActivo,
  BonitaUsuarioActivoContext,
} from "../../apis/bonita/ApiBonita";
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
  let { isReading, usuario, setUsuario } = useContext(UsuarioContext);
  //const SelectorUsuarioActivo = useSelector(
  //  (store: AppStore) => store.usuarioActivo
  //);
  //usamos useEffect para borrar el usuario acivo
  useEffect(() => {
    //const { user_name } = { ...SelectorUsuarioActivo };
    const bonitaUsuarioActivoContext = BonitaUsuarioActivoContext()
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data);
          usuario = resp.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    /*     let localStorageUsuario = JSON.stringify(
      window.localStorage.getItem("usuario")
    );
    localStorageUsuario?.includes("user_id");
  is_guest_user: localStorageUsuario?.split(",")[1].split(":").toString(),
      branding_version: localStorageUsuario
        ?.split(",")[4]
        .split(":")
        .toString(),*/
    const newUsuario: iUsuario = {
      copyright: "probando el contexto contexto",
      is_guest_user: usuario?.is_guest_user
        ? usuario?.is_guest_user
        : "is_guest_user",
      branding_version: usuario?.branding_version
        ? usuario?.branding_version
        : "",
      branding_version_with_date: usuario?.branding_version_with_date
        ? usuario?.branding_version_with_date
        : "",
      user_id: "",
      user_name: "",
      session_id: "",
      conf: "",
      is_technical_user: "",
      version: "",
    };

    //disparamos la accion "setMarkers"
    dispatch({ type: "setUsuario", payload: newUsuario });
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
