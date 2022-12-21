/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
  iListCaseForClient,
  ProcessDefinitionId,
  StartedBy,
  StartedBySubstitute,
} from "../interfaces/bonita/listCaseClient";

import { iCase } from "../interfaces/bonita/case";
import { formatearFecha } from "../components/formatoFecha";
import { iUsuario } from "../interfaces/bonita/usuario";
import {
  BonitaGetCaseByProcessNameList,
  BonitaUsuarioActivo,
} from "../apis/bonita/ApiBonita";
import { useNavigate } from "react-router";

function casoActivoPorNombreProceso() {
  type listCaseForClient = iListCaseForClient;
  //usamos listCaseForClient para setArchivedCaseList y
  //tambien para setCaseList por que son los mismo atributos
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

  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);

  const [isVisible, setisVisible] = useState(false);
  const [inputId, setInputId] = useState<string>("1");
  const [caseList, setCaseList] = useState<listCaseForClient[]>([]);
  type caseId = iCase;
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

  useEffect(() => {
    usuarioActivo();
  }, []);
  useLayoutEffect(() => {
    if (!isVisible) {
      console.log("useLayoutEffect");
    }
  }, [setisVisible]);

  useEffect(() => {
    // usuarioActivo;
  }, []);
  const navigate = useNavigate();

  const navigateTo = (routeUrl: string) => {
    const url = `/caso-detalle/?id=${routeUrl}`;
    navigate(url);
  };
  const obtenerCaseList = async (name: string) => {
    await usuarioActivo();
    setCaseList([]);
    setisVisible(false);
    console.log("usuario.user_id :", usuario.user_id);
    await BonitaGetCaseByProcessNameList(usuario.user_id, name)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.length > 0) {
          setisVisible(true);
          setCaseList(resp.data);
        } else {
          setisVisible(false);
          setCaseList([]);
        }
      })
      .catch((error: any) => {
        setCaseList([]);
        setisVisible(false);
        console.log(error);
      });
    return;
  };
  const usuarioActivo = async () => {
    await BonitaUsuarioActivo()
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
  const layer_1 = (
    <div className="">
      <div id="tabla" className="d-flex flex-row bd-highlight mb-3">
        <div className="p-2 bd-highlight">
          Nombre o inicio del nombre del proceso
        </div>
        <div className="p-2 bd-highlight">
          <input
            type="text"
            className=""
            id="caseId"
            placeholder=" Nombre o inicio del nombre del proceso"
            onChange={(e) => setInputId(e.target.value)}
          />
        </div>
        <div className="p-2 bd-highlight">
          {" "}
          <button
            onClick={() => obtenerCaseList(inputId)}
            className="btn btn-outline-info btn-sm align-text-bottom"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
  const layer_2_1 = (
    <div className="">
      <div id="tabla" className="d-flex flex-row bd-highlight mb-3">
        <div className="p-2 bd-highlight">
          Nombre o inicio del nombre del proceso
        </div>
        <div className="p-2 bd-highlight">
          <input
            type="text"
            className=""
            id="caseId"
            placeholder="Nombre o inicio del nombre del proceso"
            onChange={(e) => setInputId(e.target.value)}
          />
        </div>
        <div className="p-2 bd-highlight">
          {" "}
          <button
            onClick={() => obtenerCaseList(inputId)}
            className="btn btn-outline-info btn-sm align-text-bottom"
          >
            Buscar
          </button>
        </div>
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
          Casos encontrados
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

            {caseList.map((list) => (
              <div className="container ">
                <p>Estos son casos abiertos</p>
                <div className="row shadow p-2 mb-3 bg-white rounded">
                  <div className="col">
                    <div>Id </div>
                    <div>{list.id} </div>
                  </div>
                  <div className="col">
                    <div> Nombre proceso </div>
                    <div>{list.processDefinitionId.displayName} </div>
                  </div>
                  <div className="col">
                    <div>Iniciado por </div>
                    <div>
                      {" "}
                      {list.startedBySubstitute.firstname}{" "}
                      {list.startedBySubstitute.lastname}{" "}
                    </div>
                  </div>
                  <div className="col">
                    {" "}
                    <div>Fecha inicio</div>
                    <div>{formatearFecha(list.start)} </div>
                  </div>
                  <div className="col">
                    <div>Tareas</div>
                    <div>{list.id} </div>
                  </div>
                  <div className="col">
                    <div>
                      {" "}
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
  const layer_2 = (
    <div>
      {layer_2_1}
      {layer_2_2}

      {layer_2_3}
    </div>
  );
  return <>{isVisible === false ? layer_1 : layer_2}</>;
}

export default casoActivoPorNombreProceso;
