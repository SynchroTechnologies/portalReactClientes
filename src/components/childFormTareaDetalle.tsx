import React, { useState, useEffect } from "react";
import AlertDanger from "../screean/alertDanger";
import AlertSuccess from "../screean/alertSuccess";
import { iCase } from "../interfaces/case";
import { iListCaseForClient } from "../interfaces/listCaseClient";
import { formatearFecha } from "./formatoFecha";
import { iComment } from "../interfaces/comment";
import Icons from "./icons";
import {
  BonitaAddCommentFetch,
  BonitaCaseForId,
  BonitaGetListComment,
} from "../apis/bonita/ApiBonita";
import { iListTaskHumanUserId } from "../interfaces/listTaskHumanUserId";

interface Props {
  idAcordion: string;
  titleAcordion: string;
  cardHeader: string;
  cardTitle: string;
  body: string;
  textButton: string;
  routeUrl: string;
  style: string;
  data: string;
  taskData: iListTaskHumanUserId;
  taskId: string;
  cantTask: number;
}

const ChildFormTareaDetalle: React.FC<Props> = ({
  idAcordion,
  titleAcordion,
  cardHeader,
  cardTitle,
  body,
  textButton,
  routeUrl,
  style,
  data,
  taskData,
  taskId,
  cantTask,
}) => {
  type comment = iComment;
  type listCaseForClient = iListCaseForClient;
  const [listComments, setListComments] = useState<comment[]>([]);

  const [caseid, setCaseid] = useState<iListCaseForClient>();
  const [caseList, setCaseList] = useState<iListCaseForClient[]>([]);
  const [comments, setComments] = useState("");
  const [creado, setCreado] = useState(false);
  const [show, setShow] = useState(false);
  const Style = `card border-primary mb-${style}`;

  const addComment = async (caseId: string, comment: string) => {
    await addCommentFetch(taskId, comment);
    await getListComment(taskId);
  };

  const getComments = async (caseId: string) => {
    getListComment(taskId);
  };

  const addCommentFetch = async (caseId: string, comments: string) => {
    await BonitaAddCommentFetch(caseId, comments)
      .then((result) => {
        if (!result.ok) {
          console.log("!result.ok", result);
          setCreado(false);
          return;
        }
        window.localStorage.setItem(
          "addCommentFetch",
          JSON.stringify(result.body)
        );
        setCreado(true);
        console.log(result.body);
        showAlert();
        return;
      })
      .catch((error) => {
        console.log("error fetch ------", error);
        setCreado(false);
        return;
      });
    return;
  };
  const getListComment = async (caseId: string) => {
    await BonitaGetListComment(caseId)
      .then((resp) => {
        let result = resp;
        setListComments(result.data);
        console.log("setListComments", result.data);
        if (result.data.length === 0) {
          console.log("lista vacia");
        } else {
          //setShow(false);
        }
      })
      .catch((error: any) => {
        setShow(true);
        setListComments([]);
        console.log(error);
      });
  };
  const caseForIdb = async (id: string) => {
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
        setCaseid(result.data);
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
  //llamaos al listado de comentaros en el load page
  useEffect(() => {
    getListComment(taskId);
    //caseForIdb(casoId);
  }, [taskId]);
  useEffect(() => {
    //caseForIdb(casoId);
    //console.log("caseList, caseData ", { caseList, caseData });
  }, [taskId, listComments]);

  const showAlert = () => {
    if (creado) {
      return <AlertSuccess msj={"Incidente creado Numero"} />;
    } else {
      return <AlertDanger msj={"NO pudimos crear el incidente"} />;
    }
  };
  const listCommentsMap = (
    <div className="">
      <div className="row">
        <div className="column"></div>
        <div className="column">
          {listComments.map((list) => (
            <div className="container">
              <div className="row shadow p-2 mb-3 bg-white rounded">
                <div className="col-3">
                  {" "}
                  <div className="text-start">Fecha posteo</div>
                  <div className="text-start">
                    {formatearFecha(list.postDate)}{" "}
                  </div>
                </div>

                <div className="col-2">
                  <div className="text-start">Autor </div>
                  <div className="text-start">
                    {" "}
                    {list.userId.firstname} {list.userId.lastname}{" "}
                  </div>
                </div>
                <div className="col-7">
                  <div className="text-start"> Comentario </div>
                  <div className="text-start">{list.content} </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  const tabComments = (
    <div id="myTabContent" className="tab-content">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            aria-selected="true"
            role="tab"
            onClick={() => getComments(taskId)}
          >
            Refrescar <Icons />
          </a>
        </li>
      </ul>
      {listCommentsMap}
    </div>
  );
  const writeCommets = (
    <div className="form-group">
      <h5 className="form-label mt-1 text-start">Comentarios</h5>
      <textarea
        className="form-control"
        id="exampleTextarea"
        itemID="descripcion"
        placeholder="Ingrese sus comentarios"
        onChange={(e) => setComments(e.target.value)}
      ></textarea>
    </div>
  );
  const formData = (
    <form>
      <fieldset>
        <div className="form-group">
          <div className="btn-group d-flex justify-content-between col-2">
            <h5 className="form-label mt-1 text-start">General</h5>
            <p className="form-label mt-1 text-start"></p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            <p className="form-label mt-1 text-start">
              {"Nombre de proceso (version)"}
            </p>
          </div>
          <div className="col">
            <p className="form-label mt-1 text-start">{taskData.description}</p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            <p className="form-label mt-1 text-start">Iniciado por</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {`${taskData.executedBySubstitute} ${taskData.executedBySubstitute}`}
            </p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">Iniciado el</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {formatearFecha(taskData.assigned_date)}
            </p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">Status</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">{taskData.state}</p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">Última actualización</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {formatearFecha(taskData.last_update_date)}
            </p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">Tareas disponibles</p>
          </div>
          <div className="col">
            <p className="form-label mt-1 text-start">
              <a href="/tareas">{cantTask}</a>
            </p>
          </div>
        </div>
        {writeCommets}
      </fieldset>
    </form>
  );
  const bodyCard = (
    <div className={Style}>
      <div></div>
      <div> {cardTitle}</div>
      <div className="card-header">{cardHeader}</div>
      <div className="card-body">
        <h4 className="card-title">{cardTitle}</h4>
        <p className="card-text"></p>
        {formData}
      </div>

      <button
        onClick={() => addComment(taskId, comments)}
        className="btn btn-primary btn-sm"
      >
        {textButton}
      </button>
      {tabComments}
    </div>
  );

  return (
    <>
      <div>{bodyCard}</div>
    </>
  );
};

export default ChildFormTareaDetalle;
