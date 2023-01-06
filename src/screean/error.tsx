import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BonitaUsuarioActivo } from "../apis/bonita/ApiBonita";
import { managenUsuarioState } from "../apis/bonita/persist.data.service";
import AcordionCards from "../components/acordionCards";
import ErrorPage from "../components/error-page";
import { iUsuario } from "../interfaces/bonita/usuario";
import { createUser } from "../redux/states/usuarioActivo.state";
import { AppStore } from "../redux/store";
import NavBar from "./navBar";
const Error = () => {
  const SelectorUsuarioActivo = useSelector(
    (store: AppStore) => store.usuarioActivo
  );

  const { user_name, user_id } = { ...SelectorUsuarioActivo };

  console.log({ user_name }, { user_id });

  return (
    <>
      <div className="App">
        <NavBar />
        <ErrorPage />
      </div>
    </>
  );
};

export default Error;
