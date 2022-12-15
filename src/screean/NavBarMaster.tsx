import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";

import React, { useState, useEffect } from "react";

import { iUsuario } from "../interfaces/usuario";
//import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
//import "bootswatch/dist/js/bootstrap";
import "../../src/style/bootswatch/dist/journal/bootstrapDev.css";
import "../../src/style/bootswatch/dist/js/bootstrap";
//import "../App.css";

function NavBarMaster() {
  type iUarioActivo = iUsuario;
  class rs {
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

  const [serviceLogin, setServiceLogin] = useState("");
  const [usuario, setUsuario] = useState<iUarioActivo>();
  const [caseList, setCaseList] = useState([]);

  useEffect(() => {
    //console.log(caseList.forEach((c) => console.log(c)));
  }, [caseList]);

  //#region Login
  const fetchLoginService = async () => {
    loginFetch("walter.bates", "bpm");
    usuarioActivo();

    /*usuario?.branding_version &&
      console.log("is_guest_user", usuario?.branding_version);
    const is_guest_user = (usuario?.branding_version, "que onda");
    console.log("is_guest_user", is_guest_user);*/
  };

  const loginFetch = async (username: string, password: string) => {
    loginFechToBonita(username, password);

    const BASE_URL = process.env.REACT_APP_BASE_URL_API;

    async function loginFechToBonita(username: string, password: string) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", username);
      urlencoded.append("password", password);
      urlencoded.append("redirect", "false");

      const RequestInit: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
        credentials: "include",
      };
      RequestInit.method = "POST";

      const BASE_URL =
        process.env.REACT_APP_BASE_URL_API +
        "" +
        process.env.REACT_APP_API_LOGINSERVICE;

      await fetch(BASE_URL, RequestInit)
        .then((result) => {
          if (!result.ok) {
            setServiceLogin("Error de Login");
            throw Error(result.status.toString());
          }
          /*result.json().then((json) => {
            console.log("result.body jsom = ", json);
          });*/
          setServiceLogin("Login Success " + username);

          console.log(result);
          return result;
        })
        .catch((error) => {
          console.log("error fetch", error);
          return error;
        });
    }
  };
  //#endregion

  //#region logout
  const loginOut = async () => {
    axiosLogOut();
  };
  const axiosLogOut = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get("/bonita/logoutservice?redirect=false")
      .then((resp) => {
        //console.log("resp JSON.stringif = ", JSON.stringify(resp));
        let result = resp; //resp.data;
        setServiceLogin("");
        setUsuario(undefined);
        console.log(result);
      })
      .catch((error) => {
        setServiceLogin(error);
        console.log(error);
      });
  };

  //#endregion

  //#region usuario activo
  const usuarioActivo = async () => {
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
        console.log("rr", usuario ? usuario.branding_version : "sin datos");
        /*const rr: iUsuario = result.data;
        const dataz = defaultSerializer.serialize(result.data);
        console.log("dataz", dataz);
        const name = defaultSerializer.deserializeObject<iUarioActivo>(
          result.data,
          rr
        );
        console.log(
          "name",
          name?.session_id,
          name?.session_id,
          "name?.session_id"
        );*/
        /*let resultdata = jsonConvert.deserializeObject<iUsuario>(result.data);
        let leusuario = jsonConvert.deserializeObject<iUsuario>(usuario);

        console.log(resultdata.branding_version_with_date, "stringify");*/

        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  //#endregion

  //#region case
  const getCase = async () => {
    obtenerCase();
  };
  const obtenerCase = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;

    await axios
      .get(process.env.REACT_APP_GET_CASEFORID + "4001")
      .then((resp) => {
        let result = resp;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  //#endregion

  //#region case-list
  const getCaseList = async () => {
    obtenerCaseList();
    //obtenercomment();
  };
  const obtenerCaseList = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(
        "/bonita/portal/resource/app/userAppBonita/case-list/API/bpm/case?c=10&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=4&n=activeFlowNodes&n=failedFlowNodes&t=0"
      )
      .then((resp) => {
        let result = resp;
        setCaseList(result.data);
        console.log(result.data);
        console.log(caseList.forEach((c) => console.log(c)));

        console.log(result.data[0]);
        const esta =
          result &&
          result.data &&
          result.data.map((element: any, index: any) => {
            console.log("result.data", element);
            console.log(
              "result.data.json.stringfy",
              JSON.stringify(element, null, "---")
            );
          });
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand pb-2" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href=""
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                Dropdown{" "}
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li className="dropdown-submenu">
                  <a className="dropdown-item dropdown-toggle" href="">
                    Google
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Submenu
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Submenu0
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item dropdown-toggle" href="#">
                        Submenu 1
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Subsubmenu1
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Subsubmenu1
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item dropdown-toggle" href="#">
                        Submenu 2
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Subsubmenu2
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Subsubmenu2
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBarMaster;
