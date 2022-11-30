import BonitaApi from "../models/BonitaApi";

export const fetchBonitaLogin = async () => {
  const bonita = new BonitaApi();
  await bonita.loginFech();
};

export default fetchBonitaLogin;
