import React, { useState, useContext } from "react";
import Cookies from "universal-cookie";
import NavBar from "./navBar";
import axios from "axios";
import ChildFormIncidente from "../components/childFormIncidente";
import Modals from "./modal";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

function NuevoIncidente() {
  let [processId, setProcessId] = useState("");
  const [show, setShow] = useState(false);
  const showModal = (view: boolean) => {
    setShow(view);
  };

  return (
    <>
      <div className="App">
        <NavBar />
        <div>
          <div className="container ">
            <div className="row shadow p-2 mb-3 bg-white rounded">
              <div className="row">
                <div className="col">
                  {" "}
                  <div></div>
                  <div>
                    {" "}
                    <ChildFormIncidente
                      idAcordion={"Incidente"}
                      titleAcordion={"Incidentes"}
                      cardHeader={"Formulario de inicio de incidente"}
                      cardTitle={""}
                      body={""}
                      textButton={"Iniciar incidente"}
                      routeUrl="routeUrl"
                      style={"danger"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*      <div>
            <Modals id={"vemos o no el modal "} isShow={true} />{" "}
          </div>*/}
        </div>

        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />
         <Accordion key={"hero.id"} />*/}
        </header>
      </div>
    </>
  );
}

export default NuevoIncidente;

async function createcase(
  sprocessId: string,
  setProcessId: React.Dispatch<React.SetStateAction<string>>
) {
  await usuarioActivo;
  console.log("sprocessId 1", sprocessId);
  await getProcessName("ServiceRequest");

  await createCaseBonitaFechOk(sprocessId.toString());
  console.log("sprocessId.toString() 1", sprocessId);

  async function usuarioActivo() {
    class usuarioActivo {
      "copyright": string;
      "is_guest_user": string;
      "branding_version": string;
      "branding_version_with_date": string;
      "user_id": string;
      "user_name": string;
      "session_id": string;
      "conf": string;
      "is_technical_user": string;
      "version": string;
    }
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;

    await axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        let result = resp;
        //setUsuario(result.data);

        console.log(result.data);
        window.localStorage.setItem("usuario", JSON.stringify(result.data));
        let storrageUser = JSON.stringify(
          window.localStorage.getItem("usuario")
        );
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  }
  async function createCaseBonitaFechOk(processId: string) {
    console.log("processId", processId);
    const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    console.log(X_Bonita_API_Token);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Bonita-API-Token", X_Bonita_API_Token);
    var urlencoded = new URLSearchParams();

    const raw = JSON.stringify({
      serviceRequestInput: {
        alarma: "ida hoyincidente 31102022",
        descripcion: "dia hoy 31102022 inicidente",
        prioridad: "Alta",
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
          return;
        }
        window.localStorage.setItem(
          "createCaseBonitaFechOk",
          JSON.stringify(result.body)
        );
        console.log(result);
        console.log(result.body);
        return;
      })
      .catch((error) => {
        //window.localStorage.removeItem("setServiceLogin");
        //window.localStorage.removeItem("usuario");
        console.log("error fetch ------", error);
        return;
      });
  }

  async function getProcessName(processName: string) {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.get["X-Bonita-API-Token"] = X_Bonita_API_Token;
    await axios
      .get("" + process.env.REACT_APP_GET_PROCESSNAME + processName)
      .then((resp) => {
        let result = resp;
        setProcessId(resp.data[0].id);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  }
  async function createCaseAxios2(processId: string) {
    const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    let data = JSON.stringify({
      serviceRequestInput: {
        alarma: "incidente 31102022",
        descripcion: "31102022 inicidente",
        prioridad: "Baja",
        estado: "",
      },
    });

    var config = {
      method: "post",
      url:
        "http://localhost:8080/bonita/API/bpm/process/" +
        processId +
        "/instantiation",
      headers: {
        "X-Bonita-API-Token": X_Bonita_API_Token,
        "Content-Type": "application/json",
        Cookie:
          "bonita.tenant=1; BOS_Locale=es; Cookie_1=value; X-Bonita-API-Token=" +
          X_Bonita_API_Token,
      },
      data: data,
    };

    console.log("----dddJSON.stringify(config)", JSON.stringify(config));
    await axios(config)
      .then((resp) => {
        let result = resp;
        //setArchivedCaseList(result.data);
        console.log("createCaseAxios2 resp ", result);
        if (result.data.length == 0) {
          console.log("lista vacia");
          //setShow(true);
        } else {
          //setShow(false);
        }
      })
      .catch((error: any) => {
        //setShow(true);
        console.log("createCaseAxios2 error ", error);
      });
    return;
  }
  async function createCaseAxios(processId: string) {
    console.log(" createCaseAxios processId", processId);
    const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    console.log(X_Bonita_API_Token);
    const BASE_URL =
      "" + process.env.REACT_APP_POST_CASE + +processId + "/instantiation";
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["X-Bonita-API-Token"] = X_Bonita_API_Token;
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    let data = JSON.stringify({
      serviceRequestInput: {
        alarma: "incidente 31102022",
        descripcion: "31102022 inicidente",
        prioridad: "Baja",
        estado: "",
      },
    });
    //axios.defaults.data = data;

    await axios
      .post(BASE_URL, data)
      .then((resp) => {
        let result = resp;
        //setArchivedCaseList(result.data);
        console.log("createCaseAxios resp ", result);
        if (result.data.length == 0) {
          console.log("lista vacia");
          //setShow(true);
        } else {
          //setShow(false);
        }
      })
      .catch((error: any) => {
        //setShow(true);
        console.log("createCaseAxios error ", error);
      });
    return;
  }
}
