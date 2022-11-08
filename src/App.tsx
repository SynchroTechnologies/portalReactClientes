import Accordion from "./screean/acordion";
import NavBar from "./screean/navBar";
import RadioButton from "./screean/radioButton";
import CheckBox from "./screean/checkBox";
import DataBsTarget from "./screean/dataBsTarget";
import bonitaLogin from "./components/bonitaLogin";
import fetchBonitaLogin from "./components/fetchBonitaLogin";
import fetchCase from "./components/fetchCase";
import unusedIdFetch from "./components/unusedIdFetch";
import React, { useState, useContext } from "react";
import bonitaCase from "./components/bonitaCase";
import Cookies from "universal-cookie";
import { Cookies as kks } from "react-cookie";
import axios from "axios";
import Lista from "./screean/lista";
import "./App.css";
import NavBarMaster from "./screean/NavBarMaster";

function App() {
  const [serviceLogin, setServiceLogin] = useState("");

  const axioslogin = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(
        process.env.REACT_APP_API_LOGINSERVICE +
          "?username=walter.bates&password=bpm&redirect=true"
      )
      .then((resp) => {
        //console.log("resp JSON.stringif = ", JSON.stringify(resp));
        //setServiceLogin(resp.data);
        let result = resp; //resp.data;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginService = async () => {
    axioslogin();
  };
  const unusedIdFechService = async () => {
    unusedIdFetch();
  };
  const fetchLoginService = async () => {
    fetchBonitaLogin();
  };

  const fetchCases = async () => {
    fetchCase();
  };
  const obtenerCookiesNode = async () => {
    let config = {
      method: "get",
      mode: "no-cors",
      url: "http://localhost:5300/bonita/login",
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    const rst = await axios(config)
      .then(function (res) {
        console.log(" await axios");
        console.log(JSON.stringify(res.data));
        const data_array = JSON.stringify(res.data).split(",");
        console.log(data_array[0].split(":")[1].split(","));
        console.log(data_array[1].split(":")[1].split(","));
        const cok = new kks();
        cok.set("JSESSIONID", data_array[0].split(":")[1].split(","));
        cok.set("JSESSIONIDNODE", data_array[0].split(":")[1].split(","));

        cok.set("X-Bonita-API-Token", data_array[1].split(":")[1].split(","));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  /////////////////////
  const obtenerCase = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;

    ////////////
    axios
      .get(process.env.REACT_APP_GET_CASEFORID + "4001")
      .then((resp) => {
        let result = resp;
        //setestupido(resp.data);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };

  const usuarioActivo = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;

    axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        let result = resp;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  const obtenerProcess = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios
      .get(
        "/bonita/API/bpm/case?p=0&c=10&f=processDefinitionId=6726087166707818640"
      )
      .then((resp) => {
        let result = resp;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  const getCase = async () => {
    const cookies = new Cookies();
    //let JSESSIONID = cookies.get("JSESSIONID");
    let JSESSIONID = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    console.log(
      "JSESSIONID, X_Bonita_API_Token  getcase aqui ",
      JSESSIONID,
      X_Bonita_API_Token
    );

    //console.log("cookies.getAll()", cookies.getAll());
    bonitaCase(JSESSIONID, X_Bonita_API_Token);
  };
  const getProcess = async () => {
    //bonitaLogin();
    obtenerProcess();
  };
  const isLogin = () => {
    let isd = true;
    if (true == true) {
      isd = false;
    }
    return isd;
  };
  return (
    <>
      <div className="App">
        <NavBar />
        <Accordion />
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />
         <Accordion key={"hero.id"} />*/}
        </header>
      </div>
    </>
  );
}

export default App;

/*
      {() => (isLogin() ? <NavBar /> : <></>)}
        <button
          onClick={obtenerCookiesNode}
          type="button"
          className="btn btn-primary"
        >
          Obtener cookies Node
        </button>
        <button
          onClick={fetchLoginService}
          type="button"
          className="btn btn-primary"
        >
          Fetch Login
        </button>
        <button
          onClick={usuarioActivo}
          type="button"
          className="btn btn-primary"
        >
          Axioa usuario activo
        </button>
        <button onClick={fetchCases} type="button" className="btn btn-primary">
          Case fetch
        </button>
        <button
          onClick={loginService}
          type="button"
          className="btn btn-primary"
        >
          Login
        </button>
        <button onClick={obtenerCase} type="button" className="btn btn-primary">
          Get case
        </button>
        <button onClick={getProcess} type="button" className="btn btn-primary">
          Get process
        </button>
*/
