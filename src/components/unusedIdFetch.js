import BonitaApi from "../models/BonitaApi";

export const unusedIdFetch = async () => {
  const bonita = new BonitaApi();
  await bonita.unusedIdFech();
};
export default unusedIdFetch;
