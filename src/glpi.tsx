import Header from "./components/header";
//const GlpiApi = require("glpi-api");
const { GlpiClient } = require("glpi-client");
const config = {
  app_token: "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA",
  apiurl: "https://glpi.apps.synchro.com.ar/apirest.php/initSession",
  user_token: "Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ",
};

// or

// Config with basic auth
const config1 = {
  app_token: "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA",
  apiurl: "https://glpi.apps.synchro.com.ar/apirest.php/initSession",
  auth: {
    username: "glpi",
    password: "secret",
  },
};

const Glpi = () => {
  const loginFetchGlpi = async () => {
    const client = new GlpiClient(
      "https://glpi.apps.synchro.com.ar/apirest.php/initSession"
    );
    console.log({ client });
    // With User Token
    const api = await client.initSession({
      appToken: "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA",
      userToken: "Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ",
      mode: "no-cors",
    });
    // const lglpi = await loginGlpi;
    //const glpi = new GlpiApi(config);
    //await glpi.initSession();

    //await glpiloginfech();
    //console.log(lglpi);
    //loginFechToBonita(username, password);
    async function glpiloginfech() {
      let myHeaders = new Headers();
      let urlencoded = new URLSearchParams();
      myHeaders.append(
        "Authorization",
        "'User_Token' Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ"
      );
      myHeaders.append("App-Token", "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA");

      const RequestInit: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "App-Token": "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA",
          App_Token: "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA",
          Authorization:
            "'user_token' Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ",
          "Access-Control-Allow-Origin": "http://localhost:4200",
          "Access-Control-Allow-Headers":
            "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods ": "GET, POST, OPTIONS, PUT, DELETE",
        },
        redirect: "follow",
      };
      RequestInit.method = "GET";
      console.log(JSON.stringify(RequestInit.headers));
      //console.log(JSON.stringify(RequestInit));

      await fetch(
        "https://glpi.apps.synchro.com.ar/apirest.php/initSession/",
        RequestInit
      )
        .then((response) => response.text())
        .then((result) => console.log("result :", result))
        .catch((error) => console.log("error  :", error));
    }
  };
  return (
    <>
      <div className="App">
        <button onClick={loginFetchGlpi}>glpi</button>
      </div>
    </>
  );
};

export default Glpi;
