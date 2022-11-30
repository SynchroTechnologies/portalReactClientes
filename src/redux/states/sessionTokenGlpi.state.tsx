import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { IGlpilogin } from "../../interfaces/gLpi/login";

export const initialSessionToken: IGlpilogin = {
  session_token: "333" + moment(Date.now()).format("yyyy-MM-D  hh:mm:ss"),
};
export const sessionTokenGlpiSlice = createSlice({
  name: "sessionTokenGlpi",
  initialState: initialSessionToken,
  reducers: {
    createSessionToken: (state, action) => action.payload,
    modifySessionToken: (state, action) => ({ ...state, ...action.payload }),
    resetSessionToken: () => initialSessionToken,
  },
});

export const { createSessionToken, modifySessionToken, resetSessionToken } =
  sessionTokenGlpiSlice.actions;

export default sessionTokenGlpiSlice.caseReducers;
//export const caseSlice = createSlice({
//  name: "usuarioActivo",
//  initialState: initialUsuario,
//  reducers: {
//    createUser: (state, action) => action.payload,
//    modifyUser: (state, action) => ({ ...state, ...action.payload }),
//    resetUser: () => initialUsuario,
//  },
//});
