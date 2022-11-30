//const BonitaApi = require("../models/BonitaApi");
import BonitaApi from "../models/BonitaApi";

export const bonitaCase = async (JSESSIONID, X_Bonita_API_Token) => {
  const bonita = new BonitaApi();
  console.log(
    "JSESSIONID, X_Bonita_API_Token  bonitaCase async aqui ",
    JSESSIONID,
    X_Bonita_API_Token
  );

  try {
    const rsps = await bonita.case(JSESSIONID, X_Bonita_API_Token);
    console.log(rsps);
    console.log(
      "JSESSIONID, X_Bonita_API_Token  bonitaCase await aqui ",
      JSESSIONID,
      X_Bonita_API_Token
    );
  } catch (err) {
    console.log("JSESSIONID, X_Bonita_API_Token  bonitaCase await error ", err);
  }

  return [];
};

//callApi();
export default bonitaCase;
