import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  iListCaseForClient,
  ProcessDefinitionId,
  StartedBy,
  StartedBySubstitute,
} from "../interfaces/bonita/listCaseClient";
import { iCase } from "../interfaces/bonita/case";

import { useLocation } from "react-router-dom";
import { iUsuario } from "../interfaces/bonita/usuario";
import {
  BonitaCaseArchivedForId,
  BonitaUsuarioActivo,
} from "../apis/bonita/ApiBonita";
import Icons from "../components/icons";
import ChildFormCasoArchivadoDetalle from "../components/childFormCasoArchivadoDetalle";
import ListaTareasCasoArchivado from "./lista-tareas-caso-archivado";

const CasoArchivadoConDetalle = () => {
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
  const query = new URLSearchParams(useLocation().search);
  let idCaso: any;
  idCaso = query.get("id") ? query.get("id") : "0";
  type listCaseForClient = iListCaseForClient;
  //usamos listCaseForClient para setArchivedCaseList y
  //tambien para setCaseList por que son los mismo atributos
  const [cantTask, setCantTask] = useState(0);
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);
  const [isVisible, setisVisible] = useState(true);
  const [inputId, setInputId] = useState<string>("1");
  const [caseList, setCaseList] = useState<listCaseForClient[]>([]);

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

  const [caseid, setCaseid] = useState<listCaseForClient>(elcase);

  //#region caseForId

  const GetBonitaCaseArchivedForId = async (id: string) => {
    setCaseList([]);
    setisVisible(false);
    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      return;
    }
    //await BonitaCaseForIdSubstitute(id)

    await BonitaCaseArchivedForId(id)
      .then((resp) => {
        setCaseid(resp.data[0]);
        setCaseList(resp.data);
        setisVisible(true);
        console.log(resp.data);
        return;
      })
      .catch((error: any) => {
        console.log(error);
        setisVisible(false);
        return;
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

  //#endregion

  useEffect(() => {
    usuarioActivo();
    GetBonitaCaseArchivedForId(idCaso);
  }, []);

  return (
    <>
      {isVisible === false ? (
        <div className=""></div>
      ) : (
        <>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                href="#home"
                aria-selected="true"
                role="tab"
              >
                Casos encontrado <Icons />
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                data-bs-toggle="tab"
                href="#profile"
                aria-selected="false"
                role="tab"
              >
                Tareas del caso <Icons />
              </a>
            </li>
          </ul>
          <div id="myTabContent" className="tab-content">
            <div
              className="tab-pane fade active show"
              id="home"
              role="tabpanel"
            >
              {panelCasoDetalle()}
            </div>
            <div className="tab-pane fade " id="profile" role="tabpanel">
              {"ID del Caso :" + idCaso}
              {panelListaTareas()}
            </div>
          </div>
        </>
      )}
    </>
  );

  function panelCasoDetalle() {
    return (
      <div className="row">
        {" "}
        <div className="column"></div>
        <div className="column">
          <div className="row"></div>

          <ChildFormCasoArchivadoDetalle
            idAcordion={caseid.processDefinitionId.displayName + "s"}
            titleAcordion={caseid.processDefinitionId.displayName}
            cardHeader={"ID del Caso :" + idCaso}
            cardTitle={""}
            body={""}
            textButton={"Añadir comentario"}
            routeUrl="routeUrl"
            style={"danger"}
            data={"danger"}
            caseData={caseid}
            casoId={idCaso}
            cantTask={cantTask}
          />
        </div>
      </div>
    );
  }

  function panelListaTareas() {
    return (
      <div className="row">
        <div className="column"></div>
        <div className="column">
          <div className="container">
            <div className="row shadow p-2 mb-3 bg-white rounded">
              <div className="col-12">
                <div className="row">
                  {" "}
                  <div className="column"></div>
                  <div className="column">
                    <ListaTareasCasoArchivado casoId={idCaso} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CasoArchivadoConDetalle;
