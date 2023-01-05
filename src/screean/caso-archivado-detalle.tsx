import React, { useState, useEffect } from "react";
import NavBar from "./navBar";
import { useLocation } from "react-router-dom";
import { iCase } from "../interfaces/bonita/case";
import { iListCaseForClient } from "../interfaces/bonita/listCaseClient";
import CasoConDetalle from "./casoConDetalle";
import {
  BonitaCaseArchivedForId,
  BonitaCaseForId,
  BonitaUsuarioActivo,
} from "../apis/bonita/ApiBonita";
import { iUsuario } from "../interfaces/bonita/usuario";
import CasoArchivadoConDetalle from "./casoArchivadoConDetalle";
import ChildFormCasoArchivadoDetalle from "../components/childFormCasoArchivadoDetalle";

const CasoArchivadoDetalle = () => {
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

  const caseById = async (id: string) => {
    setShow(false);
    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      setShow(false);
      return;
    }

    await BonitaCaseArchivedForId(id)
      .then((resp) => {
        if (resp.status === 200) {
          setCaseid(resp.data[0]);
          setCaseList(resp.data);
          console.log(resp.data);
          setShow(true);
        } else {
          setShow(false);
        }
        //return;
      })
      .catch((error: any) => {
        console.log(error);
        setShow(false);
        //return;
      });
    return;
  };
  //#endregion

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

  //#region useEffect
  useEffect(() => {
    usuarioActivo();
  }, []);
  //#endregion

  //#region renderizacion
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
          caseById(idCaso);
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
                        <CasoArchivadoConDetalle />
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
          caseById(idCaso);
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
                              <ChildFormCasoArchivadoDetalle
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
  //#endregion
};

export default CasoArchivadoDetalle;
