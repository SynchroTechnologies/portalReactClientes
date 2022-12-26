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
  let [listTackHumanUserId, SetlistTackHumanUserId] = useState<
    _listTaskHumanUserId[]
  >([]);
  const [listTaskHumanMyUser, setListTaskHumanMyUser] = useState<
    _iListTaskHumanMyUser[]
  >([]);

  const [listTaskHumanCompleteUser, setListTaskHumanCompleteUser] = useState<
    _iListTaskHumanCompleteUser[]
  >([]);

  let allTask: _iListTaskHumanCompleteUser[] = [];

  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serviceLogin, setServiceLogin] = useState("");

  const navigateTo = (routeUrl: string) => {
    const url = `/tarea-detalle/?id=${routeUrl}`;
    navigate(url);
  };

  //#region getTaskHumanOpen
  const getTaskHumanOpenByCase = async (user_id: string, casoId: string) => {
    let userId = usuario.user_id;
    console.log({ userId });

    SetlistTackHumanUserId([]);
    await BonitaGetTaskHumanOpenByCase(user_id, casoId)
      .then((resp) => {
        SetlistTackHumanUserId(resp.data);
        allTask.push(resp.data);

        console.log({ allTask });
        console.log(resp.data);
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
    console.log({ user_id });

    setListTaskHumanCompleteUser([]);
    await BonitaGetTaskHumanCompleteUserByCase(user_id, casoId)
      .then((resp) => {
        setListTaskHumanCompleteUser(resp.data);
        allTask.push(resp.data);
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
        console.log(error);
      });
    return;
  };
  //#endregion

  //#region getTaskHumanMyUser
  const getTaskHumanMyUserByCase = async (user_id: string, case_id: string) => {
    let msj = false;
    setShow(msj);

    setListTaskHumanMyUser([]);
    await BonitaGetTaskHumanMyUserByCase(user_id, case_id)
      .then((resp) => {
        setListTaskHumanMyUser(resp.data);
        allTask.push(resp.data);
        console.log("getTaskHumanMyUser", resp.data);
        if (resp.data.length === 0) {
          console.log("lista vacia");
          msj = true;
          //setShow(true);
        } else {
          msj = false;
          //setShow(false);
        }
      })
      .catch((error: any) => {
        msj = true;
        //setShow(true);
        console.log(error);
      });
    setShow(msj);
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
    //getTaskHumanMyUserByCase(usuario.user_id, casoId);
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
  const showAlertAlertSuccess = (msjAlert: string, msj: string) => {
    if (show) {
      return <AlertDanger msj={msjAlert} />;
    } else {
      return (
        <>
          <p>{msj}</p>
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
        </>
      );
    }
  };
  //#endregion

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
      onClick={() => getTaskHumanOpenByCase(usuario.user_id, casoId)}
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
      onClick={() => getTaskHumanMyUserByCase(usuario.user_id, casoId)}
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
      onClick={() => getTaskHumanCompleteUserByCase(usuario.user_id, casoId)}
      tabIndex={-1}
    >
      Tareas realizadas {listTaskHumanCompleteUser.length} <Icons />
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
  //#endregion
};

export default ListaTareasCaso;
