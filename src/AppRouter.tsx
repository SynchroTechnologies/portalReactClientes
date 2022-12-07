<<<<<<< HEAD
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
=======
import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/error-page";
import Login from "./components/login";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import CaseArchivedById from "./screean/caseArchivedById";
import CaseArchivedByNameProcess from "./screean/caseArchivedByNameProcess";
import CaseById from "./screean/caseById";
import CaseByNameProcess from "./screean/caseByNameProcess";
import CasoDetalle from "./screean/caso-detalle";
import Home from "./screean/home";
import NuevoServiceRequest from "./screean/nuevo-Service-Request";
import Tareas from "./screean/tareas";
import { Provider } from "react-redux";
import store from "./redux/store";

export const AppContext = React.createContext({});

export default function AppRouter() {
  return (
    /*<Provider store={store}>
      <AppContext.Provider value={store}>
        <Home />
      </AppContext.Provider>
    </Provider>*/

    <Provider store={store}>
      <AppContext.Provider value={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/tareas"
            element={
              <ProtectedRoute>
                <Tareas />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/caso-id"
            element={
              <ProtectedRoute>
                <CaseById />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/case-nombre-proceso"
            element={
              <ProtectedRoute>
                <CaseByNameProcess />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/caseArchivedById"
            element={
              <ProtectedRoute>
                <CaseArchivedById />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/caso-archivado-nombre-proceso"
            element={
              <ProtectedRoute>
                <CaseArchivedByNameProcess />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/nuevo-service-request"
            element={
              <ProtectedRoute>
                <NuevoServiceRequest />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/caso-detalle"
            element={
              <ProtectedRoute>
                <CasoDetalle />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
        </Routes>
      </AppContext.Provider>
    </Provider>
  );
}
>>>>>>> release
