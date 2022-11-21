import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { iUsuario } from "../interfaces/usuario";
import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
import "bootswatch/dist/js/bootstrap";
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
import { persistSessionToken } from "../apis/glpi/persist.data.service";
import { AxiosResponse } from "axios";
import {
  BonitaLoginAxios,
  BonitaUsuarioActivo,
} from "../apis/bonita/ApiBonita";
import { managenUsuarioState } from "../apis/bonita/persist.data.service";

function Login() {
  const userState = useSelector((store: AppStore) => store.usuarioActivo);

  const sessionTokenGlpiSliceState = useSelector(
    (store: AppStore) => store.sessionTokenGlpiSlice
  );
  const dispatch = useDispatch();
  //const {
  //  register,
  //  handleSubmit,
  //  formState: { errors },
  //} = useForm({ defaultvalues: { email: "", pass: "" } });

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
  const [usuario, setUsuario] = useState<iUarioActivo>();

  const [initSession, SetInitSession] = useState("");
  //#region

  //#region Login
  const [visibilidad, setVisibilidad] = useState(false);
  const traercomponente = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(visibilidad);
    setVisibilidad(!visibilidad);
    console.log(visibilidad);
  };

  const fetchLoginService = async () => {
    setShow(false);
    let bonitaLoginAxios = await BonitaLoginAxios(inputUsuario, inputPass);
    console.log({ bredirect }, { bonitaLoginAxios });
    if (bonitaLoginAxios) {
      const bonitaUsuarioActivo = await BonitaUsuarioActivo();
      if (bonitaUsuarioActivo.status === 200) {
        console.log({ bonitaLoginAxios });
        await dispatch(createUser(bonitaUsuarioActivo.data));
        await managenUsuarioState(bonitaUsuarioActivo.data);
      } else {
        console.log({ bonitaLoginAxios });
        bonitaLoginAxios = false;
      }
    }

    if (bonitaLoginAxios) {
      return navigateTo("home");
    } else {
      setShow(true);
    }
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
                          <button
                            className="btn btn-succes"
                            onClick={fetchLoginService}
                          >
                            Ingresar
                          </button>

                          {/*<button
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
