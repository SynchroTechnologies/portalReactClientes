/* eslint-disable react-hooks/rules-of-hooks */
import {
  Navigate,
  redirect,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  iListCaseForClient,
  ProcessDefinitionId,
  StartedBy,
  StartedBySubstitute,
} from "../interfaces/listCaseClient";
import { iCase } from "../interfaces/case";
import { formatearFecha } from "../components/formatoFecha";
import {
  BonitaCaseForIdSubstitute,
  BonitaGetHumanTaskUserCase,
  BonitaUsuarioActivo,
} from "../apis/bonita/ApiBonita";
import { iUsuario } from "../interfaces/usuario";

function casoActivoId() {
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
  type listCaseForClient = iListCaseForClient;
  const [isVisible, setisVisible] = useState(false);
  const [cantTask, setCantTask] = useState(0);
  const [inputId, setInputId] = useState<string>("1");
  const [caseList, setCaseList] = useState<listCaseForClient[]>([]);
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);

  let startedBySubstitute: StartedBySubstitute = {
    last_connection: "",
    created_by_user_id: "",
    creation_date: "",
    id: "",
    icon: "",
    enabled: "",
    title: "",
    manager_id: "",
    job_title: "",
    userName: "",
    lastname: "",
    firstname: "",
    password: "",
    last_update_date: "",
  };
  let startedBy: StartedBy = {
    last_connection: "",
    created_by_user_id: "",
    creation_date: "",
    id: "",
    icon: "",
    enabled: "",
    title: "",
    manager_id: "",
    job_title: "",
    userName: "",
    lastname: "",
    firstname: "",
    password: "",
    last_update_date: "",
  };
  let processDefinitionId: ProcessDefinitionId = {
    id: "",
    icon: "",
    displayDescription: "",
    deploymentDate: "",
    description: "",
    activationState: "",
    name: "",
    deployedBy: "",
    displayName: "",
    actorinitiatorid: "",
    last_update_date: "",
    configurationState: "",
    version: "",
  };
  let elcase: iListCaseForClient = {
    end_date: "",
    searchIndex5Label: "",
    searchIndex3Value: "",
    searchIndex4Value: "",
    searchIndex2Label: "",
    start: "",
    searchIndex1Value: "",
    searchIndex3Label: "",
    searchIndex5Value: "",
    searchIndex2Value: "",
    rootCaseId: "",
    id: "",
    state: "",
    searchIndex1Label: "",
    searchIndex4Label: "",
    last_update_date: "",
    failedFlowNodes: "",
    startedBySubstitute: startedBySubstitute,
    activeFlowNodes: "",
    started_by: startedBy,
    processDefinitionId: processDefinitionId,
  };

  const LimpiarUseState = () => {
    const [caseid, setCaseid] = useState<listCaseForClient>(elcase);
  };
  const [caseid, setCaseid] = useState<listCaseForClient>(elcase);
  useEffect(() => {
    usuarioActivo();
  }, []);

  useLayoutEffect(() => {
    if (!isVisible) {
      console.log("useLayoutEffect");
    }
  }, [setisVisible]);

  //#region caseForId

  const getData = async (id: string) => {
    //await usuarioActivo();
    await caseForId(id);

    if (isVisible) {
      await getHumeanTaskUser(usuario.user_id, caseid.id);
    }
  };
  const getHumeanTaskUser = async (user_id: string, case_id: string) => {
    //const cant = await BonitaGetHumeanTaskUser(user_id);
    let cant = 0;
    cant = await BonitaGetHumanTaskUserCase(usuario.user_id, caseid.id);
    console.log({ cant });
    setCantTask(cant);
  };
  const caseForId = async (id: string) => {
    setCaseList([]);
    setisVisible(false);
    console.log("el id", id);

    let idint = parseInt(id);
    if (idint <= 0) {
      setisVisible(false);
      console.log("no es mayor a cero");
      return;
    }
    await BonitaCaseForIdSubstitute(id)
      .then((resp) => {
        if (resp.status === 200) {
          setCaseid(resp.data);
          setisVisible(true);
        } else {
          //setCaseid(resp.data);
          setisVisible(false);
        }

        return;
      })
      .catch((error: any) => {
        console.log(error);
        LimpiarUseState();
        setisVisible(false);
        return;
      });
    return;
  };
  const usuarioActivo = async () => {
    await BonitaUsuarioActivo()
      .then((resp) => {
        if (resp.status === 200) {
          setUsuario(resp.data);
          console.log(resp.data);
        } else {
          navigateTo("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        navigateTo("/login");
      });
    //return;
  };
  const navigate = useNavigate();

  const navigateTo = (routeUrl: string) => {
    const url = `/caso-detalle/?id=${routeUrl}`;
    navigate(routeUrl);
  };
  const layer_1 = (
    <div className="">
      <div id="tabla" className="d-flex flex-row bd-highlight mb-3">
        <div className="p-2 bd-highlight">Id de caso</div>
        <div className="p-2 bd-highlight">
          <input
            type="text"
            className=""
            id="caseId"
            placeholder="Numero de caso a buscar?"
            onChange={(e) => setInputId(e.target.value)}
          />
        </div>
        <div className="p-2 bd-highlight">
          {" "}
          <button
            onClick={() => getData(inputId)}
            className="btn btn-outline-info btn-sm align-text-bottom"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
  const layer_2_1 = (
    <div id="tabla" className="d-flex flex-row bd-highlight mb-3">
      <div className="p-2 bd-highlight">Id de caso</div>
      <div className="p-2 bd-highlight">
        <input
          type="text"
          className=""
          id="caseId"
          placeholder="Numero de caso a buscar?"
          onChange={(e) => setInputId(e.target.value)}
        />
      </div>
      <div className="p-2 bd-highlight">
        {" "}
        <button
          onClick={() => getData(inputId)}
          className="btn btn-outline-info btn-sm align-text-bottom"
        >
          Buscar
        </button>
      </div>
    </div>
  );
  const layer_2_2 = (
    <ul className="nav nav-tabs" role="tablist">
      <li className="nav-item" role="presentation">
        <a
          className="nav-link active"
          data-bs-toggle="tab"
          href="#home"
          aria-selected="true"
          role="tab"
        >
          Caso encontrado
        </a>
      </li>
    </ul>
  );
  const layer_2_3 = (
    <div id="myTabContent" className="tab-content">
      <div className="tab-pane fade active show " id="home" role="tabpanel">
        <div className="row">
          {" "}
          <div className="column"></div>
          <div className="column">
            <div className="row"></div>
            <div className="container ">
              <p>Caso abierto </p>
              <div className="row shadow p-2 mb-3 bg-white rounded">
                <div className="row">
                  <div className="col">
                    {" "}
                    <div>id de caso</div>
                    <div> {caseid.id} </div>
                  </div>
                  <div className="col">
                    <div> Nombre proceso </div>
                    <div>{caseid.processDefinitionId.displayName}</div>
                  </div>
                  <div className="col">
                    <div>Iniciado por </div>
                    <div>
                      {" "}
                      {caseid.startedBySubstitute.firstname}{" "}
                      {caseid.startedBySubstitute.lastname}{" "}
                    </div>
                  </div>
                  <div className="col">
                    <div>Fecha inicio</div>
                    <div>{formatearFecha(caseid.start)}</div>
                  </div>
                  <div className="col">
                    <div>Tareas</div>
                    <div>{cantTask} </div>
                  </div>
                  <div className="col-1">
                    {" "}
                    <div></div>
                    <div>
                      {" "}
                      <button
                        onClick={() =>
                          navigateTo(`/caso-detalle/?id=${caseid.id}`)
                        }
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
          </div>
        </div>
      </div>
    </div>
  );
  const layer_2 = (
    <div>
      {layer_2_1}
      {layer_2_2}

      {layer_2_3}
    </div>
  );
  //#endregion

  return <>{isVisible === false ? layer_1 : layer_2}</>;
}

export default casoActivoId;
