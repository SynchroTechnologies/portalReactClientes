/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import axios from "axios";
import { iUsuario } from "../../interfaces/bonita/usuario";
import { iCreateRequest } from "../../interfaces/bonita/createRequest";

const { Cookies: kks } = require("react-cookie");
const cok = new kks();

export const BonitaGetSetServiceRequest = async (storageId: string) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.get(
    "" + process.env.REACT_APP_GET_SET_SERVICES + storageId
  );
};
export const BonitaGetSetParametros = async (storageId: string) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.get(
    "" + process.env.REACT_APP_GET_SET_PARAMETROS + storageId
  );
};
export const BonitaTaskById = async (id: string) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  /*await axios
      .get(process.env.REACT_APP_TASK_BY_ID + id)
      .then((resp) => {
        let result = resp;
        setCaseid(result.data);
        console.log("setCaseId", caseid);
        if (result.data.length == 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
        setCaseid(result.data);
      })
      .catch((error: any) => {
        console.log(error);
      });*/
  return await axios.get(process.env.REACT_APP_TASK_BY_ID + id);
};

export const BonitaGetTaskHumanOpen = async (user_id: string) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.get("" + process.env.REACT_APP_LISTHUMANTASK + user_id);
};
export const BonitaGetTaskHumanOpenByCase = async (
  user_id: string,
  case_id: string
) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;

  return await axios.get(
    "" +
      process.env.REACT_APP_LISTHUMANTASK_BY_CASE +
      user_id +
      "&f=rootCaseId=" +
      case_id
  );
};

export const BonitaGetTaskHumanCompleteUserByCase = async (
  user_id: string,
  case_id: string
) => {
  console.log({ user_id });
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;

  return await axios.get(
    "" +
      process.env.REACT_APP_HUMANTASK_COMPLETE_USER +
      user_id +
      "&f=rootCaseId=" +
      case_id
  );
};
export const BonitaGetTaskHumanCompleteUser = async (user_id: string) => {
  console.log({ user_id });
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.get(
    "" + process.env.REACT_APP_HUMANTASK_COMPLETE_USER + user_id
  );
};

export const BonitaGetTaskHumanMyUser = async (user_id: string) => {
  console.log({ user_id });
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.get(
    "" + process.env.REACT_APP_HUMANTASK_MY_USER_BY_CASE + user_id
  );
};
export const BonitaGetTaskHumanMyUserByCase = async (
  user_id: string,
  case_id: string
) => {
  console.log({ user_id });
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.get(
    "" +
      process.env.REACT_APP_HUMANTASK_MY_USER_BY_CASE +
      user_id +
      "&f=rootCaseId=" +
      case_id
  );
};
export const BonitaPutTaskByIdbkpaxiso = async (
  user_id: string,
  task_id: string
) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.put("" + process.env.REACT_APP_TASK_PUT_BY_ID + task_id);
};

export const BonitaPutTaskById = async (user_id: string, task_id: string) => {
  const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Bonita-API-Token", X_Bonita_API_Token);

  const raw = JSON.stringify({
    assigned_id: user_id,
    assigned_date: "",
  });

  const RequestInit: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };
  RequestInit.method = "PUT";
  const BASE_URL =
    process.env.REACT_APP_BASE_URL_API +
    "" +
    process.env.REACT_APP_TASK_PUT_BY_ID +
    task_id;
  console.log(BASE_URL, RequestInit);
  return await fetch(BASE_URL, RequestInit);
};
//#reg
export const BonitaLogOut = async () => {
  console.log("BonitaLogOut BonitaLogOut");

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  await axios
    .get("" + process.env.REACT_APP_BASE_LOGOUT)
    .then((resp) => {
      window.localStorage.removeItem("setServiceLogin");
      window.localStorage.removeItem("usuario");
      window.localStorage.clear();
      console.log(resp);
    })
    .catch((error) => {
      window.localStorage.removeItem("setServiceLogin");
      window.localStorage.removeItem("usuario");
      window.localStorage.clear();
      console.log(error);
    });
  //const dispatch = useDispatch();
  //dispatch(resetUser());
};

export const BonitaGetProcessName = async (processName: string) => {
  if (processName !== "") {
    let X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.get["X-Bonita-API-Token"] = X_Bonita_API_Token;
    await axios
      .get("" + process.env.REACT_APP_GET_PROCESSNAME + processName)
      .then((resp) => {
        window.localStorage.setItem("setProcessId", resp.data[0].id);
        return resp.data[0].id;
      })
      .catch((error: any) => {
        console.log(error);
        return "";
      });
    return "";
  } else {
    return "";
  }
};
export const BonitaUsuarioActivo = async () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  await axios
    .get("" + process.env.REACT_APP_API_USERACTIVE)
    .then((resp) => {
      //setUsuario(resp.data);
      if (resp.status === 200) {
        window.localStorage.setItem("usuario", JSON.stringify(resp.data));
        window.localStorage.setItem(
          "usuariousuario",
          JSON.stringify(resp.data)
        );
      }
    })
    .catch((error) => {
      window.localStorage.removeItem("usuario");
      console.log(error);
    });

  //const dispatch = useDispatch();
  //
  //await dispatch(createUser(JSON.stringify(data)));
  //console.log("await BonitaUsuarioActivo", data);
  return await axios.get("" + process.env.REACT_APP_API_USERACTIVE);
};

export const BonitaLoginAxios = async (username: string, password: string) => {
  let axiosstatus = false;
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  console.log("BonitaLoginAxios 103");

  await axios
    .get(
      "" +
        process.env.REACT_APP_API_LOGINSERVICE +
        "?username=" +
        username +
        "&password=" +
        password +
        "&redirect=false"
    )
    .then((resp) => {
      console.log("BonitaLoginAxios 116");
      window.localStorage.setItem(
        "BonitaLoginAxios",
        JSON.stringify(resp.status)
      );
      let status = JSON.stringify(resp.status);
      console.log({ status });
      //console.log(JSON.stringify(resp));
      if (status === "204") {
        axiosstatus = true;
      } else {
        axiosstatus = false;
      }
      //axiosstatus = false;
    })
    .catch((error) => {
      console.log("BonitaLoginAxios 123");
      window.localStorage.removeItem("BonitaLoginAxios");
      console.log(error);
      axiosstatus = false;
    });
  return axiosstatus;
};
export const BonitaPostCaseFetch = async (Props: iCreateRequest) => {
  let returnBol = false;
  console.log({ returnBol });
  if (Props.processId === "") {
    console.log(
      "BonitaPostCaseFetch llego vacio el processID : ",
      Props.processId
    );
    console.log({ returnBol });
    return returnBol;
  }
  const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Bonita-API-Token", X_Bonita_API_Token);

  const raw = JSON.stringify({
    serviceRequestInput: {
      alarma: "Props.alarma",
      categoria: "DBA",
      ci: "altaicare_4_0_0_OP1108",
      fechaEsperada: "2022-11-03T11:55:00",
      descripcion: "Props.descripcion",
      prioridad: "Media",
      estado: "Props.estado",
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

  let BASE_URL =
    "" +
    process.env.REACT_APP_BASE_URL_API +
    process.env.REACT_APP_POST_CASE +
    Props.processId +
    "/instantiation";

  await fetch(BASE_URL, RequestInit)
    .then((response) => {
      if (!response.ok) {
        console.log("!result.ok", response);
        //setCreado(false);
        returnBol = false;
        console.log({ returnBol });
      } else {
        //readCreateCase(response);
        //setCreateCaseId(response);
        window.localStorage.setItem(
          "createCaseBonitaFechOk",
          JSON.stringify({ response })
        );
        returnBol = true;
        console.log(JSON.stringify({ response }));
      }
    })
    .catch((error) => {
      console.log("error fetch ------", error);
      //setCreado(false);
      returnBol = false;
      console.log({ returnBol });
    });
  console.log({ returnBol });
  return returnBol;
};
///////////////  function readCreateCase(body: {}) {
export const BonitaGetHumeanTaskUserCase = async (
  user_id: string,
  caso_id: string
) => {
  //await usuarioActivo();
  let setCantTask = 0;
  console.log({ user_id });
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  await axios
    .get(
      "/bonita/API/bpm/humanTask?p=0&c=50&f=state=ready&f=user_id=" +
        user_id +
        "&f=caseId=" +
        caso_id
    )
    .then((resp) => {
      //setCantTask(resp.data.length);
      console.log("result.data.length :", resp.data.length);
      if (resp.data.length === 0) {
        console.log("lista vacia");
        setCantTask = 0;
      } else {
        setCantTask = resp.data.length;
      }
    })
    .catch((error: any) => {
      setCantTask = 0;
      console.log(error);
    });
  return setCantTask;
};

export const BonitaGetHumeanTaskUser = async (user_id: string) => {
  //await usuarioActivo();
  let setCantTask = 0;
  console.log({ user_id });
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  await axios
    .get(
      "/bonita/API/bpm/humanTask?p=0&c=50&f=state=ready&f=user_id=" + user_id
    )
    .then((resp) => {
      console.log("result.data.length :", resp.data.length);
      if (resp.data.length === 0) {
        console.log("lista vacia");
        setCantTask = 0;
      } else {
        setCantTask = resp.data.length;
        console.log(resp.data.length);
      }
    })
    .catch((error: any) => {
      setCantTask = 0;
      console.log(error);
    });
  return setCantTask;
};
export const BonitaGetHumanTaskUserCase = async (
  user_id: string,
  case_id: string
) => {
  let setCantTask = 0;
  if (user_id !== "") {
    let X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.get["X-Bonita-API-Token"] = X_Bonita_API_Token;
    await axios
      .get(
        "" +
          process.env.REACT_APP_LISTHUMANTASK +
          user_id +
          "&f=caseId=" +
          case_id
      )
      .then((resp) => {
        console.log(resp.data.length);
        console.log(resp.data);
        setCantTask = resp.data.length;
      })
      .catch((error: any) => {
        console.log(error);
      });
    return setCantTask; //humanTaskUserCase;
  } else {
    return setCantTask; //humanTaskUserCase;
  }
};
export const BonitaCaseForIdSubstitute = async (id: string) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  /*await axios
    .get(
      process.env.REACT_APP_GET_CASEFORID +
        id +
        "?d=processDefinitionId&d=started_by&d=startedBySubstitute"
    )
    .then((resp) => {
      //setCaseid(resp.data);
      //return resp.data;
      console.log(resp);
    })
    .catch((error: any) => {
      console.log(error);
      //return;
    });
  console.log(
    "" +
      process.env.REACT_APP_GET_CASEFORID +
      id +
      "?d=processDefinitionId&d=started_by&d=startedBySubstitute"
  );*/
  return await axios.get(
    "" +
      process.env.REACT_APP_GET_CASEFORID +
      id +
      "?d=processDefinitionId&d=started_by&d=startedBySubstitute"
  );
};
export const BonitaArchivedActivityList = async (user_id: string) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  /* await axios
    .get(
      "" +
        process.env.REACT_APP_LISTCASEACTIVED +
        user_id +
        "&t=0&o=startDate+DESC"
    )
    .then((resp) => {
      let result = resp;
      setArchivedCaseList(result.data);
      console.log("setArchivedCaseList", result.data);
      if (result.data.length == 0) {
        console.log("lista vacia");
        setShow(true);
      } else {
        setShow(false);
      }
    })
    .catch((error: any) => {
      setShow(true);
      console.log(error);
    });*/
  console.log("user_id", user_id);
  return await axios.get(
    "" +
      process.env.REACT_APP_LISTCASEACTIVED +
      user_id +
      "&t=0&o=startDate+DESC"
  );
};
export const BonitaCaseForId = async (id: string) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  /*await axios
      .get(process.env.REACT_APP_GET_CASEFORID + id)
      .then((resp) => {
        let result = resp;
        setCaseid(result.data);
        console.log("setCaseId", caseid);
        if (result.data.length == 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
        setCaseid(result.data);
      })
      .catch((error: any) => {
        console.log(error);
      });*/
  return await axios.get(process.env.REACT_APP_GET_CASEFORID + id);
};
export const BonitaCaseList = async (user_id: string) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  console.log(user_id);
  /*await axios
      .get(
        "/bonita/portal/resource/app/userAppBonita/case-list/API/bpm/case?c=20&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=" +
          user_id +
          "&n=activeFlowNodes&n=failedFlowNodes&t=0&o=startDate+DESC"
      )
      .then((resp) => {
        let result = resp;
        console.log(result.data);
        if (result.data.length === 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch((error: any) => {
        setShow(true);
        console.log(error);
      });*/

  return await axios.get(
    "/bonita/portal/resource/app/userAppBonita/case-list/API/bpm/case?c=20&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=" +
      user_id +
      "&n=activeFlowNodes&n=failedFlowNodes&t=0&o=startDate+DESC"
  );
};

export const BonitaAddCommentFetch = async (
  caseId: string,
  comments: string
) => {
  const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Bonita-API-Token", X_Bonita_API_Token);

  const raw = JSON.stringify({
    processInstanceId: caseId,
    content: comments,
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
    process.env.REACT_APP_BASE_URL_API + "" + process.env.REACT_APP_ADD_COMMENT;
  /*console.log("RequestInit", RequestInit);

  await fetch(BASE_URL, RequestInit)
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
    });*/
  return await fetch(BASE_URL, RequestInit);
};
export const BonitaGetListComment = async (caseId: string) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.get(
    process.env.REACT_APP_LISTCOMMENT + caseId + "&d=userId&t=0"
  );
};
export const BonitaGetTaskAndContext = async (taskId: string) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.get(
    process.env.REACT_APP_TASK_BY_ID_AND_CONTEXT + taskId + "/context"
  );
};
export const BonitaGetCaseByProcessNameList = async (
  user_id: string,
  process_name: string
) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.get(
    "" +
      process.env.REACT_APP_CASES_BY_NAME_PROCES +
      user_id +
      "&n=activeFlowNodes&n=failedFlowNodes&t=0&s=" +
      process_name +
      "&o=startDate+DESC"
  );
};

export const BonitaGetCaseArchivedByProcessNameList = async (
  user_id: string,
  process_name: string
) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  return await axios.get(
    "" +
      process.env.REACT_APP_CASES_ARCHIVED_BY_NAME_PROCES +
      user_id +
      "&t=0&s=" +
      process_name +
      "&o=startDate+DESC"
  );
};
//
const loginFetch = async (username: string, password: string) => {
  loginFechToBonita(username, password);

  async function loginFechToBonita(username: string, password: string) {
    type iUarioActivo = iUsuario;
    const [serviceLogin, setServiceLogin] = useState("");
    const [show, setShow] = useState(false);
    const BASE_URL = process.env.REACT_APP_BASE_URL_API;
    let urlapi = process.env.REACT_APP_API_LOGINSERVICE;
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

    await fetch(BASE_URL + "" + urlapi, RequestInit)
      .then((result) => {
        if (!result.ok) {
          window.localStorage.removeItem("setServiceLogin");
          window.localStorage.removeItem("usuario");
          setServiceLogin("Error de Login");
          setShow(true);
          return;
        }

        const thebody = JSON.stringify(result.body);
        window.localStorage.setItem("setServiceLogin", thebody);
        setServiceLogin("Login Success " + username);
        setShow(false);
        return;
      })
      .catch((error) => {
        window.localStorage.removeItem("setServiceLogin");
        window.localStorage.removeItem("usuario");
        console.log("error fetch ------", error);
        setShow(true);
        return;
      });
  }
};
