const axios = require("axios");
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

class BonitaApi {
  async login() {
    try {
      // const [serviceLogin, setServiceLogin] = useState("");
      const endpoint =
        process.env.REACT_APP_BASE_URL_API +
        "" +
        process.env.REACT_APP_API_LOGINSERVICE +
        "?username=walter.bates&password=bpm&redirect=false";
      const intance = axios.create({
        baseURL: endpoint,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const resb = await intance.post();
      const hederResp = resb.headers["set-cookie"]
        ? resb.headers["set-cookie"]
        : [];
      const JSESSIONIDNODE = hederResp[1]
        .split(";")[0]
        .split(",")[0]
        .split("=")[1];
      const XBonitaAPIToken = hederResp[2]
        .split(";")[0]
        .split(",")[0]
        .split("=")[1];
      console.log(JSESSIONIDNODE, XBonitaAPIToken);
      this.almacenarCookies();
      return { JSESSIONIDNODE, XBonitaAPIToken };
    } catch (error) {
      console.log("error **********", error);
      return { error };
    }
  }

  async loginbkp() {
    let sId = "";
    let token = "";
    // return;
    //const BASE_URL = process.env.REACT_APP_BASE_URL_API;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", "walter.bates");
    urlencoded.append("password", "bpm");
    urlencoded.append("redirect", "false");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };
    const endpoints =
      process.env.REACT_APP_BASE_URL_API + "/bonita/loginservice";

    /*const intance = axios.create({
      baseURL: BASE_URL, //"https://jsonplaceholder.typicode.com/users/1", //
      mode: "no-cors",
      withCredentials: "true",
      headers: myHeaders /*{
        "Content-Type": "application/x-www-form-urlencoded",
        //"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
        "Access-Control-Allow-Origin":
          "http://localhost:443,https://localhost:443",
      },
  });
  */

    const intance = axios.create(endpoints, requestOptions);

    let res;
    try {
      res = await intance.post();

      console.log("res.headers aqui :", res.headers);
      console.log("res.status aqui :", res.status);
      console.log("res.headers.connection aqui :", res.headers.connection);

      console.log(
        "res.status set-cookie JSESSIONID aqui :",
        res.headers["set-cookie"][1] //["JSESSIONID"]
      );
      console.log(
        "res.status set-cookie X-Bonita-API-Token aqui :",
        res.headers["set-cookie"][2] //["X-Bonita-API-Token"]
      );

      let JSESSIONID = res.headers["set-cookie"][1].split(";");
      let setcookie = res.headers["set-cookie"][2].split(";");
      console.log(JSESSIONID);

      console.log(JSESSIONID[0]);
      console.log(setcookie[0]);

      sId = JSESSIONID[0];
      token = setcookie[0];
      //console.log(res);
      const sheaders = {
        "Content-type": "application/json;charset=utf-8",
        Cookie: `${sId};${token}; bonita.tenant=1; BOS_Locale=en`,
      };

      console.log("sheaders ::", sheaders);
    } catch {
      console.log("catch await intance.get()");
    }
    //lemos cookie del response y almacenamos local y session storage
    this.almacenarCookies();
  }
  almacenarCookies = () => {
    console.log("almacenar coolies ");
    localStorage.setItem("JSESSIONID", cok.get("JSESSIONID"));
    localStorage.setItem("X-Bonita-API-Token", cok.get("X-Bonita-API-Token"));
    sessionStorage.setItem("JSESSIONID", cok.get("JSESSIONID"));
    sessionStorage.setItem("X-Bonita-API-Token", cok.get("X-Bonita-API-Token"));
  };

  async case(JSESSIONID, X_Bonita_API_Token) {
    const BASE_URL = process.env.REACT_APP_BASE_URL_API;

    const endpointc = BASE_URL + process.env.REACT_APP_GET_CASEFORID + "4001";
    console.log("endpointc case aqui ", endpointc);
    console.log(
      "async case(JSESSIONID, X_Bonita_API_Toke) ",
      JSESSIONID,
      X_Bonita_API_Token
    );

    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL_API;

      const endpointc = BASE_URL + process.env.REACT_APP_GET_CASEFORID + "4001";

      let her = {
        "Content-Type": "application/json;charset=utf-8",
        Cookie: `JSESSIONID=${JSESSIONID};X_Bonita_API_Token=${X_Bonita_API_Token}; bonita.tenant=1; BOS_Locale=en`,
      };
      her = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Bonita-API-Token": `${X_Bonita_API_Token}`,
      };
      console.log("her==", her);
      const intancec = axios.create({
        baseURL: endpointc,
        headers: her,
      });

      const res = await intancec.get();
      console.log("res.status case aqui ", res.status);
      console.log("res.data case aqui ", res.data);
      console.log("res.data case aqui ", res.data.processDefinitionId);

      return {
        //res,
      };
    } catch (error) {
      console.log("error case  **********", error.headers);
      return [];
    }
  }

  //metodo api de estado de session
  async unusedId(JSESSIONID, X_Bonita_API_Token) {
    console.log("async unusedId X_Bonita_API_Token", X_Bonita_API_Token);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "bonita.tenant=1; BOS_Locale=es; JSESSIONID=A0E8D4DB8EBE88757D9E2BB8028B82C9; JSESSIONIDNODE=67D75FFE34C540A193425AA8AE6FD4FC; X-Bonita-API-Token=" +
        `${X_Bonita_API_Token}`
    );

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", "walter.bates");
    urlencoded.append("password", "bpm");
    urlencoded.append("redirect", "false");
    /*
    var requestOptions = {
      method: "GET",
      credentials: "include",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };*/
  }

  ///acceso a controles
  async accessControl(sId, token) {
    try {
      const endpointc = "http://localhost:8080/bonita/API/accessControl/bdm";
      const intancec = axios.create({
        baseURL: endpointc,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          //"Content-Type": "application/x-www-form-urlencoded",
          Cookie: `${sId};${token}; bonita.tenant=1; BOS_Locale=en`,
        },
      });

      const res = await intancec.get();

      console.log("res.status accessControl aqui ", res.status);
      console.log("res.data accessControl aqui ", res.data);

      return {
        res,
      };
    } catch (error) {
      console.log("error accessControl  **********", error.headers);
      return [];
    }
  }

  async processDefinitionId(sId, token, processDefinitionId) {
    console.log("processDefinitionId aqui :", processDefinitionId);

    try {
      const endpointc =
        "http://localhost:8080/bonita/API/bpm/case?p=0&c=10&f=processDefinitionId=" +
        processDefinitionId;
      const intancec = axios.create({
        baseURL: endpointc,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          //"Content-Type": "application/x-www-form-urlencoded",
          Cookie: `${sId};${token}; bonita.tenant=1; BOS_Locale=en`,
        },
      });

      const res = await intancec.get();
      console.log("status processDefinitionId aqui :", res.status);
      console.log("data processDefinitionId aqui :", res.data);

      return {
        res,
      };
    } catch (error) {
      console.log("error case  **********", error.headers);
      return [];
    }
  }
  async loginFech() {
    //const [serviceLogin, setServiceLogin] = useState("");
    // const BASE_URL = process.env.REACT_APP_BASE_URL_API;
    loginFechToBonita();

    async function loginFechToBonita() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", "walter.bates");
      urlencoded.append("password", "bpm");
      urlencoded.append("redirect", "false");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
        credentials: "include",
      };
      const BASE_URL =
        process.env.REACT_APP_BASE_URL_API + "/bonita/loginservice";

      return await fetch(BASE_URL, requestOptions)
        .then((result) => {
          if (!result.ok) {
            throw Error(result.status);
          }
          // setServiceLogin("walter.bates.locos");
          console.log(result);
          return result;
        })
        .catch((error) => {
          console.log("error fetch", error);
          return error;
        });
    }
  }
  async unusedIdFech() {
    unusedIdFechBonita();
    async function unusedIdFechBonita() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json;charset=utf-8");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
      };
      const BASE_URL =
        process.env.REACT_APP_BASE_URL_API +
        "" +
        process.env.REACT_APP_API_USERACTIVE;

      return await fetch(BASE_URL, requestOptions)
        .then((result) => {
          if (!result.ok) {
            console.log(result.status, result.statusText);
            throw Error(result.status);
          }
          console.log(
            "result.status fetch",
            result.status + " " + result.statusText
          );

          console.log(
            "result.headers fetch",
            result.headers.get("X-Bonita-API-Token")
          );
          result.json().then((json) => {
            console.log("result.body jsom = ", json);
          });

          return result;
        })
        .catch((error) => {
          console.log("error fetch", error);
          return error;
        });
    }
  }
  async caseFech() {
    caseFechBonita();

    async function caseFechBonita() {
      const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
      //console.log("---X_Bonita_API_Token--", X_Bonita_API_Token);
      const myHeaders = new Headers();
      myHeaders.append(
        "Content-type",
        "application/json",
        "Cookie",
        `bonita.tenant=1; BOS_Locale=es; X-Bonita-API-Token=${X_Bonita_API_Token}`
      );

      const urlencoded = new URLSearchParams();
      urlencoded.append("method", "GET");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
      };
      const BASE_URL =
        process.env.REACT_APP_BASE_URL_API +
        process.env.REACT_APP_BASE_URL_API +
        "4001";

      return await fetch(BASE_URL, requestOptions)
        .then((result) => {
          if (!result.ok) {
            console.log(result.status, result.statusText);
            throw Error(result.status);
          }
          console.log(
            "result.status fetch",
            result.status + " " + result.statusText
          );

          console.log(
            "result.headers fetch",
            result.headers.get("X-Bonita-API-Token")
          );
          result.json().then((json) => {
            console.log("result.body jsom = ", json);
          });
          return result;
        })
        .catch((error) => {
          console.log("error fetch", error);
          return error;
        });
    }
  }
}
export default BonitaApi;
