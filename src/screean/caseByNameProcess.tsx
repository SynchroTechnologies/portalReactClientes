import React, { useState, useEffect } from "react";
import NavBar from "./navBar";
import CasoActivoPorNombreProceso from "./casoActivoPorNombreProceso";

function CaseByNameProcess() {
  return (
    <>
      <NavBar />
      <CasoActivoPorNombreProceso />
    </>
  );
}

export default CaseByNameProcess;
