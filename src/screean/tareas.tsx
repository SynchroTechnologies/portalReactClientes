import NavBar from "./navBar";
import React from "react";
import AccordionTarea from "./acordionTareas";

function Tareas() {
  return (
    <>
      <div className="App">
        <NavBar />
        <AccordionTarea />
      </div>
    </>
  );
}

export default Tareas;

//no borrar
/*  
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
      .then(function(res) {
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
      .catch(function(error) {
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
    await axios
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

    await axios
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

  const isLogin = () => {
    let isd = true;
    if (true == true) {
      isd = false;
    }
    return isd;
  }; */
