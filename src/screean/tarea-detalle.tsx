import React, { useState, useEffect } from "react";
import NavBar from "./navBar";
import { useLocation } from "react-router-dom";
import { iCase } from "../interfaces/case";
import { iListCaseForClient } from "../interfaces/listCaseClient";
import { BonitaTaskById, BonitaUsuarioActivo } from "../apis/bonita/ApiBonita";
import { iUsuario } from "../interfaces/usuario";
import ChildFormTareaDetalle from "../components/childFormTareaDetalle";
import TareaConDetalle from "./tareaConDetalle";
import { iListTaskHumanUserId } from "../interfaces/listTaskHumanUserId";

const TareaDetalle = () => {
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
  const idTask = query.get("id");
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
        let result = resp;
        setTaskId(result.data[0]);
        setTaskList(result.data);
        console.log(result.data);
        setShow(true);
      })
      .catch((error: any) => {
        console.log(error);
        setShow(false);
      });
    return;
  };

  //#endregion

  //#region usuario activo
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
    //const localStorageUsuario = window.localStorage.getItem("usuario");
    //const user_id = localStorageUsuario?.split(",")[4].split(":")[1];
    //usuario.user_id = user_id ? user_id : "0";
    /*
    return;
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        let result = resp;
        setUsuario(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return;*/
  };
  //#endregion

  //#region useEffect
  useEffect(() => {
    console.log("useEffect(()useEffect(()useEffect(()");
    const usuario = async () => {
      console.log("useEffect(()useEffect(()useEffect(()");
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
          usuarioActivo();
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
                        <TareaConDetalle />
                      </div>
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
          usuarioActivo();
          //caseForId(idCaso);
          taskById(idTask);
          //getHumeanTaskUserCase(usuario.user_id, idCaso);
          //getHumanTadk("18");
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
                              {" "}
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
                                taskId={idTask}
                                taskData={taskList[0]}
                                cantTask={cantTask}
                              />
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

  return (
    <>
      <NavBar />
      {renderizarTarea()}
    </>
  );
  //#endregion
};

export default TareaDetalle;
