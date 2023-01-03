import React, { useState } from "react";
import { useNavigate } from "react-router";
import { BonitaPutTaskById } from "../apis/bonita/ApiBonita";
import { iListTaskHumanCompleteUser } from "../interfaces/bonita/listTaskHumanCompleteUser";
import { iListTaskHumanMyUser } from "../interfaces/bonita/listTaskHumanMyUser";
import { iListTaskHumanUserId } from "../interfaces/bonita/listTaskHumanUserId";
import { iUsuario } from "../interfaces/bonita/usuario";
interface Props {
  casoId: string;
}
const BarTomarLiberarVer: React.FC<Props> = ({ casoId }) => {
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

  const [isTomar, setIsTomar] = React.useState(true);
  const [isLiberar, setLiberar] = React.useState(true);
  const liberar = (
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: string,
    getBonita: string
  ) => {
    event.preventDefault();
    putTaskById("", taskId);
    setIsTomar(!isTomar);
    setLiberar(!isLiberar);
    switchGetBonita(getBonita);
  };

  type _iListTaskHumanMyUser = iListTaskHumanMyUser;
  type _iListTaskHumanCompleteUser = iListTaskHumanCompleteUser;
  type _listTaskHumanUserId = iListTaskHumanUserId;

  const [show, setShow] = useState(false);
  let [listTaskHumanUserId, SetlistTaskHumanUserId] = useState<
    _listTaskHumanUserId[]
  >([]);
  const [listTaskHumanMyUser, setListTaskHumanMyUser] = useState<
    _iListTaskHumanMyUser[]
  >([]);

  const [listTaskHumanCompleteUser, setListTaskHumanCompleteUser] = useState<
    _iListTaskHumanCompleteUser[]
  >([]);

  let allTask: _iListTaskHumanCompleteUser[] = [];

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);
  const tomar = (
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: string,
    getBonita: string
  ) => {
    event.preventDefault();
    putTaskById(usuario.user_id, taskId);
    setLiberar(!isLiberar);
    setIsTomar(!isTomar);
    switchGetBonita(getBonita);
  };
  const navigateTo = (taskId: string, taskName: string) => {
    let url = `/tarea-detalle/?id=${taskId}`;
    console.log(url, taskName);
    switch (taskName) {
      case "Mas Información":
        return navigate(`/tarea-detalle-mas-informacion/?id=${taskId}`);
      case "Aprobación":
        return navigate(`/tarea-detalle-aprobar/?id=${taskId}`);
      case "Calificar y finalizar":
        return navigate(`/tarea-detalle-calificar-finalizar/?id=${taskId}`);
      default:
        navigate(`/tarea-detalle/?id=${taskId}`);
    }
  };
  const switchGetBonita = (getBonita: string) => {
    switch (getBonita) {
      case "getTaskHumanOpenByCase":
      //return getTaskHumanOpenByCase(usuario.user_id, casoId);

      case "getTaskHumanMyUserByCase":
      //return getTaskHumanMyUserByCase(usuario.user_id, casoId);

      case "getTaskHumanCompleteUserByCase":
      //return getTaskHumanCompleteUserByCase(usuario.user_id, casoId);

      default:
      // return getTaskHumanOpenByCase(usuario.user_id, casoId);
    }
  };
  const putTaskById = async (user_id: string, task_id: string) => {
    console.log({ user_id }, { task_id });
    await BonitaPutTaskById(user_id, task_id)
      .then((result) => {
        if (!result.ok) {
          console.log("!result.ok", result);
          return;
        }
        window.localStorage.setItem("putTaskById", JSON.stringify(result.body));
        console.log({ result });
        setIsTomar(!isTomar);
        setLiberar(!isLiberar);
        return;
      })
      .catch((error) => {
        console.log("error fetch ------", error);
        return;
      });
    return;
  };
  const asignada = (
    assigned_id: string,
    taskId: string,
    taskName: string,
    getBonita: string
  ) => {
    return (
      <>
        <div>
          <br />
          <button
            disabled={assigned_id === "" ? true : false}
            onClick={(e) => liberar(e, taskId, getBonita)}
            className="btn btn-success btn-sm"
          >
            Liberar
          </button>
        </div>
        <div>
          <br />
          <button
            disabled={assigned_id !== "" ? true : false}
            onClick={(e) => tomar(e, taskId, getBonita)}
            className="btn btn-primary btn-sm"
          >
            Tomar
          </button>
        </div>
        <div>
          <br />
          <button
            onClick={() => navigateTo(taskId, taskName)}
            className="btn btn-outline-info btn-sm align-text-bottom"
          >
            Ver
          </button>
        </div>
      </>
    );
  };
  return <>{asignada}</>;
};

export default BarTomarLiberarVer;
