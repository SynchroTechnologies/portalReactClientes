import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { iUsuario } from "../interfaces/usuario";
import { createUser, resetUser } from "../redux/states/usuarioActivo.state";
import { AppStore } from "../redux/store";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  //const { login } = useLogin();
  //const { usuarioA } = usuarioActivo();
  if (!user) {
    console.log("if (!user):: NO user en localstore");
    return <Navigate to="/login" />;
  } else {
    console.log("else(!user):: user in localstore");
    return children;
  }
};
//function usuarioActivo(): { usuarioA: boolean } {
// eslint-disable-next-line react-hooks/rules-of-hooks
//const userState = useSelector((store: AppStore) => store.usuarioActivo);
// eslint-disable-next-line react-hooks/rules-of-hooks
//const dispatch = useDispatch();

//let isUserAct = false;
//}
//  const isUsuarios = async () => {
//axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
//axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
//axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
//axios.defaults.withCredentials = true;
//await axios
//  .get("" + process.env.REACT_APP_API_USERACTIVE)
//  .then((resp) => {
//    dispatch(createUser(resp.data));
//    console.log(resp.data);
//    isUserAct = true;
//  })
//  .catch((error) => {
//    console.log(error);
//    isUserAct = false;
//  });
//isUserAct = false;
//return { usuarioA: isUserAct };
//  };
//

//function useAuth(): { user: iUsuario } {
function useAuth(): { user: boolean } {
  const userState = useSelector((store: AppStore) => store.usuarioActivo);
  const dispatch = useDispatch();
  const usuario = window.localStorage.getItem("usuario")
    ? window.localStorage.getItem("usuario")
    : "";

  if (!usuario) {
    console.log("!usuario ::");
    dispatch(resetUser());
    return { user: false };
  } else {
    try {
      dispatch(createUser(usuario));
    } catch (error) {
      console.log("error : ", error);
    }

    //dispatch(createUser(usuario));
    console.log("dispatch(createUser(usuario)):", usuario);
    console.log("userState :", userState);
    return { user: true };
  }
}
function useLogin(): { login: boolean } {
  const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
  console.log("X_Bonita_API_Token : ", X_Bonita_API_Token);

  if (X_Bonita_API_Token != "") {
    return { login: false };
  } else {
    return { login: true };
  }
}
