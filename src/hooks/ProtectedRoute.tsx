import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { createUser, resetUser } from "../redux/states/usuarioActivo.state";
import { AppStore } from "../redux/store";
import { createSessionToken } from "../redux/states/sessionTokenGlpi.state";
import { useState } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  //const [isLogged, setIsLogged] = useState(false);

  const navigateTo = (routeUrl: string) => {
    const url = `/${routeUrl}`;
    navigate(url);
  };
  let user = useAuth();
  //const { login } = useLogin();
  //const { usuarioA } = usuarioActivo();
  //setIsLogged(user.user);
  console.log({ user });
  if (!user.user) {
    // navigateTo();
    ///<Route path="/login" element={<Login />} />;
    ///return <Navigate to="/login" />;
    return <Navigate to="/login" />;
  } else {
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
  //const userState = useSelector((store: AppStore) => store.usuarioActivo);
  //console.log("useAuth():", JSON.stringify(userState));
  //const dispatch = useDispatch();
  const usuario = window.localStorage.getItem("usuariousuario")
    ? window.localStorage.getItem("usuariousuario")
    : "usuariousuario";
  const BonitaLoginAxios = window.localStorage.getItem("BonitaLoginAxios")
    ? window.localStorage.getItem("BonitaLoginAxios")
    : "";
  /* const glpiSssion_token = window.localStorage.getItem("glpiSssion_token")
    ? window.localStorage.getItem("glpiSssion_token")
    : "";*/
  //if (!usuario || !glpiSssion_token) {
  if (BonitaLoginAxios !== "204") {
    console.log("BonitaLoginAxios !== 204");
    return { user: false };
  } else {
    console.log("BonitaLoginAxios === 204");
    return { user: true };
  }
}
