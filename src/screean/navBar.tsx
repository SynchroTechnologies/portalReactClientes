/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";

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
import { UsuarioContext } from "../context/usuario/UsuarioContext";

function NavBar() {
  const SelectorUsuarioActivo = useSelector(
    (store: AppStore) => store.usuarioActivo
  );
  const { user_name, user_id } = { ...SelectorUsuarioActivo };
  const { isReading, usuario } = useContext(UsuarioContext);
  const localStorageUsuario = window.localStorage.getItem("usuario");
  const userName = localStorageUsuario?.split(",")[5].split(":")[1];

  const dispatch = useDispatch();
  const [serviceLogin, setServiceLogin] = useState("");
  //let [usuario, setUsuario] = useState<iUarioActivo>();

  let [user, setUser] = useState({});
  console.log(usuario);
  console.log(user_name, user_id);
  //#region Login

  const fetchLoginService = async () => {
    let bonitaLoginAxios = await BonitaLoginAxios("walter.bates", "bpm");
    if (bonitaLoginAxios) {
      const bonitaUsuarioActivo = await BonitaUsuarioActivo();
      if (bonitaUsuarioActivo.status === 200) {
        console.log({ bonitaLoginAxios });
        //await dispatch(createUser(bonitaUsuarioActivo.data));
        //await managenUsuarioState(bonitaUsuarioActivo.data);
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

  //#endregion

  //#region usuario activo
  const usuarioActivo = async () => {
    console.log("await BonitaUsuarioActivo");
    const bonitaUsuarioActivo = await BonitaUsuarioActivo();
    console.log("await BonitaUsuarioActivo");
    if (bonitaUsuarioActivo.status === 200) {
      await dispatch(createUser(bonitaUsuarioActivo.data));
      //await managenUsuarioState(bonitaUsuarioActivo.data);
      setUser(bonitaUsuarioActivo.data);
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
                                href="/caso-nombre-proceso"
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
                                href="/caso-archivado-por-id"
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
                                href="/caso-nombre-proceso"
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
                                href="/caso-archivado-por-id"
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
              <li className="nav-item" onClick={fetchLoginService}>
                <a className="nav-link" href="#">
                  Login
                </a>
              </li>
              <li className="nav-item" onClick={loginOut}>
                <a className="nav-link" href="/">
                  LogOut
                </a>
              </li>
              <li className="nav-item">
                <h6 className="text-succes">{user_name}</h6>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
