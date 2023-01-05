import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BonitaUsuarioActivo } from "../apis/bonita/ApiBonita";
import { managenUsuarioState } from "../apis/bonita/persist.data.service";
import AcordionCards from "../components/acordionCards";
import { iUsuario } from "../interfaces/bonita/usuario";
import { createUser } from "../redux/states/usuarioActivo.state";
import { AppStore } from "../redux/store";
import NavBar from "./navBar";
var JSONAPISerializer = require("json-api-serializer");
const Home = () => {
  const SelectorUsuarioActivo = useSelector(
    (store: AppStore) => store.usuarioActivo
  );

  const { user_name, user_id } = { ...SelectorUsuarioActivo };

  console.log({ user_name }, { user_id });
  const dss = JSON.parse(JSON.stringify(SelectorUsuarioActivo));
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
    //usuarioActivo();
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
