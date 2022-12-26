import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer,
} from "react";

import { IGlpilogin } from "../interfaces/gLpi/login";
import { useNavigate, Link } from "react-router-dom";
import { iUsuario } from "../interfaces/bonita/usuario";
//import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
//import "bootswatch/dist/js/bootstrap";
import "../../src/style/bootswatch/dist/journal/bootstrapDev.css";
import "../../src/style/bootswatch/dist/js/bootstrap";
import { UsuarioContext } from "../context/usuarioContext";
import AlertDanger from "../screean/alertDanger";
import store, { AppStore } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  createUser,
  modifyUser,
  resetUser,
} from "../redux/states/usuarioActivo.state";
import {
  Glpi_Login,
  Glpi_LogOut,
  Glpi_GetTicket,
  Glpi_GetMyEnties,
  Glpi_Login2,
} from "../apis/glpi/public.service";
import { UseLocalStorage } from "../auth/useLocalStorage";
import {
  createSessionToken,
  resetSessionToken,
} from "../redux/states/sessionTokenGlpi.state";
import {
  managenSessionTokenState,
  persistSessionToken,
} from "../apis/glpi/persist.data.service";
import {
  BonitaLoginAxios,
  BonitaUsuarioActivo,
} from "../apis/bonita/ApiBonita";
import { managenUsuarioState } from "../apis/bonita/persist.data.service";
import apiGlpi from "../apis/glpi/ApiGlpi";

function Login() {
  const userState = useSelector((store: AppStore) => store.usuarioActivo);

  const sessionTokenGlpiSliceState = useSelector(
    (store: AppStore) => store.sessionTokenGlpiSlice
  );
  const dispatch = useDispatch();

  const { user_id } = useContext(UsuarioContext);
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [show, setShow] = useState(false);
  const [glpiSssion_token, SetGlpiSssion_token] = useState({});

  let title = React.createRef();
  let refUsuario = useRef(null);
  type iUarioActivo = iUsuario;

  const [bredirect, setBredirect] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [serviceLogin, setServiceLogin] = useState("");
  let iUarioActivo: iUsuario = {
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
  const [usuario, setUsuario] = useState<iUsuario>();

  const [initSession, SetInitSession] = useState("");
  //#region

  //#region Login
  const [visibilidad, setVisibilidad] = useState(false);

  /*onClick = {() => navigateTo(routeUrl)
}
  const navigate = useNavigate();
  const navigateTo = (routeUrl: string) => {
    const url = `/${routeUrl}`;
    navigate(url);
  };*/

  const fetchLoginService = async () => {
    console.log("fetchLoginService");
    let bonitaLoginAxios = await BonitaLoginAxios(inputUsuario, inputPass);
    console.log({ bonitaLoginAxios });

    setShow(false);
    //let bonitaLoginAxios = await BonitaLoginAxios(inputUsuario, inputPass);
    //console.log({ bredirect }, { bonitaLoginAxios });
    console.log({ bonitaLoginAxios });

    if (bonitaLoginAxios) {
      const login = await usuarioActivo();
      console.log({ login });

      const bonitaUsuarioActivo = await BonitaUsuarioActivo();

      if (bonitaUsuarioActivo.status === 200) {
        navigateTo("home");
        /* console.log({ bonitaLoginAxios });
        data = bonitaUsuarioActivo.data;
        await dispatch(createUser(bonitaUsuarioActivo.data));
        await managenUsuarioState(bonitaUsuarioActivo.data);
        bonitaLoginAxios = true;
        console.log({ bonitaLoginAxios });*/
      } else {
        console.log("bonitaLoginAxios", { bonitaLoginAxios });
        bonitaLoginAxios = false;
        setShow(true);
      }
    }

    /*console.log({ bonitaLoginAxios });
    if (bonitaLoginAxios) {
      console.log({ bonitaLoginAxios });
      navigateTo("home");
    } else {
      setShow(true);
    }*/
    //login glpi
    //console.log({ bonitaLoginAxios });

    /*console.log("const apiglpis = new apiGlpi()");
        const apiglpis = new apiGlpi();

        console.log("const apiglpis = new apiGlpi()");
        apiglpis.loginGlpi();

        console.log("const apiglpis = new apiGlpi()");
        console.log(window.localStorage.getitem("glpiSssion_token"));
        if (window.localStorage.getitem("glpiSssion_token")) {
          console.log("const apiglpis = new apiGlpi()");
          await dispatch(createSessionToken({}));
          const tokenglpi: IGlpilogin = {
            session_token: "",
          };
          await managenSessionTokenState(tokenglpi);
          bonitaLoginAxios = true;
        } else {
          bonitaLoginAxios = false;
          console.log({ bonitaLoginAxios });
        }*/
  };

  const usuarioActivo = async () => {
    let login = false;
    await BonitaUsuarioActivo()
      .then((resp) => {
        if (resp.status === 200) {
          login = true;
          setUsuario(resp.data);
          console.log(resp.data);
        } else {
          login = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return login;
  };

  const loginFetchGlpi = async () => {
    // const lglpi = await loginGlpi;
    await glpiloginfech();
    //console.log(lglpi);
    //loginFechToBonita(username, password);
    async function glpiloginfech() {
      const appToken = process.env.REACT_APP_GLPI_TOKEN;
      const authorization = process.env.REACT_APP_GLPI_AUTHORIZATION;
      let myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "'user_token' Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ"
      );
      myHeaders.append("App-Token", "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA");
      const RequestInit: RequestInit = {
        method: "GET",
        headers: {
          Authorization:
            "'user_token' Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ",
          "App-Token": "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA",
          Connection: "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
          Accept: "*/*",
          "User-Agent": "PostmanRuntime/7.29.0",
          Host: "<calculated when request is sent>",
        },
        redirect: "follow",
      };
      RequestInit.method = "GET";
      console.log(JSON.stringify(RequestInit.headers));
      //console.log(JSON.stringify(RequestInit));
      //"https://glpi.apps.synchro.com.ar/apirest.php/initSession",
      await fetch(
        "" +
          process.env.REACT_APP_BASE_URL_API_GLPI +
          process.env.REACT_APP_GLPI_LOGIN,

        RequestInit
      )
        .then((response) => response.text())
        .then((result) => {
          console.log("result :", result);
          SetInitSession(result);
          dispatch(createSessionToken(result));
          console.log("SetInitSession:: ", initSession);
          window.localStorage.setItem("initSession", JSON.stringify(result));
        })
        .catch((error) => {
          console.log("error:: ", error);
          dispatch(resetSessionToken());
          window.localStorage.removeItem("initSession");
        });
    }
  };
  //#endregion

  const showAlert = (msjAlert: string, msj: string) => {
    if (show) {
      return <AlertDanger msj={msjAlert} />;
    } else {
      return <p>{msj}</p>;
    }
  };
  const navigate = useNavigate();

  const navigateTo = (routeUrl: string) => {
    const url = `/${routeUrl}`;
    navigate(url);
  };

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle ">
        {" "}
        <div className="login-container ">
          {" "}
          <div className="">
            {" "}
            <div className=" shadow p-2 mb-3 bg-secundary ">
              <div className="card text-white bg-primary mb-3">
                {showAlert("NO hemos logrado identificarte", "")}
                <div className="card-header">Portal </div>
                <div className="card-body">
                  <h4 className="card-title">Login</h4>
                  <div className="">
                    <form>
                      <fieldset>
                        <div className="form-group">
                          <label className="form-label mt-4">Usuario</label>
                          <input
                            type="text"
                            className="form-control"
                            id="usuario"
                            placeholder="Usuario"
                            autoComplete="off"
                            onChange={(e) => setInputUsuario(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label mt-4">Contraseña</label>
                          <input
                            itemID="password"
                            type="password"
                            className="form-control"
                            id="password"
                            autoComplete="off"
                            placeholder="Contraseña"
                            onChange={(e) => setInputPass(e.target.value)}
                          />
                        </div>

                        <div className="form-group ">
                          <h4 className="card-title"></h4>
                          {/*<button
                            className="btn btn-succes"
                            onClick={() => fetchLoginService()}
                          >
                            Ingresar
                          </button>

                          <button
                            className="btn btn-succes"
                            onClick={fetchLoginService}
                          >
                            fetchLoginService
                          </button>{visibilidad ? <ButtonComponent /> : null}

                          <button
                            className="btn btn-succes"
                            onClick={traercomponente}
                          >
                            traer componente
                          </button>*/}
                          {/*    
                          <label className="form-label mt-4"></label>
                                                <button
                            className="btn btn-succes"
                            onClick={fetchLoginService}
                          >
                            Ingresar
                          </button>*/}
                        </div>
                      </fieldset>
                    </form>
                    <button
                      className="btn btn-succes"
                      onClick={() => fetchLoginService()}
                    >
                      Ingresar
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>{" "}
        </div>
      </div>

      {/*<LoginFc />*/}
    </>
  );
}

export default Login;

//const {
//  register,
//  handleSubmit,
//  formState: { errors },
//} = useForm({ defaultvalues: { email: "", pass: "" } });
