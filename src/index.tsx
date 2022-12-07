import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import AppRouterV1 from "./AppRouterV1";
=======
import AppRouter from "./AppRouter";
>>>>>>> release
import Glpi from "./glpi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const pathname = window.location;
console.log(pathname.origin);
root.render(
  /*<Glpi />*/
<<<<<<< HEAD
  <BrowserRouter>
    <AppRouterV1 />
  </BrowserRouter>
  /*<React.StrictMode>
=======
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
  /*
    <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>

  
  <React.StrictMode>
>>>>>>> release
    <App />
  </React.StrictMode>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
