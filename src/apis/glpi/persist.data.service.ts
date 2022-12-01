import { IGlpilogin } from "../../interfaces/gLpi/login";

//#region Login
export const persistSessionToken = (token: {}) => {
  window.localStorage.setItem("glpiSssion_token", JSON.stringify({ ...token }));
};
export const clearSessionToken = () => {
  window.localStorage.removeItem("glpiSssion_token");
};

export const managenSessionTokenState = (token: IGlpilogin) => {
  persistSessionToken(token);
};

//#endregion
