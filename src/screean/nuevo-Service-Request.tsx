import React, { useState, useContext, useEffect } from "react";
import NavBar from "./navBar";
import ChildFormServiceRequest from "../components/childFormServiceRequest";

function NuevoServiceRequest() {
  return (
    <>
      <div className="App">
        <NavBar />
        <div>
          <div className="container ">
            <div className="row shadow p-2 mb-3 bg-white rounded">
              <div className="row">
                <div className="col">
                  {" "}
                  <div></div>
                  <div>
                    {" "}
                    <ChildFormServiceRequest
                      idAcordion={"ServiceRequest"}
                      titleAcordion={"ServiceRequests"}
                      cardHeader={"Formulario de inicio de requerimiento"}
                      cardTitle={""}
                      body={""}
                      textButton={"Iniciar requerimiento"}
                      routeUrl="routeUrl"
                      style={"danger"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NuevoServiceRequest;
