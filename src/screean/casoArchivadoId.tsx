import React, { useState, useEffect, useLayoutEffect } from "react";
import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import { iCase } from "../interfaces/bonita/case";
import { formatearFecha } from "../components/formatoFecha";
import {
  iArchivedCase,
  ProcessDefinitionId,
  StartedBy,
  StartedBySubstitute,
} from "../interfaces/bonita/archivedCase";
import { BonitaUsuarioActivo } from "../apis/bonita/ApiBonita";
import { iUsuario } from "../interfaces/bonita/usuario";

function CasoArchivadoId() {
  type archivedCase = iArchivedCase;

  let started_by: StartedBy = {
    firstname: "",
    icon: "",
    creation_date: "",
    userName: "",
    title: "",
    created_by_user_id: "",
    enabled: "",
    lastname: "",
    last_connection: "",
    password: "",
    manager_id: "",
    id: "",
    job_title: "",
    last_update_date: "",
  };
  let startedBySubstitute: StartedBySubstitute = {
    firstname: "",
    icon: "",
    creation_date: "",
    userName: "",
    title: "",
    created_by_user_id: "",
    enabled: "",
    lastname: "",
    last_connection: "",
    password: "",
    manager_id: "",
    id: "",
    job_title: "",
    last_update_date: "",
  };
  let processDefinitionId: ProcessDefinitionId = {
    displayDescription: "",
    deploymentDate: "",
    displayName: "",
    name: "",
    description: "",
    deployedBy: "",
    id: "",
    activationState: "",
    version: "",
    configurationState: "",
    last_update_date: "",
    actorinitiatorid: "",
  };
  let iarchivedCaseid: iArchivedCase = {
    end_date: "",
    archivedDate: "",
    searchIndex5Label: "",
    processDefinitionId: processDefinitionId,
    searchIndex3Value: "",
    searchIndex4Value: "",
    searchIndex2Label: "",
    start: "",
    searchIndex1Value: "",
    sourceObjectId: "",
    searchIndex3Label: "",
    startedBySubstitute: startedBySubstitute,
    searchIndex5Value: "",
    searchIndex2Value: "",
    rootCaseId: "",
    id: "",
    state: "",
    searchIndex1Label: "",
    started_by: started_by,
    searchIndex4Label: "",
    last_update_date: "",
  };
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
  const [isVisible, setisVisible] = useState(false);
  const [inputId, setInputId] = useState<string>("1");
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);

  const [archivedCaseid, setArchivedCaseid] =
    useState<archivedCase>(iarchivedCaseid);
  const LimpiarUseState = () => {
    const [archivedCaseid, setArchivedCaseid] =
      useState<archivedCase>(iarchivedCaseid);
  };
  useEffect(() => {
    usuarioActivo();
  }, []);

  useLayoutEffect(() => {
    if (!isVisible) {
      console.log("useLayoutEffect");
    }
  }, [setisVisible]);

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
  //#region caseForId
  const caseForId = async (id: string) => {
    //setArchivedCaseid();
    setisVisible(false);
    //setCaseid(caseid);
    console.log("el id", id);

    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      return;
    }
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(
        "/bonita/API/bpm/archivedCase/?p=0&c=1&d=started_by&d=startedBySubstitute&d=processDefinitionId&f=sourceObjectId=" +
          id
      )
      .then((resp) => {
        let result = resp;
        console.log(result.data);
        if (result.data.length > 0) {
          setArchivedCaseid(result.data);
          setisVisible(true);
        } else {
          //LimpiarUseState;
          setisVisible(false);
        }

        return;
      })
      .catch((error: any) => {
        console.log(error);
        //LimpiarUseState;
        setisVisible(false);

        return;
      });
    return;
  };

  //#endregion

  return (
    <>
      {isVisible === false ? (
        <div className="">
          <div id="tabla" className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 bd-highlight">Id de caso archivado</div>
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
                onClick={() => caseForId(inputId)}
                className="btn btn-outline-info btn-sm align-text-bottom"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="">
            <div id="tabla" className="d-flex flex-row bd-highlight mb-3">
              <div className="p-2 bd-highlight">Id de caso archivado</div>
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
                  onClick={() => caseForId(inputId)}
                  className="btn btn-outline-info btn-sm align-text-bottom"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
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

          <div id="myTabContent" className="tab-content">
            <div
              className="tab-pane fade active show "
              id="home"
              role="tabpanel"
            >
              <div className="row">
                {" "}
                <div className="column"></div>
                <div className="column">
                  <div className="row"></div>

                  <p>Caso Archivado </p>
                  <div className="container ">
                    <div className="row shadow p-2 mb-3 bg-white rounded">
                      <div className="row">
                        <div className="col">
                          {" "}
                          <div>id de caso</div>
                          <div> {archivedCaseid.sourceObjectId} </div>
                        </div>
                        <div className="col">
                          <div> Nombre proceso </div>
                          <div>
                            {/*archivedCaseid.processDefinitionId.displayName*/}
                          </div>
                        </div>
                        <div className="col">
                          <div>Iniciado por </div>
                          <div>
                            {/*archivedCaseid.startedBySubstitute.firstname*/}
                            {/*archivedCaseid.startedBySubstitute.lastname*/}
                          </div>
                        </div>
                        <div className="col">
                          <div>Fecha inicio</div>
                          <div>{formatearFecha(archivedCaseid.start)}</div>
                        </div>
                        <div className="col">
                          <div>Fecha fin</div>
                          <div>
                            {formatearFecha(archivedCaseid.archivedDate)}
                          </div>
                        </div>
                        <div className="col-1">
                          {" "}
                          <div></div>
                          <div>
                            {" "}
                            <button
                              onClick={() => caseForId(archivedCaseid.id)}
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
        </div>
      )}
    </>
  );
}

export default CasoArchivadoId;
