import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { iCase } from "../interfaces/case";
import { formatearFecha } from "../components/formatoFecha";
import Icons from "../components/icons";
import AlertDanger from "./alertDanger";
import { iUsuario } from "../interfaces/usuario";
import ApiBonita from "../apis/bonita/ApiBonita";
import { iListTackHumanUserId } from "../interfaces/listTackHumanUserId";
import { iListTaskHumanCompleteUser } from "../interfaces/listTaskHumanCompleteUser";
import { iListTaskHumanMyUser } from "../interfaces/listTaskHumanMyUser";
import apiGlpi from "../apis/glpi/ApiGlpi";

const ListaTareas = () => {
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

  type _iListTaskHumanMyUser = iListTaskHumanMyUser;
  type _iListTaskHumanCompleteUser = iListTaskHumanCompleteUser;
  type _listTackHumanUserId = iListTackHumanUserId;

  const [listTackHumanUserId, SetlistTackHumanUserId] = useState<
    _listTackHumanUserId[]
  >([]);
  const [listTaskHumanMyUser, setListTaskHumanMyUser] = useState<
    _iListTaskHumanMyUser[]
  >([]);

  const [listTaskHumanCompleteUser, setListTaskHumanCompleteUser] = useState<
    _iListTaskHumanCompleteUser[]
  >([]);

  type caseId = iCase;
  const [caseid, setCaseid] = useState<caseId[]>([]);
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);
  const [serviceLogin, setServiceLogin] = useState("");
  const navigate = useNavigate();

  const navigateTo = (routeUrl: string) => {
    const url = `/caso-detalle/?id=${routeUrl}`;
    navigate(url);
  };
  const getTaskHumanOpen = async (user_id: string) => {
    let userId = usuario.user_id;
    console.log({ userId });
    console.log("usuario", usuario);

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get("" + process.env.REACT_APP_LISTHUMANTASK + user_id)
      .then((resp) => {
        SetlistTackHumanUserId(resp.data);
        console.log(resp.data);
        if (resp.data.length == 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };
  const getTaskHumanCompleteUser = async (user_id: string) => {
    console.log({ user_id });
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get("" + process.env.REACT_APP_HUMANTASK_COMPLETE_USER + user_id)
      //.get("" + user_id)
      .then((resp) => {
        setListTaskHumanCompleteUser(resp.data);
        console.log("getTaskHumanCompleteUser", resp.data);
        if (resp.data.length == 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch((error: any) => {
        setShow(true);
        console.log(error);
      });
    return;
  };
  const getTaskHumanMyUser = async (user_id: string) => {
    console.log({ user_id });
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get("" + process.env.REACT_APP_HUMANTASK_MY_USER + user_id)
      .then((resp) => {
        setListTaskHumanMyUser(resp.data);
        console.log("getTaskHumanMyUser", resp.data);
        if (resp.data.length == 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch((error: any) => {
        setShow(true);
        console.log(error);
      });
    return;
  };
  //#region usuario activo
  const usuarioActivo = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        let result = resp;
        setUsuario(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };

  useEffect(() => {
    //let apiglpis = new apiGlpi();
    //apiglpis.loginGlpi();
    //usuarioActivo();
    //getTaskHumanMyUser(usuario.user_id);
    //getTaskHumanOpen(usuario.user_id);
  }, []);
  //#endregion

  //#endregion
  //#region ini

  //#endregion

  //#region alert
  const showAlert = (msjAlert: string, msj: string) => {
    if (show) {
      return <AlertDanger msj={msjAlert} />;
    } else {
      return <p>{msj}</p>;
    }
  };

  const tabTaskActive = (
    <div>
      <div
        className="tab-pane fade active show"
        id="tabTaskActive"
        role="tabpanel"
      >
        <div className="row">
          {" "}
          <div className="column"></div>
          <div className="column">
            <div className="row"></div>
            {showAlert(
              "NO encontramos Tareas por Hacer para el cliente logueado",
              "Estas son las Tareas por Hacer"
            )}
            {listTackHumanUserId.map((list) => (
              <div className="container">
                <div className="row shadow p-2 mb-3 bg-white rounded">
                  <div className="col-1">
                    <div> Id tarea </div>
                    <div>{list.id} </div>
                  </div>
                  <div className="col-2">
                    <div>Nombre tarea </div>
                    <div> {list.name}</div>
                  </div>
                  <div className="col-1">
                    <div>Caso </div>
                    <div> {list.caseId}</div>
                  </div>
                  <div className="col-2">
                    <div>Nombre Proceso </div>
                    <div> {list.rootContainerId.displayName}</div>
                  </div>
                  <div className="col-3">
                    {" "}
                    <div>Ultima actualizacion</div>
                    <div>{formatearFecha(list.last_update_date)} </div>
                  </div>
                  <div className="col-2">
                    {" "}
                    <div>Vencimiento</div>
                    <div>{formatearFecha(list.dueDate)} </div>
                  </div>
                  <div className="col-1">
                    <div>
                      <button
                        onClick={() => navigateTo(list.id)}
                        className="btn btn-outline-info btn-sm align-text-bottom"
                      >
                        {" "}
                        Ver{" "}
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabTaskMe = (
    <div>
      <div
        className="tab-pane fade active show"
        id="tabTaskComplete"
        role="tabpanel"
      >
        <div className="row">
          {" "}
          <div className="column"></div>
          <div className="column">
            <div className="row"></div>
            {showAlert(
              "NO encontramos Mis Tareas para el cliente logueado",
              "Estas son Mis Tareas"
            )}
            {listTaskHumanMyUser.map((listc) => (
              <div className="container">
                <div className="row shadow p-2 mb-3 bg-white rounded">
                  <div className="col-1">
                    <div> Id tarea </div>
                    <div>{listc.id} </div>
                  </div>
                  <div className="col-2">
                    <div>Nombre tarea </div>
                    <div> {listc.name}</div>
                  </div>
                  <div className="col-1">
                    <div>Caso </div>
                    <div> {listc.caseId}</div>
                  </div>
                  <div className="col-2">
                    <div>Nombre Proceso </div>
                    <div> {listc.rootContainerId.displayName}</div>
                  </div>
                  <div className="col-3">
                    {" "}
                    <div>Ultima actualizacion</div>
                    <div>{formatearFecha(listc.last_update_date)} </div>
                  </div>
                  <div className="col-2">
                    {" "}
                    <div>Vencimiento</div>
                    <div>{formatearFecha(listc.dueDate)} </div>
                  </div>
                  <div className="col-1">
                    <div>
                      <button
                        onClick={() => navigateTo(listc.id)}
                        className="btn btn-outline-info btn-sm align-text-bottom"
                      >
                        {" "}
                        Ver{" "}
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabTaskComplete = (
    <div>
      <div
        className="tab-pane fade active show"
        id="tabTaskComplete"
        role="tabpanel"
      >
        <div className="row">
          {" "}
          <div className="column"></div>
          <div className="column">
            <div className="row"></div>
            {showAlert(
              "NO encontramos Tareas Realizadas para el cliente logueado",
              "Estas son las Tareas Realizadas"
            )}
            {listTaskHumanCompleteUser.map((listc) => (
              <div className="container">
                <div className="row shadow p-2 mb-3 bg-white rounded">
                  <div className="col-1">
                    <div> Id tarea </div>
                    <div>{listc.id} </div>
                  </div>
                  <div className="col-2">
                    <div>Nombre tarea </div>
                    <div> {listc.name}</div>
                  </div>
                  <div className="col-1">
                    <div>Caso </div>
                    <div> {listc.caseId}</div>
                  </div>
                  <div className="col-2">
                    <div>Nombre Proceso </div>
                    <div> {listc.rootContainerId.displayName}</div>
                  </div>
                  <div className="col-3">
                    {" "}
                    <div>Ultima actualizacion</div>
                    <div>{formatearFecha(listc.last_update_date)} </div>
                  </div>
                  <div className="col-2">
                    {" "}
                    <div>Vencimiento</div>
                    <div>{formatearFecha(listc.dueDate)} </div>
                  </div>
                  <div className="col-1">
                    <div>
                      <button
                        onClick={() => navigateTo(listc.id)}
                        className="btn btn-outline-info btn-sm align-text-bottom"
                      >
                        {" "}
                        Ver{" "}
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tab1 = (
    <a
      className="nav-link active"
      data-bs-toggle="tab"
      href="#uno"
      aria-selected="true"
      role="tab"
      onClick={() => getTaskHumanOpen(usuario.user_id)}
    >
      Tareas por Hacer {listTackHumanUserId.length}
      {"  "} <Icons />
    </a>
  );
  const tab2 = (
    <a
      className="nav-link"
      data-bs-toggle="tab"
      href="#dos"
      aria-selected="false"
      role="tab"
      onClick={() => getTaskHumanMyUser(usuario.user_id)}
    >
      Mis tareas {listTaskHumanMyUser.length} <Icons />
    </a>
  );
  const tab3 = (
    <a
      className="nav-link"
      data-bs-toggle="tab"
      href="#tres"
      aria-selected="false"
      role="tab"
      onClick={() => getTaskHumanCompleteUser(usuario.user_id)}
      tabIndex={-1}
    >
      Tareas realizadas <Icons />
    </a>
  );
  //endregion

  return (
    <>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          {tab1}
        </li>
        <li className="nav-item" role="presentation">
          {tab2}
        </li>
        <li className="nav-item" role="presentation">
          {tab3}
        </li>
      </ul>
      <div id="myTabContent" className="tab-content">
        <div className="tab-pane fade active show" id="uno" role="tabpanel">
          {tabTaskActive}
        </div>
        <div className="tab-pane fade" id="dos" role="tabpanel">
          {tabTaskMe}
        </div>
        <div className="tab-pane fade" id="tres" role="tabpanel">
          {tabTaskComplete}
        </div>
      </div>
    </>
  );
};

export default ListaTareas;
