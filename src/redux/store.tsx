import { iUsuario } from "../interfaces/bonita/usuario";
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { iCase } from "../interfaces/bonita/case";
import { iComment } from "../interfaces/bonita/comment";
import { userSlice } from "./states/usuarioActivo.state";
import { IGlpilogin } from "../interfaces/gLpi/login";
import { sessionTokenGlpiSlice } from "./states/sessionTokenGlpi.state";

export interface AppStore {
  usuarioActivo: iUsuario;
  sessionTokenGlpiSlice: IGlpilogin;
  //caseActivo: iUsuario;
  //coment: iComment;
}

export default configureStore<AppStore>({
  reducer: {
    usuarioActivo: userSlice.reducer,
    sessionTokenGlpiSlice: sessionTokenGlpiSlice.reducer,

    //caseActivo: caseSlice.reducer,
  },
});
