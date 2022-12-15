import React, { useState, useEffect } from "react";
import NavBar from "./navBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ChildFormCasoDetalle from "../components/childFormCasoDetalle";
import { iCase } from "../interfaces/case";
import { iListCaseForClient } from "../interfaces/listCaseClient";
import CasoConDetalle from "./casoConDetalle";
import { BonitaCaseForId, BonitaUsuarioActivo } from "../apis/bonita/ApiBonita";
import { iUsuario } from "../interfaces/usuario";

const CasoDetalle = () => {
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
  const idCaso = query.get("id");
  type caseId = iCase;
  const [caseid, setCaseid] = useState<caseId>();
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);
  const [caseList, setCaseList] = useState<iListCaseForClient[]>([]);
  //const [caseList, setCaseList] = useState([]);

  const [cantTask, setCantTask] = useState(0);
  //setCaseid(data);
  if (idCaso == null) {
    console.log("caso en null");
  }
  const [show, setShow] = useState(false);

  //#region caseForId

  const caseForIdNew = async (id: string) => {
    //setCaseList([]);
    setShow(false);
    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      setShow(false);
      return;
    }

    await BonitaCaseForId(id)
      .then((resp) => {
        let result = resp;
        setCaseid(result.data[0]);
        setCaseList(result.data);

        console.log(result.data);
        setShow(true);
        //return;
      })
      .catch((error: any) => {
        console.log(error);
        setShow(false);
        //return;
      });
    return;
  };
  const caseForId = async (id: string) => {
    setCaseList([]);
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
        setCaseList(result.data);
        console.log(result.data);
        setShow(true);
        return;
      })
      .catch((error: any) => {
        console.log(error);
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

  useEffect(() => {
    usuarioActivo();
    //bonitaUsuarioActivo = BonitaUsuarioActivo();
    //let cet = BonitaGetHumeanTaskUserCase(
    //  usuario.user_id,
    //  idCaso ? idCaso : "0"
    //);
    ////getHumeanTaskUserCase(usuario.user_id, idCaso ? idCaso : "0");
    //console.log({ cet });
  }, []);
  const leerCaso = () => {
    if (idCaso == null || idCaso.length <= 0) {
      return (
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
        </>
      );
    } else {
      if (show) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          usuarioActivo();
          //caseForId(idCaso);
          caseForIdNew(idCaso);
          //getHumeanTaskUserCase(usuario.user_id, idCaso);
          //getHumanTadk("18");
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
                        <CasoConDetalle />
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
          caseForIdNew(idCaso);
          //getHumeanTaskUserCase(usuario.user_id, idCaso);
          //getHumanTadk("18");
        }, []);
        //caseForId(idCaso);
        if (show) {
          if (caseList.length >= 0) {
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
                              <ChildFormCasoDetalle
                                idAcordion={"Incidente"}
                                titleAcordion={"Incidentes"}
                                cardHeader={"ID del Caso : " + caseList[0].id}
                                cardTitle={""}
                                textButton={"A"}
                                body={""}
                                routeUrl="routeUrl"
                                style={"danger"}
                                data={"danger"}
                                casoId={idCaso}
                                caseData={caseList[0]}
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
      {leerCaso()}
    </>
  );
};

export default CasoDetalle;
