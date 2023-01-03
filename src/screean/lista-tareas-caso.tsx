import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatearFecha } from "../components/formatoFecha";
import Icons from "../components/icons";
import AlertDanger from "./alertDanger";
import { iUsuario } from "../interfaces/bonita/usuario";
import { iListTaskHumanUserId } from "../interfaces/bonita/listTaskHumanUserId";
import { iListTaskHumanCompleteUser } from "../interfaces/bonita/listTaskHumanCompleteUser";
import { iListTaskHumanMyUser } from "../interfaces/bonita/listTaskHumanMyUser";
import {
  BonitaGetTaskHumanCompleteUser,
  BonitaGetTaskHumanCompleteUserByCase,
  BonitaGetTaskHumanMyUser,
  BonitaGetTaskHumanMyUserByCase,
  BonitaGetTaskHumanOpenByCase,
  BonitaPutTaskById,
  BonitaUsuarioActivo,
} from "../apis/bonita/ApiBonita";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/states/usuarioActivo.state";
import { managenUsuarioState } from "../apis/bonita/persist.data.service";
import AlertSuccess from "./alertSuccess";
//import apiGlpi from "../apis/glpi/ApiGlpi";
interface Props {
  casoId: string;
}
const ListaTareasCaso: React.FC<Props> = ({ casoId }) => {
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
  type _listTaskHumanUserId = iListTaskHumanUserId;

  const [show, setShow] = useState(false);
  let [listTaskHumanUserId, SetlistTaskHumanUserId] = useState<
    _listTaskHumanUserId[]
  >([]);
  const [listTaskHumanMyUser, setListTaskHumanMyUser] = useState<
    _iListTaskHumanMyUser[]
  >([]);

  const [listTaskHumanCompleteUser, setListTaskHumanCompleteUser] = useState<
    _iListTaskHumanCompleteUser[]
  >([]);

  //let allTask: _iListTaskHumanCompleteUser[] = [];
  const [allTask, setallTask] = useState<_iListTaskHumanCompleteUser[]>([]);
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serviceLogin, setServiceLogin] = useState("");

  const [isTomar, setIsTomar] = React.useState(true);
  const [isLiberar, setLiberar] = React.useState(true);
  const navigateTobkp = (routeUrl: string) => {
    const url = `/tarea-detalle/?id=${routeUrl}`;
    navigate(url);
  };
  const navigateTo = (taskId: string, taskName: string) => {
    let url = `/tarea-detalle/?id=${taskId}`;
    console.log(url, taskName);
    switch (taskName) {
      case "Mas Información":
        return navigate(`/tarea-detalle-mas-informacion/?id=${taskId}`);
      case "Aprobación":
        return navigate(`/tarea-detalle-aprobar/?id=${taskId}`);
      case "Calificar y finalizar":
        return navigate(`/tarea-detalle-calificar-finalizar/?id=${taskId}`);
      default:
        navigate(`/tarea-detalle/?id=${taskId}`);
    }
  };

  //#region getTaskHumanOpen
  const getTaskHumanOpenByCase = async (user_id: string, casoId: string) => {
    SetlistTaskHumanUserId([]);
    await BonitaGetTaskHumanOpenByCase(user_id, casoId)
      .then((resp) => {
        SetlistTaskHumanUserId(resp.data);
        setallTask((old) => [...old, ...resp.data]);
        //allTask.push(resp.data);
        //console.log({ allTask });
        //console.log(resp.data);
        if (resp.data.length === 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setShow(true);
      });
    return;
  };
  //#endregion

  //#region getTaskHumanCompleteUser
  const getTaskHumanCompleteUserByCase = async (
    user_id: string,
    casoId: string
  ) => {
    setListTaskHumanCompleteUser([]);
    await BonitaGetTaskHumanCompleteUserByCase(user_id, casoId)
      .then((resp) => {
        setListTaskHumanCompleteUser(resp.data);
        setallTask(resp.data);
        //allTask.push(resp.data);
        //allTask.push(resp.data);
        console.log("getTaskHumanCompleteUser", resp.data);
        if (resp.data.length === 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch((error: any) => {
        setShow(true);
        setListTaskHumanCompleteUser([]);
        console.log(error);
      });
    return;
  };
  //#endregion

  //#region getTaskHumanMyUser
  const getTaskHumanMyUserByCase = async (user_id: string, case_id: string) => {
    setListTaskHumanMyUser([]);
    await BonitaGetTaskHumanMyUserByCase(user_id, case_id)
      .then((resp) => {
        setListTaskHumanMyUser(resp.data);
        //allTask.push(resp.data);
        console.log("getTaskHumanMyUser", resp.data);
        if (resp.data.length === 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch((error: any) => {
        setShow(true);
        setListTaskHumanMyUser([]);
        console.log(error);
      });
    return;
  };

  //#region usuarioActivo
  const usuarioActivo = async () => {
    console.log("await BonitaUsuarioActivo");
    const bonitaUsuarioActivo = await BonitaUsuarioActivo();
    console.log("await BonitaUsuarioActivo");
    if (bonitaUsuarioActivo.status === 200) {
      console.log(bonitaUsuarioActivo.status);
      setUsuario(bonitaUsuarioActivo.data);
      setServiceLogin("Login Success " + bonitaUsuarioActivo.data.status);
      //await dispatch(createUser(bonitaUsuarioActivo.data));
      //await managenUsuarioState(bonitaUsuarioActivo.data);
    } else {
      setServiceLogin("Login No Success");
      console.log("await BonitaUsuarioActivo");
    }
    return;
  };

  //#endregion

  //#region useEffect
  useEffect(() => {
    usuarioActivo();
    setListTaskHumanMyUser([]);
    const a4 = async () => {
      //setShow(false);
      await getTaskHumanMyUserByCase(usuario.user_id, casoId);
      //await getTaskHumanOpenByCase(usuario.user_id, casoId);
      // await getTaskHumanCompleteUserByCase(usuario.user_id, casoId);
    };
    a4();
  }, []);
  //#endregion

  //#region alert
  const showAlert = (msjAlert: string, msj: string) => {
    if (show) {
      return <AlertDanger msj={msjAlert} />;
    } else {
      return <p>{msj}</p>;
    }
  };

  //#endregion
  const asignadabkp = (assigned_id: string, taskId: string) => {
    return (
      <>
        <div>
          <br />
          <button
            disabled={!isTomar}
            //onClick={(e) => liberar(e, taskId)}
            className="btn btn-success btn-sm"
          >
            Liberar
          </button>
        </div>
        <div>
          <br />
          <button
            disabled={isTomar}
            //onClick={(e) => tomar(e, taskId)}
            className="btn btn-primary btn-sm"
          >
            Tomar
          </button>
        </div>
        <div>
          <br />
          <button
            //onClick={() => navigateTo(taskId)}
            className="btn btn-outline-info btn-sm align-text-bottom"
          >
            Ver
          </button>
        </div>
      </>
    );
  };
  const asignada = (
    assigned_id: string,
    taskId: string,
    taskName: string,
    getBonita: string
  ) => {
    return (
      <>
        <div>
          <br />
          <button
            disabled={assigned_id === "" ? true : false}
            onClick={(e) => liberar(e, taskId, getBonita)}
            className="btn btn-success btn-sm"
          >
            Liberar
          </button>
        </div>
        <div>
          <br />
          <button
            disabled={assigned_id !== "" ? true : false}
            onClick={(e) => tomar(e, taskId, getBonita)}
            className="btn btn-primary btn-sm"
          >
            Tomar
          </button>
        </div>
        <div>
          <br />
          <button
            onClick={() => navigateTo(taskId, taskName)}
            className="btn btn-outline-info btn-sm align-text-bottom"
          >
            Ver
          </button>
        </div>
      </>
    );
  };
  const liberarBkp = (
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: string
  ) => {
    event.preventDefault();
    putTaskById("", taskId);
    //getTaskHumanOpen(usuario.user_id);
  };
  const tomarBkp = (
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: string
  ) => {
    event.preventDefault();
    putTaskById(usuario.user_id, taskId);
    console.log({ taskId });
    //getTaskHumanOpen(usuario.user_id);
  };
  const liberar = (
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: string,
    getBonita: string
  ) => {
    event.preventDefault();
    putTaskById("", taskId);
    setIsTomar(!isTomar);
    setLiberar(!isLiberar);
    switchGetBonita(getBonita);
  };

  const tomar = (
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: string,
    getBonita: string
  ) => {
    event.preventDefault();
    putTaskById(usuario.user_id, taskId);
    setLiberar(!isLiberar);
    setIsTomar(!isTomar);
    switchGetBonita(getBonita);
  };
  const switchGetBonita = (getBonita: string) => {
    switch (getBonita) {
      case "getTaskHumanOpenByCase":
        return getTaskHumanOpenByCase(usuario.user_id, casoId);

      case "getTaskHumanMyUserByCase":
        return getTaskHumanMyUserByCase(usuario.user_id, casoId);

      case "getTaskHumanCompleteUserByCase":
        return getTaskHumanCompleteUserByCase(usuario.user_id, casoId);

      default:
        return getTaskHumanOpenByCase(usuario.user_id, casoId);
    }
  };
  const putTaskById = async (user_id: string, task_id: string) => {
    console.log({ user_id }, { task_id });
    await BonitaPutTaskById(user_id, task_id)
      .then((result) => {
        if (!result.ok) {
          console.log("!result.ok", result);
          return;
        }
        window.localStorage.setItem("putTaskById", JSON.stringify(result.body));
        console.log({ result });
        setIsTomar(!isTomar);
        setLiberar(!isLiberar);
        return;
      })
      .catch((error) => {
        console.log("error fetch ------", error);
        return;
      });
    return;
  };
  //#region renderizacion
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
            {listTaskHumanUserId.map((list) => (
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
                  <div className="col-2">
                    {" "}
                    <div>Ultima actualizacion</div>
                    <div>{formatearFecha(list.last_update_date)} </div>
                  </div>
                  <div className="col-2">
                    {" "}
                    <div>Vencimiento</div>
                    <div>{formatearFecha(list.dueDate)} </div>
                  </div>
                  <div className="col-2 btn-group">
                    {asignada(
                      list.assigned_id,
                      list.id,
                      list.name,
                      "getTaskHumanOpenByCase"
                    )}
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
      <div className="tab-pane fade active show" id="tabTaskMe" role="tabpanel">
        <div className="row">
          {" "}
          <div className="column"></div>
          <div className="column">
            <div className="row"></div>
            {showAlert(
              "NO encontramos tareas en ejecución para el cliente logueado",
              "Tareas en ejecución"
            )}
            {listTaskHumanMyUser.map((listM) => (
              <div className="container">
                <div className="row shadow p-2 mb-3 bg-white rounded">
                  <div className="col-1">
                    <div> Id tarea </div>
                    <div>{listM.id} </div>
                  </div>
                  <div className="col-2">
                    <div>Nombre tarea </div>
                    <div> {listM.name}</div>
                  </div>
                  <div className="col-1">
                    <div>Caso </div>
                    <div> {listM.caseId}</div>
                  </div>
                  <div className="col-2">
                    <div>Nombre Proceso </div>
                    <div> {listM.rootContainerId.displayName}</div>
                  </div>
                  <div className="col-2">
                    {" "}
                    <div>Ultima actualizacion</div>
                    <div>{formatearFecha(listM.last_update_date)} </div>
                  </div>
                  <div className="col-2">
                    {" "}
                    <div>Vencimiento</div>
                    <div>{formatearFecha(listM.dueDate)} </div>
                  </div>
                  <div className="col-2 btn-group">
                    {asignada(
                      listM.assigned_id,
                      listM.id,
                      listM.name,
                      "getTaskHumanMyUserByCase"
                    )}
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
                  <div className="col-2">
                    {" "}
                    <div>Ultima actualizacion</div>
                    <div>{formatearFecha(listc.last_update_date)} </div>
                  </div>
                  <div className="col-2">
                    {" "}
                    <div>Vencimiento</div>
                    <div>{formatearFecha(listc.dueDate)} </div>
                  </div>
                  <div className="col-2 btn-group">
                    <div className="col-1">
                      <div>
                        <br />
                        <button
                          onClick={() => navigateTo(listc.id, listc.name)}
                          className="btn btn-outline-info btn-sm align-text-bottom"
                        >
                          {" "}
                          Ver{" "}
                        </button>{" "}
                      </div>
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
  const tabTaskHistory = (
    <div>
      <div
        className="tab-pane fade active show"
        id="tabTaskHistory"
        role="tabpanel"
      >
        <div className="row">
          {" "}
          <div className="column"></div>
          <div className="column">
            <div className="row"></div>
            {showAlert(
              "NO encontramos Tareas para el caso ",
              "Linea de tiempo"
            )}
            {allTask.map((listHIs) => (
              <div className="container">
                <div className="row shadow p-2 mb-3 bg-white rounded">
                  <div className="col-1">
                    <div> Id tarea </div>
                    <div>{listHIs.id} </div>
                  </div>
                  <div className="col-2">
                    <div>Nombre tarea </div>
                    <div> {listHIs.name}</div>
                  </div>
                  <div className="col-1">
                    <div>Caso </div>
                    <div> {listHIs.caseId}</div>
                  </div>
                  <div className="col-2">
                    <div>Nombre Proceso </div>
                    <div> {listHIs.rootContainerId.displayName}</div>
                  </div>
                  <div className="col-2">
                    {" "}
                    <div>Ultima actualizacion</div>
                    <div>{formatearFecha(listHIs.last_update_date)} </div>
                  </div>
                  <div className="col-2">
                    {" "}
                    <div>Vencimiento</div>
                    <div>{formatearFecha(listHIs.dueDate)} </div>
                  </div>
                  <div className="col-2 btn-group">
                    <div className="col-1">
                      <div>
                        <br />
                      </div>
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
      onClick={() => getTaskHumanOpenByCase(usuario.user_id, casoId)}
    >
      Tareas por Hacer {listTaskHumanUserId.length}
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
      onClick={() => getTaskHumanMyUserByCase(usuario.user_id, casoId)}
    >
      Tareas en ejecución {listTaskHumanMyUser.length} <Icons />
    </a>
  );
  const tab3 = (
    <a
      className="nav-link"
      data-bs-toggle="tab"
      href="#tres"
      aria-selected="false"
      role="tab"
      onClick={() => getTaskHumanCompleteUserByCase(usuario.user_id, casoId)}
      tabIndex={-1}
    >
      Tareas realizadas {listTaskHumanCompleteUser.length} <Icons />
    </a>
  );
  const tab4 = (
    <a
      className="nav-link"
      data-bs-toggle="tab"
      href="#tres"
      aria-selected="false"
      role="tab"
      //onClick={() => getTaskHumanCompleteUserByCase(usuario.user_id, casoId)}
      tabIndex={-1}
    >
      Linea de tiempo {allTask.length} <Icons />
    </a>
  );
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
        <li className="nav-item" role="presentation">
          {tab4}
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
        <div className="tab-pane fade" id="cuatro" role="tabpanel">
          {tabTaskHistory}
        </div>
      </div>
    </>
  );
  //#endregion
};

export default ListaTareasCaso;
