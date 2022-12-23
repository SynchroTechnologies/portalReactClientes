/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

//import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
//import "bootswatch/dist/js/bootstrap";
import "../../src/style/bootswatch/dist/journal/bootstrapDev.css";
import "../../src/style/bootswatch/dist/js/bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { createUser, resetUser } from "../redux/states/usuarioActivo.state";
import {
  BonitaLoginAxios,
  BonitaLogOut,
  BonitaUsuarioActivo,
} from "../apis/bonita/ApiBonita";
import { managenUsuarioState } from "../apis/bonita/persist.data.service";

function NavBar() {
  const localStorageUsuario = window.localStorage.getItem("usuario");
  const userName = localStorageUsuario?.split(",")[5].split(":")[1];

  const [initSession, SetInitSession] = useState("");
  const dispatch = useDispatch();
  const [serviceLogin, setServiceLogin] = useState("");
  //let [usuario, setUsuario] = useState<iUarioActivo>();

  let [usuario, setUsuario] = useState({});

  //#region Login

  const fetchLoginService = async () => {
    let bonitaLoginAxios = await BonitaLoginAxios("walter.bates", "bpm");
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
  };

  //#endregion

  //#region logout
  const loginOut = async () => {
    await BonitaLogOut();
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
          //dispatch(createSessionToken(result));
          console.log("SetInitSession:: ", initSession);
          window.localStorage.setItem("initSession", JSON.stringify(result));
        })
        .catch((error) => {
          console.log("error:: ", error);
          // dispatch(resetSessionToken());
          window.localStorage.removeItem("initSession");
        });
    }
  };

  //#endregion

  //#region usuario activo
  const usuarioActivo = async () => {
    console.log("await BonitaUsuarioActivo");
    const bonitaUsuarioActivo = await BonitaUsuarioActivo();
    console.log("await BonitaUsuarioActivo");
    if (bonitaUsuarioActivo.status === 200) {
      await dispatch(createUser(bonitaUsuarioActivo.data));
      await managenUsuarioState(bonitaUsuarioActivo.data);
      setUsuario(bonitaUsuarioActivo.data);
      setServiceLogin("Login Success " + bonitaUsuarioActivo.data.status);
    } else {
      setServiceLogin("Login No Success");
      console.log("await BonitaUsuarioActivo");
    }
    return;
  };
  useEffect(() => {
    //usuarioActivo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Portal
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/home">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Tareas
                </a>
                <div className="dropdown-menu" id="usuario">
                  <a className="dropdown-item" href="/tareas">
                    Todas las tareas
                  </a>

                  <div>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item dropdown-toggle" href="">
                        Buscar tarea
                      </a>
                      <ul className="dropdown-menu">
                        <li className="dropdown-submenu">
                          <a className="dropdown-item dropdown-toggle" href="#">
                            Abiertos
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="/caso-id">
                                Por id
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="/case-nombre-proceso"
                              >
                                Por proceso
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="dropdown-submenu">
                          <a className="dropdown-item dropdown-toggle" href="#">
                            Cerradas
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                href="/casearchivedbyid"
                              >
                                Por id
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="/caso-archivado-nombre-proceso"
                              >
                                Por Proceso
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </div>

                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Ayuda
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Casos
                </a>
                <div className="dropdown-menu" id="usuario">
                  <a className="dropdown-item" href="/app">
                    Todos los casos
                  </a>

                  <div>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item dropdown-toggle" href="">
                        Buscar
                      </a>
                      <ul className="dropdown-menu">
                        <li className="dropdown-submenu">
                          <a className="dropdown-item dropdown-toggle" href="#">
                            Abiertos
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="/caso-id">
                                Por id
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="/case-nombre-proceso"
                              >
                                Por proceso
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="dropdown-submenu">
                          <a className="dropdown-item dropdown-toggle" href="#">
                            Archivados
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                href="/casearchivedbyid"
                              >
                                Por id
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="/caso-archivado-nombre-proceso"
                              >
                                Por Proceso
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </div>

                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Ayuda
                  </a>
                </div>
              </li>
              <li className="nav-item" onClick={() => usuarioActivo()}>
                <a className="nav-link" href="#">
                  Usuario activo
                </a>
              </li>
              <li className="nav-item" onClick={loginOut}>
                <a className="nav-link" href="/">
                  LogOut
                </a>
              </li>
              <li className="nav-item" onClick={loginFetchGlpi}>
                <a className="nav-link" href="#">
                  login glpi
                </a>
              </li>

              <h6 className="text-succes">{userName}</h6>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
