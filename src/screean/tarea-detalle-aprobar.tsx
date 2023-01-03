import React, { useState, useEffect } from "react";
import NavBar from "./navBar";
import { useLocation } from "react-router-dom";
import { iCase } from "../interfaces/bonita/case";
import {
  BonitaPutTaskById,
  BonitaTaskById,
  BonitaUsuarioActivo,
} from "../apis/bonita/ApiBonita";
import { iUsuario } from "../interfaces/bonita/usuario";
import ChildFormTareaDetalle from "../components/childFormTareaDetalle";
import TareaConDetalle from "./tareaConDetalle";
import { iListTaskHumanUserId } from "../interfaces/bonita/listTaskHumanUserId";
import ChildFormTareaAprobarDetalle from "../components/childFormTareaAprobarDetalle";
import ChildFormTareaCalificarFinalizarDetalle from "../components/childFormTareaCalificarFinalizarDetalle";
import TareaAprobarDetalle from "./tareaAprobarDetalle";

const TareaDetalleAprobar = () => {
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
  const idTask = query.get("id") ? query.get("id") : "";
  type caseId = iCase;
  const [taskId, setTaskId] = useState<caseId>();
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);
  const [taskList, setTaskList] = useState<iListTaskHumanUserId[]>([]);

  const [cantTask, setCantTask] = useState(0);
  //setCaseid(data);
  if (idTask == null) {
    console.log("caso en null");
  }
  const [show, setShow] = useState(false);

  //#region caseForId

  const taskById = async (id: string) => {
    //setCaseList([]);
    setShow(false);
    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      setShow(false);
    }

    await BonitaTaskById(id)
      .then((resp) => {
        setTaskId(resp.data[0]);
        setTaskList(resp.data);
        console.log(resp.data);
        setShow(true);
      })
      .catch((error: any) => {
        console.log(error);
        setShow(false);
      });
    return;
  };

  //#endregion

  //#region useEffect
  useEffect(() => {
    const usuario = async () => {
      await BonitaUsuarioActivo()
        .then((resp) => {
          let result = resp;
          setUsuario(result.data);
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
      usuario();
    };
  }, []);
  //#endregion

  //#region renderizacion
  const renderizarTarea = () => {
    if (idTask == null || idTask.length <= 0) {
      return (
        <>
          <div className="App">
            <div>
              <div className="container ">
                <div className="row shadow p-2 mb-3 bg-white rounded">
                  <div className="row">No encontramos la tarea buscada</div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      if (show) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          taskById(idTask);
        }, []);
        return (
          <>
            <div className="App">
              <div>
                <div className="container ">
                  <div className="row shadow p-2 mb-3 bg-white rounded">
                    <div className="row">
                      <div className="col">
                        {" "}
                        <div></div>
                      </div>
                      {/*renderizarFormularioB(taskList[0].name)*/}
                      {<TareaAprobarDetalle />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          taskById(idTask);
        }, []);
        //caseForId(idCaso);
        if (show) {
          if (taskList.length >= 0) {
            return (
              <>
                <div className="App">
                  <div>
                    <div className="container ">
                      <div className="row shadow p-2 mb-3 bg-white rounded">
                        <div className="row">
                          <div className="col">
                            {" "}
                            <div></div>
                            <div>
                              {renderizarFormulario(taskList[0].name)}
                              {/*<ChildFormTareaDetalle
                                idAcordion={"Tarea"}
                                titleAcordion={"Tareas"}
                                cardHeader={"ID tarea : " + taskList[0].id}
                                cardTitle={""}
                                textButton={"A"}
                                body={""}
                                routeUrl="routeUrl"
                                style={"danger"}
                                data={"danger"}
                                taskId={idTask}
                                taskData={taskList[0]}
                                cantTask={cantTask}
                                usuarioId={usuario.user_id}
                              />*/}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          } else {
            <>
              <div className="App">
                <div>
                  <div className="container ">
                    <div className="row shadow p-2 mb-3 bg-white rounded">
                      <div className="row">No encontramos el caso buscado</div>
                    </div>
                  </div>
                </div>
              </div>
            </>;
          }
        }
      }
    }
  };
  const renderizarFormularioB = (nombreTarea: string) => {
    console.log({ nombreTarea });
    if (nombreTarea === "Mas Información") {
      return <TareaConDetalle />;
    }

    if (nombreTarea === "Aprobar") {
      return <TareaConDetalle />;
    }
    if (nombreTarea === "Calificar y finalizar") {
      return <TareaConDetalle />;
    }
  };
  const renderizarFormulario = (nombreTarea: string) => {
    console.log({ nombreTarea });
    if (nombreTarea === "Mas Información") {
      return (
        <>
          <ChildFormTareaDetalle
            idAcordion={"Tarea"}
            titleAcordion={"Tareas"}
            cardHeader={"ID tarea : " + taskList[0].id}
            cardTitle={""}
            textButton={"A"}
            body={""}
            routeUrl="routeUrl"
            style={"danger"}
            data={"danger"}
            taskId={idTask ? idTask : ""}
            taskData={taskList[0]}
            cantTask={cantTask}
            usuarioId={usuario.user_id}
          />
        </>
      );
    }

    if (nombreTarea === "Aprobar") {
      return (
        <>
          <ChildFormTareaAprobarDetalle
            idAcordion={"Tarea"}
            titleAcordion={"Tareas"}
            cardHeader={"ID tarea : " + taskList[0].id}
            cardTitle={""}
            textButton={"A"}
            body={""}
            routeUrl="routeUrl"
            style={"danger"}
            data={"danger"}
            taskId={idTask ? idTask : ""}
            taskData={taskList[0]}
            cantTask={cantTask}
            usuarioId={usuario.user_id}
          />
        </>
      );
    }
    if (nombreTarea === "Calificar y finalizar") {
      return (
        <>
          <ChildFormTareaCalificarFinalizarDetalle
            idAcordion={"Tarea"}
            titleAcordion={"Tareas"}
            cardHeader={"ID tarea : " + taskList[0].id}
            cardTitle={""}
            textButton={"A"}
            body={""}
            routeUrl="routeUrl"
            style={"danger"}
            data={"danger"}
            taskId={idTask ? idTask : ""}
            taskData={taskList[0]}
            cantTask={cantTask}
            usuarioId={usuario.user_id}
          />
        </>
      );
    }
  };
  return (
    <>
      <NavBar />
      {renderizarTarea()}
    </>
  );
  //#endregion
};

export default TareaDetalleAprobar;
