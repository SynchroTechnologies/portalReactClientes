/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse } from "axios";
import axios from "axios";

import { AppStore } from "../../redux/store";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import { useContext, useState } from "react";
import {
  createSessionToken,
  resetSessionToken,
} from "../../redux/states/sessionTokenGlpi.state";
//const dispatch = useDispatch();
const callDispatchs = async (data: any, action: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  console.log("eslint-disable-next-line react-hooks/rules-of-hooks");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //const sessionTokenGlpiSlice = useSelector(
  //  (store: AppStore) => store.sessionTokenGlpiSlice
  //);
  console.log("eslint-disable-next-line react-hooks/rules-of-hooks");

  console.log("eslint-disable-next-line react-hooks/rules-of-hooks");

  switch (action) {
    case "createSessionToken":
      dispatch(createSessionToken(data));
      return;
    case "resetSessionToken":
      dispatch(resetSessionToken());
      return;

    default:
      return;
  }
  //throw new Error("Function not implemented.");
};
export const Glpi_Login = async () => {
  console.log("export const Glpi_Login = ");

  console.log("ingreso a export const loginGlpi = ");
  axios.defaults.baseURL = "https://glpi.apps.synchro.com.ar";
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  // axios.defaults.headers.post["Authorization"] =
  //  "'user_token' Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ";
  //axios.defaults.headers.post["App-Token"] =
  //  "Pgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA";

  axios.defaults.headers.get["Content-Type"] = "application/json;charset=utf-8";
  axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.get["Authorization"] =
    "" + process.env.REACT_APP_GLPI_AUTHORIZATION;
  axios.defaults.headers.get["App-Token"] =
    "" + process.env.REACT_APP_GLPI_TOKEN;

  console.log(" axios.defaults.headers", axios);
  console.log(" axios", JSON.stringify(axios.defaults.headers.get));

  console.log(
    " process.env.REACT_APP_GLPI_AUTHORIZATION",
    process.env.REACT_APP_GLPI_AUTHORIZATION
  );

  console.log(
    " process.env.REACT_APP_GLPI_TOKEN",
    process.env.REACT_APP_GLPI_TOKEN
  );

  /* await axios
    .get("/apirest.php/initSession")
    .then((result) => {
      console.log("result:: ", result);
      if (result.status === 200) {
        console.log("export const Glpi_Login = ", result.status);
        //dispatch(createSessionToken(result.data));
        //console.log("glpiSssion_token:: ", glpiSssion_token);
        window.localStorage.setItem(
          "glpiSssion_token",
          JSON.stringify(result.data)
        );
        // SetGlpiSssion_token(result.data);
        //return;
      }

      console.log("export const glpiSssion_token = ", result.status);
      //dispatch(resetSessionToken());
      window.localStorage.removeItem("glpiSssion_token");
      //return;
    })
    .catch((error) => {
      console.log("error fetch ------", error);
      //dispatch(resetSessionToken());
      window.localStorage.removeItem("glpiSssion_token");
      //return;
    });*/
  //const { store } = useContext(ReactReduxContext);
  //console.log({ store });
  //console.log({ store });
  //return await axios.get("" + process.env.REACT_APP_API_USERACTIVE);
  return await axios.get("/apirest.php/initSession");
};
export const Glpi_LogOut = async (): //Authorization: string,
//AppToken: string REACT_APP_GLPI_LOGOUT
Promise<AxiosResponse<Response>> => {
  const { store } = useContext(ReactReduxContext);
  console.log({ store });
  const sessionTokenGlpiSlice = useSelector(
    (store: AppStore) => store.sessionTokenGlpiSlice
  );
  const [glpiSssion_token, SetGlpiSssion_token] = useState("");

  console.log("ingreso a export const loginGlpi = ");
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API_GLPI;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  axios.defaults.headers.get["Content-Type"] = "application/json;charset=utf-8";
  axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.get["Authorization"] =
    "" + process.env.REACT_APP_GLPI_AUTHORIZATION;
  axios.defaults.headers.get["App-Token"] =
    "" + process.env.REACT_APP_GLPI_TOKEN;
  await axios
    .get("" + process.env.REACT_APP_GLPI_LOGOUT)
    .then((result) => {
      if (result.status) {
        console.log("export const loginGlpi = ", result.status);
        return;
      }
      window.localStorage.removeItem("glpiSssion_token");
      console.log("export const loginGlpi = ", result.status);
      return;
    })
    .catch((error) => {
      console.log("error fetch ------", error);
      //dispatch(resetSessionToken());
      window.localStorage.removeItem("glpiSssion_token");
      return;
    });

  return await axios.get<Response>("" + process.env.REACT_APP_GLPI_LOGOUT);
};

export const Glpi_GetTicket = async (
  id: string
): //Authorization: string,
//AppToken: string
Promise<AxiosResponse<Response>> => {
  console.log("ingreso a export const getTicket = ");
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API_GLPI;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  axios.defaults.headers.get["Content-Type"] = "application/json;charset=utf-8";
  axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.get["Authorization"] =
    "" + process.env.REACT_APP_GLPI_AUTHORIZATION;
  axios.defaults.headers.get["App-Token"] =
    "" + process.env.REACT_APP_GLPI_TOKEN;
  axios.defaults.headers.get["Session-Token"] = "nraascbgu7dm0qsq78pja43mg8";
  await axios
    .get(process.env.REACT_APP_GLPI_GET_TICKET + id)
    .then((result) => {
      if (result.status) {
        console.log("export const getTicket = ", result.status);
        return;
      }

      console.log("export const getTicket = ", result.status);
      return;
    })
    .catch((error) => {
      console.log("error fetch getTicket------", error);
      return;
    });

  return await axios.get<Response>(process.env.REACT_APP_GLPI_GET_TICKET + id);
};

export const Glpi_GetMyEnties = async (): //Authorization: string,
//AppToken: string
Promise<AxiosResponse<Response>> => {
  console.log("ingreso a export const Glpi_GetMyEnties = ");
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API_GLPI;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  axios.defaults.headers.get["Content-Type"] = "application/json;charset=utf-8";
  axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.get["Authorization"] =
    "" + process.env.REACT_APP_GLPI_AUTHORIZATION;
  axios.defaults.headers.get["App-Token"] =
    "" + process.env.REACT_APP_GLPI_TOKEN;
  axios.defaults.headers.get["Session-Token"] = "nraascbgu7dm0qsq78pja43mg8";
  await axios
    .get("" + process.env.REACT_APP_GLPI_GET_MY_ENTITIES)
    .then((result) => {
      if (result.status) {
        console.log("export const Glpi_GetMyEnties = ", result.status);
        return;
      }

      console.log("export const Glpi_GetMyEnties = ", result.status);
      return;
    })
    .catch((error) => {
      console.log("error fetch Glpi_GetMyEnties------", error);
      return;
    });

  return await axios.get<Response>("" + process.env.REACT_APP_GLPI_GET_TICKET);
};
export const Glpi_Login2 = async (): Promise<AxiosResponse<Response>> => {
  console.log("ingreso a export const Glpi_Login2 = ");

  //const sessionTokenGlpiSlice = useSelector(
  //  (store: AppStore) => store.sessionTokenGlpiSlice
  //);
  //const dispatch = useDispatch();
  //const [glpiSssion_token, SetGlpiSssion_token] = useState("");
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API_GLPI;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  axios.defaults.headers.get["Content-Type"] = "application/json;charset=utf-8";
  axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.get["Authorization"] =
    "" + process.env.REACT_APP_GLPI_AUTHORIZATION;
  axios.defaults.headers.get["App-Token"] =
    "" + process.env.REACT_APP_GLPI_TOKEN;
  //axios.defaults.headers.get["Session-Token"] = "nraascbgu7dm0qsq78pja43mg8";

  await axios
    .get("" + process.env.REACT_APP_GLPI_LOGIN)
    .then((result) => {
      if (result.status === 200) {
        callDispatchs(result.data, "createSessionToken");
        console.log("export const Glpi_Login2 = ", result.status);
        return;
      }
      callDispatchs(result.data, "resetSessionToken");
      console.log("export const Glpi_Login2 = ", result.status);
      return;
    })
    .catch(async (error) => {
      //const rd = await callDispatchs(error, "resetSessionToken");
      console.log("error Glpi_Login2reset   SessionToken ------", error);
      const rd = await callDispatchs(error, "resetSessionToken");

      console.log("error Glpi_Login2reset   SessionToken ------", rd);
      return;
    });

  return await axios.get<Response>("" + process.env.REACT_APP_GLPI_GET_TICKET);
};
/*
function callDispatchs(data: any, action: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const sessionTokenGlpiSlice = useSelector(
    (store: AppStore) => store.sessionTokenGlpiSlice
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  switch (action) {
    case "createSessionToken":
      dispatch(createSessionToken(data));
      return {
        result: true,
      };
    case "resetSessionToken":
      dispatch(resetSessionToken());
      return {
        result: true,
      };

    default:
      return false;
  }
  //throw new Error("Function not implemented.");
}
*/
