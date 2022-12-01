//const BonitaApi = require("../models/BonitaApi");
import BonitaApi from "../models/BonitaApi";

export const fetchCase = async () => {
  const bonita = new BonitaApi();

  await bonita.caseFech();
};

export default fetchCase;
