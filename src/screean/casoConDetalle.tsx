import Moment from "moment";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import { kMaxLength } from "buffer";
import { ClasesApi } from "../clases/clasesApi";
import {
  iListCaseForClient,
  ProcessDefinitionId,
  StartedBy,
  StartedBySubstitute,
} from "../interfaces/listCaseClient";
import { iCase } from "../interfaces/case";

import { useLocation } from "react-router-dom";
import ChildFormCasoDetalle from "../components/childFormCasoDetalle";
import { iUsuario } from "../interfaces/usuario";
import {
  BonitaCaseForIdSubstitute,
  BonitaUsuarioActivo,
} from "../apis/bonita/ApiBonita";

const CasoConDetalle = () => {
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

  const LimpiarUseState = () => {
    const [caseid, setCaseid] = useState<listCaseForClient>();
  };
  const [caseid, setCaseid] = useState<listCaseForClient>(elcase);

  //#region caseForId
  const caseForId = async (id: string) => {
    setCaseList([]);
    setisVisible(false);
    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      return;
    }
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(
        process.env.REACT_APP_GET_CASEFORID +
          id +
          "?d=processDefinitionId&d=started_by&d=startedBySubstitute"
      )
      .then((resp) => {
        let result = resp;
        setCaseid(result.data);
        setisVisible(true);
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
  const CaseForIdSubstitute = async (id: string) => {
    setCaseList([]);
    setisVisible(false);
    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      return;
    }

    await BonitaCaseForIdSubstitute(id)
      .then((resp) => {
        setCaseid(resp.data);
        setisVisible(true);
        console.log(resp.data);
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
  const caseForIdbkp = async (id: string) => {
    setCaseList([]);
    setisVisible(false);
    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      return;
    }
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(
        process.env.REACT_APP_GET_CASEFORID +
          id +
          "?d=processDefinitionId&d=started_by&d=startedBySubstitute"
      )
      .then((resp) => {
        let result = resp;
        setCaseid(result.data);
        setisVisible(true);
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
        let result = resp;
        setUsuario(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  const getHumeanTaskUserCase = async (user_id: string, caso_id: string) => {
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
          "&f=caseId=" +
          idCaso
      )
      .then((resp) => {
        setCantTask(resp.data.length);
        console.log("result.data.length :", resp.data.length);
        if (resp.data.length == 0) {
          console.log("lista vacia");
        } else {
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };
  //#endregion

  useEffect(() => {
    usuarioActivo();
    CaseForIdSubstitute(idCaso);
    //getHumeanTaskUserCase(usuario.user_id, idCaso);
  }, []);
  return (
    <>
      {isVisible === false ? (
        <div className=""></div>
      ) : (
        <div>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <div
                className="nav-link active"
                data-bs-toggle="tab"
                //href="#home"
                aria-selected="true"
                role="tab"
              >
                Caso encontrado
              </div>
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

                  <ChildFormCasoDetalle
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CasoConDetalle;
