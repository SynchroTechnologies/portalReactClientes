import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BonitaUsuarioActivo } from "../apis/bonita/ApiBonita";
import { managenUsuarioState } from "../apis/bonita/persist.data.service";
import AcordionCards from "../components/acordionCards";
import { iUsuario } from "../interfaces/usuario";
import { createUser } from "../redux/states/usuarioActivo.state";
import { AppStore } from "../redux/store";
import NavBar from "./navBar";
var JSONAPISerializer = require("json-api-serializer");
const Home = () => {
  const SelectorUsuarioActivo = useSelector(
    (store: AppStore) => store.usuarioActivo
  );
  let user: iUsuario = {
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
  const { user_name } = { ...SelectorUsuarioActivo };

  console.log("SelectorUsuarioActivo: ", SelectorUsuarioActivo.user_name);
  console.log("SelectorUsuarioActivo::: ", user_name);

  console.log("SelectorUsuarioActivo::: ", SelectorUsuarioActivo);
  const dss = JSON.parse(JSON.stringify(SelectorUsuarioActivo));
  user = dss;
  console.log("SelectorUsuarioActivo dss ", dss);
  console.log("SelectorUsuarioActivo dss user_id", user.user_id);
  console.log("SelectorUsuarioActivo dss user", user.user_name);
  const dispatch = useDispatch();
  const usuarioActivo = async () => {
    console.log("await BonitaUsuarioActivo");
    const bonitaUsuarioActivo = await BonitaUsuarioActivo();
    console.log("await BonitaUsuarioActivo");
    if (bonitaUsuarioActivo.status === 200) {
      await dispatch(createUser(bonitaUsuarioActivo.data));
      //await managenUsuarioState(bonitaUsuarioActivo.data);
      //setUsuario(bonitaUsuarioActivo.data);
      //setServiceLogin("Login Success " + bonitaUsuarioActivo.data.status);
    } else {
      //setServiceLogin("Login No Success");
      console.log("await BonitaUsuarioActivo");
    }
    return;
  };
  useEffect(() => {
    usuarioActivo();
  }, []);
  return (
    <>
      <div className="App">
        <NavBar />
        <AcordionCards />
      </div>
      {/*<AcordionCards />*/}
    </>
  );
};

export default Home;
