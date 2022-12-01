import React, { useState, useEffect } from "react";
import NavBar from "./navBar";
import CasoActivoPorNombreProceso from "./casoActivoPorNombreProceso";
import CasoArchivadoPorNombreProceso from "./casoArchivadoPorNombreProceso";

function caseArchivedByNameProcess() {
  return (
    <>
      <NavBar />
      <CasoArchivadoPorNombreProceso />
    </>
  );
}

export default caseArchivedByNameProcess;
