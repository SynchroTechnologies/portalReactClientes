import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { createUser, resetUser } from "../redux/states/usuarioActivo.state";
import { AppStore } from "../redux/store";
import { createSessionToken } from "../redux/states/sessionTokenGlpi.state";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  let user = useAuth();
  //const { login } = useLogin();
  //const { usuarioA } = usuarioActivo();
  if (!user) {
    console.log("if (!user):: NO user en localstore");

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
  const userState = useSelector((store: AppStore) => store.usuarioActivo);
  //console.log("useAuth():", JSON.stringify(userState));
  const dispatch = useDispatch();
  const usuario = window.localStorage.getItem("usuario")
    ? window.localStorage.getItem("usuario")
    : "";
  const glpiSssion_token = window.localStorage.getItem("glpiSssion_token")
    ? window.localStorage.getItem("glpiSssion_token")
    : "";
  //if (!usuario || !glpiSssion_token) {
  if (!usuario) {
    return { user: false };
  } else {
    return { user: true };
    /*try {
      dispatch(createUser(usuario));
      //dispatch(createSessionToken(glpiSssion_token));
    } catch (error) {
      console.log("error : ", error);
    }
    return { user: true };*/
  }
}
