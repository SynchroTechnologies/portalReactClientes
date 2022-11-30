import {
  managenSessionTokenState,
  clearSessionToken,
} from "./persist.data.service";

const axios = require("axios");

class apiGlpi {
  async loginGlpi() {
    axiosLogin();

    async function axiosLogin() {
      axios.defaults.baseURL = "https://glpi.apps.synchro.com.ar";
      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios.defaults.withCredentials = true;
      axios.defaults.headers.get["Authorization"] =
        "'user_token' Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ";
      axios.defaults.headers.get["App-Token"] =
        "Pgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA";
      await axios
        .get("/apirest.php/initSession")
        .then((resp) => {
          if (resp.status === 200) {
            managenSessionTokenState(resp.data);
          } else {
            clearSessionToken();
          }
          console.log("axiosLogin", resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
export default apiGlpi;
