//const BonitaApi = require("../models/BonitaApi");
import BonitaApi from "../models/BonitaApi";
import axios from "axios";

const { Cookies: kks } = require("react-cookie");

/*export const bonitaLogin = async () => {
  const config = {
    method: "get",
    mode: "no-cors",
    url: "http://localhost:5300/api",
    "Access-Control-Allow-Origin": "http://localhost:443",
    headers: { "Access-Control-Allow-Origin": "http://localhost:443" },
  };

  const response = await fetch("http://localhost:5300/api", config);
  console.log("response:", response.data);

  const rst = await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(rst);
};*/
export const bonitaLogin = async () => {
  const bonita = new BonitaApi();

  const cok = new kks();
  const login = await bonita.login();

  //const login = await bonita.loginFech();

  console.log("is login bonitaLogin ", login);
  //return {};
};

//callApi();
export default bonitaLogin;
