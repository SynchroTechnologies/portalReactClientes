import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { iListCaseForClient } from "../interfaces/listCaseClient";
import { iCase } from "../interfaces/case";
import { formatearFecha } from "../components/formatoFecha";
import Icons from "../components/icons";
import AlertDanger from "./alertDanger";
import { iUsuario } from "../interfaces/usuario";
import {
  BonitaCaseList,
  BonitaUsuarioActivo,
  BonitaArchivedActivityList,
  BonitaCaseForId,
  BonitaGetHumeanTaskUserCase,
  BonitaGetHumeanTaskUser,
} from "../apis/bonita/ApiBonita";

const Lista = () => {
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
  const localStorageUsuario = window.localStorage.getItem("usuario");
  let user_id = localStorageUsuario?.split(",")[4].split(":");
  const sll = localStorageUsuario?.includes("user_id");

  type listCaseForClient = iListCaseForClient;
  //usamos listCaseForClient para setArchivedCaseList y
  //tambien para setCaseList por que son los mismo atributos
  const [archivedCaseList, setArchivedCaseList] = useState<listCaseForClient[]>(
    []
  );
  const [caseList, setCaseList] = useState<listCaseForClient[]>([]);
  type caseId = iCase;
  const [caseid, setCaseid] = useState<caseId[]>([]);
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);

  const [cantTask, setCantTask] = useState(0);
  //useEffect(() => {
  //  //obtenerCaseList("4");
  //  //caseForId;
  //  // fetchComments();
  //}, [caseList, caseid]);
  const navigate = useNavigate();

  const navigateTo = (routeUrl: string) => {
    const url = `/caso-detalle/?id=${routeUrl}`;
    navigate(url);
  };
  const obtenerCaseList = async (user_id: string) => {
    //await usuarioActivo();
    BonitaCaseList(user_id)
      .then((resp) => {
        setCaseList(resp.data);
        if (resp.data.length === 0) {
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
    // getHumeanTaskUserCase(user_id, list.id);
    return;
    /*console.log("usuario", usuario);
    console.log("serviceLogin", serviceLogin);

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    console.log(usuario.user_id);
    await axios
      .get(
        "/bonita/portal/resource/app/userAppBonita/case-list/API/bpm/case?c=20&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=" +
          usuario.user_id +
          "&n=activeFlowNodes&n=failedFlowNodes&t=0&o=startDate+DESC"
      )
      .then((resp) => {
        let result = resp;
        setCaseList(result.data);
        console.log(result.data);
        if (result.data.length === 0) {
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

    console.log(usuario);
    console.log(usuario.user_id);
    return;*/
  };
  //#region usuario activo
  const usuarioActivo = async () => {
    await BonitaUsuarioActivo()
      .then((resp) => {
        setUsuario(resp.data);
        window.localStorage.setItem("usuario", JSON.stringify(resp.data));
        window.localStorage.setItem(
          "usuariousuario",
          JSON.stringify(resp.data)
        );
      })
      .catch((error) => {
        window.localStorage.removeItem("usuario");
        console.log(error);
      });
    return;
    /* axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        let result = resp;
        setUsuario(result.data);
        ////let rr = jsonConvert.deserializeObject(result.data, rs);
        console.log(
          "usuario.user_id"
          //usuario ? usuario.user_id : "sin usuario.user_id"
        );
        setServiceLogin(
          "Login Success "
          //+ (usuario ? usuario.user_name : "sin datos")
        );

        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return;*/
  };
  const cantTasks = (user_id: string, caso_id: string) => {
    getHumeanTaskUserCase(user_id, caso_id);
    return cantTask;
  };
  const getHumeanTaskUserCase = async (user_id: string, caso_id: string) => {
    let cet = await BonitaGetHumeanTaskUserCase(user_id, caso_id);
    console.log(usuario, caso_id);
    setCantTask(cet);
    return cet;
  };
  const getHumeanTaskUser = async (user_id: string) => {
    let cet = await BonitaGetHumeanTaskUser(user_id);
    console.log(usuario);
    setCantTask(cet);
    return cet;
  };

  const tareaPorCase = async (user_id: string, caso_id: string) => {
    //await usuarioActivo();
    let userId = usuario.user_id;
    console.log({ userId });
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(
        "/bonita/API/bpm/humanTask?p=0&c=50&f=state=ready&f=user_id=" +
          userId +
          "&f=caseId=31005"
      )
      .then((resp) => {
        let result = resp;
        console.log("result.data :", result.data);
        console.log("result.data.length :", result.data.length);
        if (result.data.length === 0) {
          console.log("lista vacia");
        } else {
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };
  useEffect(() => {
    usuarioActivo();
    //tareaPorCase(usuario.user_id);
  }, []);

  useEffect(() => {
    getHumeanTaskUser(usuario.user_id);
    //tareaPorCase(usuario.user_id);
  }, [usuario]);
  //#endregion

  //#region obtenerArchivedActivity
  const obtenerArchivedActivity = async () => {
    BonitaArchivedActivityList(usuario.user_id)
      .then((resp) => {
        let result = resp;
        setArchivedCaseList(result.data);
        console.log("setArchivedCaseList", result.data);
        if (result.data.length === 0) {
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
  //#endregion
  //#region caseForId
  const caseForId = async (id: string) => {
    BonitaCaseForId(id)
      .then((resp) => {
        setCaseid(resp.data);
        console.log("setCaseId", caseid);
        if (resp.data.length === 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
        setCaseid(resp.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
    /*axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(process.env.REACT_APP_GET_CASEFORID + id)
      .then((resp) => {
        let result = resp;
        setCaseid(result.data);
        console.log("setCaseId", caseid);
        if (result.data.length == 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
        setCaseid(result.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;*/
  };
  //#endregion

  //#region alert
  const showAlert = (msjAlert: string, msj: string) => {
    if (show) {
      return <AlertDanger msj={msjAlert} />;
    } else {
      return <p>{msj}</p>;
    }

    /*{
      return (
        show && (
          <AlertDanger msj={"NO encontramos casos para el cliente logueado"} />
        )
      );
    }*/
  };
  //endregion

  return (
    <>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#home"
            aria-selected="true"
            role="tab"
            onClick={() => obtenerCaseList(usuario.user_id)}
          >
            Casos abiertos <Icons />
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#profile"
            aria-selected="false"
            role="tab"
            onClick={obtenerArchivedActivity}
            tabIndex={-1}
          >
            Casos archivados <Icons />
          </a>
        </li>
      </ul>
      <div id="myTabContent" className="tab-content">
        <div className="tab-pane fade active show" id="home" role="tabpanel">
          <div className="row">
            {" "}
            <div className="column"></div>
            <div className="column">
              <div className="row"></div>
              {showAlert(
                "NO encontramos casos para el cliente logueado",
                "Estos son los casos abiertos"
              )}
              {caseList.map((list) => (
                <div className="container">
                  <div className="row shadow p-2 mb-3 bg-white rounded">
                    <div className="col-1">
                      <div>Id </div>
                      <div>{list.rootCaseId} </div>
                    </div>
                    <div className="col-1">
                      <div> Proceso </div>
                      <div>{list.processDefinitionId.displayName} </div>
                    </div>
                    <div className="col-3">
                      <div>Iniciado por </div>
                      <div>
                        {" "}
                        {list.startedBySubstitute.firstname}{" "}
                        {list.startedBySubstitute.lastname}{" "}
                      </div>
                    </div>
                    <div className="col-3">
                      {" "}
                      <div>Fecha inicio</div>
                      <div>{formatearFecha(list.start)} </div>
                    </div>
                    <div className="col-3">
                      <div>Tareas</div>
                      <div>{cantTask}</div>
                    </div>
                    <div className="col-1">
                      <div>
                        {/*<div>
            <Modals id={"vemos o no el modal "} isShow={true} />{" "}
          </div>*/}
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
        <div className="tab-pane fade " id="profile" role="tabpanel">
          <div className="row">
            <div className="column"></div>
            <div className="column">
              {showAlert(
                "NO encontramos casos para el cliente logueado",
                "Estos son los casos archivados"
              )}

              {archivedCaseList.map((list) => (
                <div className="container">
                  <div className="row shadow p-2 mb-3 bg-white rounded">
                    <div className="col-1">
                      <div>Id </div>
                      <div>{list.rootCaseId} </div>
                    </div>
                    <div className="col-1">
                      <div> Proceso </div>
                      <div>{list.processDefinitionId.displayName} </div>
                    </div>
                    <div className="col-3">
                      <div>Iniciado por </div>
                      <div>
                        {" "}
                        {list.startedBySubstitute.firstname}{" "}
                        {list.startedBySubstitute.lastname}{" "}
                      </div>
                    </div>
                    <div className="col-3">
                      {" "}
                      <div>Fecha inicio</div>
                      <div>{formatearFecha(list.start)} </div>
                    </div>
                    <div className="col-3">
                      <div>Fecha fin</div>
                      <div>{formatearFecha(list.end_date)}</div>
                    </div>
                    <div className="col-1">
                      <div>
                        <button
                          onClick={() => caseForId(list.id)}
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
    </>
  );
};

export default Lista;
