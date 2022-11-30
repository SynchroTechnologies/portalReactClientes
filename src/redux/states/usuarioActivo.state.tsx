import { iUsuario } from "../../interfaces/usuario";
import { createSlice } from "@reduxjs/toolkit";

export const initialUsuario: iUsuario = {
  copyright: "",
  is_guest_user: "",
  branding_version: "",
  branding_version_with_date: "",
  user_id: "",
  user_name: "",
  session_id: "",
  conf: "",
  is_technical_user: "",
  version: "",
};
export const userSlice = createSlice({
  name: "usuarioActivo",
  initialState: initialUsuario,
  reducers: {
    createUser: (state, action) => action.payload,
    modifyUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: () => initialUsuario,
  },
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.caseReducers;
//export const caseSlice = createSlice({
//  name: "usuarioActivo",
//  initialState: initialUsuario,
//  reducers: {
//    createUser: (state, action) => action.payload,
//    modifyUser: (state, action) => ({ ...state, ...action.payload }),
//    resetUser: () => initialUsuario,
//  },
//});
