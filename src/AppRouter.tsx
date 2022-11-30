import NavBar from "./screean/navBar";
import React, { useState, Component } from "react";
import { Route, Link } from "react-router-dom";
import { Path, Routes } from "react-router";
import "./App.css";
import App from "./App";
import Login from "./components/login";
import CaseById from "./screean/caseById";
import CaseArchivedById from "./screean/caseArchivedById";
import CaseByNameProcess from "./screean/caseByNameProcess";
import CaseArchivedByNameProcess from "./screean/caseArchivedByNameProcess";
import Home from "./screean/home";
import TestRouter from "./components/testRouter";
import ErrorPage from "./components/error-page";

function AppRouter() {
  //const isAuth = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
        <Route
          path="/testrouter"
          element={<TestRouter />}
          errorElement={<ErrorPage />}
        />
        <Route path="home" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="app" element={<App />} errorElement={<ErrorPage />} />
        <Route
          path="casebyid"
          element={<CaseById />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="caseByNameProcess"
          element={<CaseByNameProcess />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="casearchivedbyid"
          element={<CaseArchivedById />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="caso-archivado-nombre-proceso"
          element={<CaseArchivedByNameProcess />}
          errorElement={<ErrorPage />}
        />
      </Routes>
    </div>
  );
}

export default AppRouter;
