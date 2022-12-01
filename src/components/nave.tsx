import { Link, redirect } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { Cookies as kks } from "react-cookie";
import axios, { AxiosResponse } from "axios";
import fetchBonitaLogin from "../components/fetchBonitaLogin";
import fetchCase from "../components/fetchCase";
import unusedIdFetch from "../components/unusedIdFetch";

import { useNavigate } from "react-router-dom";
import { iUsuario } from "../interfaces/usuario";
import bonitaCase from "../components/bonitaCase";
import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
//import "bootswatch/dist/js/bootstrap";

import "../../src/style/bootswatch/dist/js/bootstrap";

import { idText } from "typescript";

const ButtonComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    //fetchLoginService;

    navigate("/app");
  };
  //#region tipos y clases

  const mapDiv = useRef("--");
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputPass, setInputpPass] = useState("");
  const count = useRef(45);

  let title = React.createRef();
  let refUsuario = useRef(null);
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
  //#region
  //#region Login
  const fetchLoginService = async () => {
    loginFetch(inputUsuario, inputPass);
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
          setServiceLogin("Login Success");

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
        console.log(result.data);
        //handleClick;
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  //#endregion

  return (
    <div>
      <button className="btn btn-succes" onClick={handleClick}>
        Ingresar
      </button>
    </div>
  );
};

export default ButtonComponent;
