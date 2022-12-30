import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertDanger from "../screean/alertDanger";
import AlertSuccess from "../screean/alertSuccess";
import { formatearFecha } from "./formatoFecha";
import { iComment } from "../interfaces/bonita/comment";
import { iContratoMasInformacion } from "../interfaces/bonita/contratoMasInformacion";
import Icons from "./icons";
import {
  BonitaAddCommentFetch,
  BonitaGetListComment,
  BonitaGetSetParametros,
  BonitaGetSetServiceRequest,
  BonitaGetTaskAndContext,
  BonitaPostPutTaskFetch,
  BonitaPutTaskById,
  BonitaPutTaskByIdState,
} from "../apis/bonita/ApiBonita";
import { iListTaskHumanUserId } from "../interfaces/bonita/listTaskHumanUserId";
import { iTaskContext } from "../interfaces/bonita/taskContext";
import { iServiceRequestTask } from "../interfaces/bonita/serviceRequestTask";
import { iParametrosTask } from "../interfaces/bonita/parametrosTask";
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
  usuarioId: string;
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
  usuarioId,
}) => {
  type comment_ = iComment;
  let putTask = "";
  const [disable, setDisable] = React.useState(true);
  const [disableBtn, setDisableBtn] = React.useState(true);
  const [isTomar, setIsTomar] = React.useState(true);

  const [listComments, setListComments] = useState<comment_[]>([]);
  const [comments, setComments] = useState("");
  const [creado, setCreado] = useState(false);
  const [show, setShow] = useState(false);
  type taskContexts = iTaskContext;
  const [taskContext, setTaskContext] = useState<taskContexts>();
  type parametrosTask_ = iParametrosTask;
  const [parametrosTask, setParametrosTask] = useState<parametrosTask_>();
  type serviceRequestTask_ = iServiceRequestTask;
  const [serviceRequestTask, setServiceRequestTask] =
    useState<serviceRequestTask_>();
  const [parametros_refStorageId, setParametros_refStorageId] = useState("");
  const [serviceRequest_refStorageId, setServiceRequest_refStorageId] =
    useState("");
  const Style = `card border-primary mb-${style}`;

  const addComment = async (caseId: string, comment: string) => {
    if (comments.length > 20) {
      await addCommentFetch(caseId, comment);
      //await putTaskByIdCompleted(usuarioId, taskId, comment);
    } else {
      console.log("comments.length: ", comments.length);
    }

    await getListComment(caseId);
  };

  const send = async (caseId: string, comment: string) => {
    if (comments.length > 20) {
      await addCommentFetch(caseId, comment);
      await putTaskByIdCompleted(usuarioId, taskId, comment);
    } else {
      console.log("comments.length: ", comments.length);
    }

    await getListComment(caseId);

    if (creado) {
      console.log({ creado });
      showAlert();
    }
    setTimeout(function () {
      navigateTo("/app");
    }, 4000);
  };
  const getComments = async (caseId: string) => {
    getListComment(caseId);
  };

  const addCommentFetch = async (caseId: string, comments: string) => {
    await BonitaAddCommentFetch(caseId, comments)
      .then((result) => {
        if (!result.ok) {
          console.log("!result.ok", result);
          //setCreado(false);
          return;
        }
        window.localStorage.setItem(
          "addCommentFetch",
          JSON.stringify(result.body)
        );
        //setCreado(true);
        console.log(result.body);

        return;
      })
      .catch((error) => {
        console.log("error fetch ------", error);
        //setCreado(false);
        return;
      });
    return;
  };

  const getListComment = async (caseId: string) => {
    await BonitaGetListComment(caseId)
      .then((resp) => {
        const respData = resp.data;
        const listCommentsFilter = respData.filter(
          (comment: iComment) => comment.userId.userName !== "System"
        );
        setListComments(listCommentsFilter);
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

  const getTaskContext = async (taskId: string) => {
    await BonitaGetTaskAndContext(taskId)
      .then((resp) => {
        if (resp.status === 200) {
          setTaskContext(resp.data);
          window.localStorage.setItem(
            "getTaskContext",
            JSON.stringify(resp.data)
          );
          window.localStorage.setItem(
            "setServiceRequest_refStorageId",
            JSON.stringify(resp.data.serviceRequest_ref.storageId)
          );
          window.localStorage.setItem(
            "setParametros_refStorageId",
            JSON.stringify(resp.data.parametros_ref.storageId)
          );
          //setParametros_refStorageId(resp.data.estimar22_ref.storageId_string);
          //setServiceRequest_refStorageId(
          //  resp.data.parametros22_ref.storageId_string
          //);
        }

        //getSetParametros(resp.data.parametros22_ref.storageId_string);
        //getSetServiceRequest(resp.data.estimar22_ref.storageId_string);
      })
      .catch((error: any) => {
        setShow(true);
        console.log(error);
      });
  };

  const getSetServiceRequest = async (storageId: string) => {
    await BonitaGetSetServiceRequest(storageId) //2964
      .then((resp) => {
        if (resp.status === 200) {
          setServiceRequestTask(resp.data);
          window.localStorage.setItem(
            "getSetServiceRequest",
            JSON.stringify(resp.data)
          );
          //setParametros_refStorageId(resp.data.parametros_ref.storageId);
          //setServiceRequest_refStorageId(
          //  resp.data.serviceRequest_ref.storageId
          //);
        }
        //console.log("getSetServiceRequest", resp.data);
      })
      .catch((error: any) => {
        setShow(true);
        console.log(error);
      });
  };
  const getSetParametros = async (storageId: string) => {
    await BonitaGetSetParametros(storageId) //("2987")
      .then((resp) => {
        if (resp.status === 200) {
          setParametrosTask(resp.data);
          window.localStorage.setItem(
            "getSetParametros",
            JSON.stringify(resp.data)
          );
        }
        console.log("getSetParametros", resp.data);
      })
      .catch((error: any) => {
        setShow(true);
        console.log(error);
      });
  };
  const navigate = useNavigate();

  const navigateTo = (routeUrl: string) => {
    const url = "/tarea-detalle/?id=" + routeUrl;
    console.log(url);
    navigate(routeUrl);
    // navigate(`/tarea-detalle/?id=${routeUrl}`);
  };
  //#region putTaskById
  const liberar = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await putTaskById("", taskId);
    setDisable(!disable);
    setDisableBtn(!disable);
    //navigateTo("/tarea-detalle/?id=" + taskId);
  };
  const tomar = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await putTaskById(usuarioId, taskId);

    console.log({ taskId });

    //navigateTo("/tarea-detalle/?id=" + taskId);
  };
  const completar = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await putTaskById("", taskId);
  };
  const isTomars = () => {
    console.log("taskData.assigned_id :", taskData.assigned_id);
    if (taskData.assigned_id !== "") {
      setIsTomar(true);
      setDisable(false);

      setDisableBtn(false);
    } else {
      setIsTomar(false);
      setDisable(true);

      setDisableBtn(false);
    }
  };
  const putTaskById = async (user_id: string, task_id: string) => {
    console.log({ user_id }, { task_id });
    putTask = user_id;
    await BonitaPutTaskById(user_id, task_id)
      .then((result) => {
        if (!result.ok) {
          console.log("!result.ok", result);
          return;
        }
        window.localStorage.setItem("putTaskById", JSON.stringify(result.body));
        console.log({ result });
        setDisable(!disable);
        setIsTomar(true);
        setDisableBtn(disable);
        return;
      })
      .catch((error) => {
        console.log("error fetch ------", error);
        return;
      });
    return;
  };
  const putTaskByIdCompleted = async (
    user_id: string,
    task_id: string,
    comment: string
  ) => {
    let contratoMasInformacion: iContratoMasInformacion = {
      state: "completed",
      serviceRequestInput: {
        notas: comment,
      },
    };
    console.log({ user_id }, { task_id });
    putTask = user_id;
    await BonitaPostPutTaskFetch(contratoMasInformacion, user_id, task_id)
      .then((result) => {
        if (!result) {
          setCreado(false);
          setDisable(false);
          console.log("!result.ok", result);
          return;
        }
        setCreado(true);
        setDisable(true);
        setComments("");
        window.localStorage.setItem(
          "putTaskByIdCompleted",
          JSON.stringify(result)
        );
        console.log({ result });
        return;
      })
      .catch((error) => {
        console.log("error fetch ------", error);
        setCreado(false);
        setDisable(false);
        return;
      });
    return;
  };
  //#endregion

  //llamaos al listado de comentaros en el load page
  useEffect(() => {
    const a1 = async () => {
      await getListComment(taskData.caseId);
    };
    a1();
    const a2 = async () => {
      await getTaskContext(taskId);
    };
    a2();

    const a3 = async () => {
      await getSetParametros(
        window.localStorage.getItem("setParametros_refStorageId") + ""
      );
    };
    a3();
    const a4 = async () => {
      await getSetServiceRequest(
        window.localStorage.getItem("setServiceRequest_refStorageId") + ""
      );
    };
    a4();
    isTomars();
  }, [taskData.caseId]);

  useEffect(() => {
    if (comments.length > 20) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [comments.length]);

  const showAlert = () => {
    if (creado) {
      return <AlertSuccess msj={"Tarea completada"} />;
    } else {
      return <></>;
    }
  };
  const asignada = () => {
    return (
      <>
        {" "}
        <button
          disabled={isTomar}
          onClick={tomar}
          className="btn btn-primary btn-sm"
        >
          Tomar
        </button>{" "}
      </>
    );
    /*if (taskData.assigned_id === "") {
      return (
        <button onClick={tomar} className="btn btn-primary btn-sm">
          Tomar {taskId}
        </button>
      );
    } else {
      return (
        <button onClick={liberar} className="btn btn-success btn-sm">
          Liberar {taskId}
        </button>
      );
    }*/
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
            onClick={() => getComments(taskData.caseId)}
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
        disabled={disable}
        className="form-control"
        id="exampleTextarea"
        itemID="descripcion"
        placeholder="Ingrese sus comentarios, mas de 20 caracteres"
        onChange={(e) => setComments(e.target.value)}
      ></textarea>
    </div>
  );

  const formData = (
    <form>
      <fieldset>
        {showAlert()}
        <div>{asignada()}</div>
        <div className="form-group">
          <div className="btn-group d-flex justify-content-between col-4">
            <h5 className="form-label mt-1 text-start">
              {taskData.displayName}
            </h5>

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
            <p className="form-label mt-1 text-start">Cliente</p>
          </div>
          <div className="col">
            <p className="form-label mt-1 text-start">{`${parametrosTask?.nombre_cliente}`}</p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            <p className="form-label mt-1 text-start">Titulo</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {`${serviceRequestTask?.alarma}`}
            </p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            <p className="form-label mt-1 text-start">Descripcion</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {`${serviceRequestTask?.descripcion}`}
            </p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            <p className="form-label mt-1 text-start">Prioridad</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {`${serviceRequestTask?.prioridad}`}
            </p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            <p className="form-label mt-1 text-start">Categoria</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {`${serviceRequestTask?.categoria}`}
            </p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">Estado</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {serviceRequestTask?.estado}
            </p>
          </div>
        </div>
        <div className="d-flex col">
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">Fecha esperada</p>
          </div>
          <div className="col">
            {" "}
            <p className="form-label mt-1 text-start">
              {formatearFecha("" + serviceRequestTask?.fechaEsperada)}
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
        disabled={disableBtn}
        id="btnAddComment"
        onClick={() => send(taskData.caseId, comments)}
        className="btn btn-primary btn-sm"
      >
        Enviar
      </button>
      <button
        disabled={disableBtn}
        id="btnAddComment"
        onClick={() => addComment(taskData.caseId, comments)}
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
