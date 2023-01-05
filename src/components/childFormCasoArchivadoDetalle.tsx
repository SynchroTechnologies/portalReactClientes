import React, { useState, useEffect } from "react";
import AlertDanger from "../screean/alertDanger";
import AlertSuccess from "../screean/alertSuccess";
import { iCase } from "../interfaces/bonita/case";
import { iListCaseForClient } from "../interfaces/bonita/listCaseClient";
import { formatearFecha } from "./formatoFecha";
import { iComment } from "../interfaces/bonita/comment";
import Icons from "./icons";
import {
  BonitaAddCommentFetch,
  BonitaGetListComment,
  BonitaGetListCommentArchived,
} from "../apis/bonita/ApiBonita";

type caseId = iCase;

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
  caseData: iListCaseForClient;
  casoId: string;
  cantTask: number;
}

const ChildFormCasoArchivadoDetalle: React.FC<Props> = ({
  idAcordion,
  titleAcordion,
  cardHeader,
  cardTitle,
  body,
  textButton,
  routeUrl,
  style,
  data,
  caseData,
  casoId,
  cantTask,
}) => {
  //#region type and useState

  type comment = iComment;
  type listCaseForClient = iListCaseForClient;
  const [listComments, setListComments] = useState<comment[]>([]);

  const [caseid, setCaseid] = useState<iListCaseForClient>();
  const [caseList, setCaseList] = useState<iListCaseForClient[]>([]);
  const [comments, setComments] = useState("");
  const [creado, setCreado] = useState(false);
  const [show, setShow] = useState(false);
  const Style = `card border-primary mb-${style}`;

  //console.log("processId 1", processId);
  console.log({ caseData });
  console.log("data", { data });

  console.log("casoId", { casoId });
  //#endregion

  //#region funciones
  const getComments = async (caseId: string) => {
    getListComment(casoId);
  };

  const getListComment = async (caseId: string) => {
    setListComments([]);
    await BonitaGetListCommentArchived(caseId)
      .then((resp) => {
        const respData = resp.data;
        const listCommentsFilter = respData.filter(
          (comment: iComment) => comment.userId.userName !== "System"
        );

        setListComments(listCommentsFilter);
        console.log("setListComments", resp.data);
        if (resp.data.length === 0) {
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

  //#endregion

  //#region useEffect
  //llamaos al listado de comentaros en el load page
  useEffect(() => {
    getListComment(casoId);
  }, [casoId]);

  //#endregion

  //#region renderListComments
  const renderListComments = listComments.map((list) => (
    <div className="container">
      <div className="row shadow p-2 mb-3 bg-white rounded">
        <div className="col-3">
          {" "}
          <div className="text-start">Fecha posteo</div>
          <div className="text-start">{formatearFecha(list.postDate)} </div>
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
  ));
  const listCommentsMap = (
    <div className="">
      <div className="row">
        <div className="column"></div>
        <div className="column">{renderListComments}</div>
      </div>
    </div>
  );
  //#endregion

  //#region writeCommets
  const writeCommets = (
    <div className="form-group">
      <h5 className="form-label mt-1 text-start">Comentarios</h5>
    </div>
  );
  //#endregion

  //#region form

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
            <p className="form-label mt-1 text-start">
              {caseData.processDefinitionId.displayName}
            </p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            <p className="form-label mt-1 text-start">Iniciado por</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {`${caseData.startedBySubstitute.firstname} ${caseData.startedBySubstitute.lastname}`}
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
              {formatearFecha(caseData.start)}
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
            <p className="form-label mt-1 text-start">{caseData.state}</p>
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
              {formatearFecha(caseData.last_update_date)}
            </p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">Archivado</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {formatearFecha(caseData.end_date)}
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
  //#endregion

  //#region tabComments
  const tabComments = (
    <div id="myTabContent" className="tab-content">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            aria-selected="true"
            role="tab"
            href="#uno"
            onClick={() => getComments(casoId)}
          >
            Refrescar <Icons />
          </a>
        </li>
      </ul>
      {listCommentsMap}
    </div>
  );
  //#endregion

  //#region body
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
      {tabComments}
    </div>
  );
  //#endregion

  //#region
  //#endregion

  return (
    <>
      <div>{bodyCard}</div>
    </>
  );
};

export default ChildFormCasoArchivadoDetalle;
