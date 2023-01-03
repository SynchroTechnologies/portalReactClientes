import React, { useState, useEffect } from "react";
import {
  ProcessDefinitionId,
  StartedBy,
  StartedBySubstitute,
} from "../interfaces/bonita/listCaseClient";

import { useLocation } from "react-router-dom";
import { iUsuario } from "../interfaces/bonita/usuario";
import { BonitaTaskById, BonitaUsuarioActivo } from "../apis/bonita/ApiBonita";
import ChildFormTareaDetalle from "../components/childFormTareaDetalle";
import {
  iListTaskHumanUserId,
  RootContainerId,
} from "../interfaces/bonita/listTaskHumanUserId";
import { LocationContext } from "react-router/dist/lib/context";
import ChildFormTareaCalificarFinalizarDetalle from "../components/childFormTareaCalificarFinalizarDetalle";
import ChildFormTareaAprobarDetalle from "../components/childFormTareaAprobarDetalle";

const TareaAprobarDetalle = () => {
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
  let idTask: any;
  idTask = query.get("id") ? query.get("id") : "0";

  type listTaskHumanUserId = iListTaskHumanUserId;
  //usamos listCaseForClient para setArchivedCaseList y
  //tambien para setCaseList por que son los mismo atributos
  const [cantTask, setCantTask] = useState(0);
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);
  const [isVisible, setisVisible] = useState(true);
  const [inputId, setInputId] = useState<string>("1");
  const [caseList, setCaseList] = useState<listTaskHumanUserId[]>([]);

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
  let rootContainerId: RootContainerId = {
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
  let laTarea: iListTaskHumanUserId = {
    displayDescription: "",
    executedBy: "",
    rootContainerId: rootContainerId,
    assigned_date: "",
    displayName: "",
    executedBySubstitute: "",
    dueDate: "",
    description: "",
    type: "",
    priority: "",
    actorId: "",
    processId: "",
    caseId: "",
    name: "",
    reached_state_date: "",
    rootCaseId: "",
    id: "",
    state: "",
    parentCaseId: "",
    last_update_date: "",
    assigned_id: "",
  };

  const LimpiarUseState = () => {
    //const [caseid, setCaseid] = useState<listCaseForClient>();
  };
  const [taskId, setTaskId] = useState<listTaskHumanUserId>(laTarea);

  //#region caseForId

  const TaskByIdSubstitute = async (id: string) => {
    setCaseList([]);
    setisVisible(false);
    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      return;
    }

    await BonitaTaskById(id)
      .then((resp) => {
        setTaskId(resp.data);
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
  const renderizarFormulario = (nombreTarea: string) => {
    console.log({ nombreTarea });
    if (nombreTarea === "Mas Información") {
      return <></>;
    }

    if (nombreTarea === "Aprobar") {
      return <></>;
    }
    if (nombreTarea === "Calificar y finalizar") {
      return <></>;
    }
  };
  useEffect(() => {
    usuarioActivo();
    TaskByIdSubstitute(idTask);
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
                Tarea encontrada
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
                  <div className="row"> TareaAprobarDetalle</div>

                  <ChildFormTareaAprobarDetalle
                    idAcordion={taskId.description + "s"}
                    titleAcordion={taskId.description}
                    cardHeader={"ID Tarea :" + idTask}
                    cardTitle={""}
                    body={""}
                    textButton={"Añadir comentario"}
                    routeUrl="routeUrl"
                    style={"danger"}
                    data={"danger"}
                    taskData={taskId}
                    taskId={idTask}
                    cantTask={cantTask}
                    usuarioId={usuario.user_id}
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

export default TareaAprobarDetalle;
