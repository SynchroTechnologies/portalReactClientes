import React, { useState, useContext } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import RadioButton from "../screean/radioButton";
import Modals from "../screean/modal";
import AlertDanger from "../screean/alertDanger";
import AlertSuccess from "../screean/alertSuccess";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

interface Props {
  idAcordion: string;
  titleAcordion: string;
  cardHeader: string;
  cardTitle: string;
  body: string;
  textButton: string;
  routeUrl: string;
  style: string;
}

const ChildFormIncidente: React.FC<Props> = ({
  idAcordion,
  titleAcordion,
  cardHeader,
  cardTitle,
  body,
  textButton,
  routeUrl,
  style,
}) => {
  let [processId, setProcessId] = useState("");
  const [alarma, setAlarma] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [creado, setCreado] = useState(false);
  const [show, setShow] = useState(false);
  const [prioridad, setPrioridad] = useState("");

  const Style = `card border-primary mb-${style}`;

  console.log("processId 1", processId);

  const crearIncidente = async (
    sprocessId: string,
    isetProcessId: React.Dispatch<React.SetStateAction<string>>,
    alarma: string,
    descripcion: string,
    prioridad: string
  ) => {
    await getProcessName("ServiceRequest");
    console.log("processId createcase :", sprocessId);
    if (sprocessId === "") {
      console.log("sprocessId vacio ", sprocessId);
      await getProcessName("ServiceRequest");
      //usuarioActivo();
      await createCaseBonitaFechOk(sprocessId);
      console.log("if () :", sprocessId);
    } else {
      console.log(" else createCaseBonitaFechOk:", sprocessId);
      await createCaseBonitaFechOk(sprocessId);
    }
    if (creado) {
      console.log("fin crearIncidente valor de creado", creado);
      showAlert();
    }
  };
  const createCaseBonitaFechOk = async (processId: string) => {
    if (processId === "") {
      console.log("llego vacio el processID : ", processId);
      console.log("¿ Se ha creado ? : ", creado);
      return;
    }
    const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Bonita-API-Token", X_Bonita_API_Token);
    var urlencoded = new URLSearchParams();

    const raw = JSON.stringify({
      serviceRequestInput: {
        alarma: alarma,
        categoria: "DBA",
        ci: "altaicare_4_0_0_OP1108",
        fechaEsperada: "2022-11-03T11:55:00",
        descripcion: descripcion,
        prioridad: prioridad,
        estado: "",
      },
    });
    const rawbkp = JSON.stringify({
      serviceRequestInput: {
        alarma: alarma,
        descripcion: descripcion,
        prioridad: prioridad,
        estado: "",
      },
    });

    const RequestInit: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
    };
    RequestInit.method = "POST";

    const BASE_URL =
      "" +
      process.env.REACT_APP_BASE_URL_API +
      process.env.REACT_APP_POST_CASE +
      processId +
      "/instantiation";
    console.log("RequestInit", RequestInit);

    await fetch(BASE_URL, RequestInit)
      .then((result) => {
        if (!result.ok) {
          console.log("!result.ok", result);
          setCreado(false);
          console.log("¿ Se ha creado ? : ", creado);
          return;
        }

        window.localStorage.setItem(
          "createCaseBonitaFechOk",
          JSON.stringify(result.body)
        );
        setCreado(true);
        console.log("¿ Se ha creado ? : ", creado);
        console.log(result);
        console.log(result.body);
        showAlert();
        return;
      })
      .catch((error) => {
        console.log("error fetch ------", error);
        setCreado(false);
        console.log("¿ Se ha creado ? : ", creado);
        return;
      });
    return;
  };

  const usuarioActivo = async () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;

    await axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        let result = resp;

        console.log(result.data);
        window.localStorage.setItem("usuario", JSON.stringify(result.data));
        let storrageUser = JSON.stringify(
          window.localStorage.getItem("usuario")
        );
        return;
      })
      .catch((error) => {
        console.log(error);

        return;
      });
    return;
  };
  const getProcessName = async (processName: string) => {
    console.log("processName: string", processName);
    if (processName !== "") {
      const cookies = new Cookies();
      let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
      axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios.defaults.withCredentials = true;
      axios.defaults.headers.get["X-Bonita-API-Token"] = X_Bonita_API_Token;
      await axios
        .get(
          "" +
            process.env.REACT_APP_BASE_URL_API +
            process.env.REACT_APP_GET_PROCESSNAME +
            processName
        )
        .then((resp) => {
          setProcessId(resp.data[0].id);
        })
        .catch((error: any) => {
          console.log("processName: string", processName);
          console.log(error);
        });
      return;
    } else {
      console.log("processName: string", processName);
      return;
    }
  };
  const showAlert = () => {
    if (creado) {
      return <AlertSuccess msj={"Incidente creado Numero"} />;
    } else {
      return <AlertDanger msj={"NO pudimos crear el incidente"} />;
    }
  };

  return (
    <div>
      {}

      <div className={Style}>
        <div className="card-header">{cardHeader}</div>
        <div className="card-body">
          <h4 className="card-title">{cardTitle}</h4>
          <p className="card-text">{body}</p>
          <form>
            <fieldset>
              <div className="form-group">
                <p className="form-label mt-1 text-start">Alarma</p>
                <input
                  type="text"
                  className="form-control"
                  id="alarma"
                  placeholder="Ingrese un titulo"
                  autoComplete="off"
                  onChange={(e) => setAlarma(e.target.value)}
                />
              </div>
              <div className="form-group">
                <p className="form-label mt-4 text-start">Descripcion</p>
                <textarea
                  className="form-control"
                  id="exampleTextarea"
                  itemID="descripcion"
                  placeholder="Ingrese la descripcion del incidente lo mas detallado posible"
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <p className="form-label mt-4 text-start">Prioridad</p>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio1"
                    autoComplete="off"
                    onChange={(e) => setPrioridad("Baja")}
                  />
                  <label className="btn btn-outline-info" htmlFor="btnradio1">
                    Baja
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autoComplete="off"
                    onChange={(e) => setPrioridad("Media")}
                  />
                  <label
                    className="btn btn-outline-warning"
                    htmlFor="btnradio2"
                  >
                    Media
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio3"
                    autoComplete="off"
                    onChange={(e) => setPrioridad("Alta")}
                    defaultChecked
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btnradio3"
                  >
                    Alta
                  </label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <button
          onClick={() =>
            crearIncidente(
              processId,
              setProcessId,
              alarma,
              descripcion,
              prioridad
            )
          }
          className="btn btn-primary btn-sm"
        >
          {textButton}
        </button>
      </div>
    </div>
  );
};

export default ChildFormIncidente;
