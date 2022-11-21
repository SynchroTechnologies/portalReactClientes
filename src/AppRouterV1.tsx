import React, { lazy, useState } from "react";
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

const login = lazy(() => import("./components/login"));
export const AppContext = React.createContext("");

export default function AppRouterV1() {
  const [valuteToshare, setValuteToshare] = useState("valuteToshare 1");

  return (
    <Provider store={store}>
      <AppContext.Provider value={valuteToshare}>
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
            path="/caseById"
            element={
              <ProtectedRoute>
                <CaseById />
              </ProtectedRoute>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/caseByNameProcess"
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
            path="/caseArchivedByNameProcess"
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
