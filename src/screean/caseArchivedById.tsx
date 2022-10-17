//import "./App.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { JsonSerializer, throwError } from "typescript-json-serializer";
import { JsonObject, JsonProperty } from "json2typescript";
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import { kMaxLength } from "buffer";
import { ClasesApi } from "../clases/clasesApi";
import { iListCaseForClient } from "../interfaces/listCaseClient";
import { iCase } from "../interfaces/case";
import Modals from "./modal";

function CaseArchivedById() {
  type listCaseForClient = iListCaseForClient;
  //usamos listCaseForClient para setArchivedCaseList y
  //tambien para setCaseList por que son los mismo atributos
  const [archivedCaseList, setArchivedCaseList] = useState<listCaseForClient[]>(
    []
  );
  const [caseList, setCaseList] = useState<listCaseForClient[]>([]);
  type caseId = iCase;
  const [inputId, setInputId] = useState<string>("");
  const [caseid, setCaseid] = useState<caseId[]>([]);
  let defaultSerializer = new JsonSerializer();
  let jsonConvert: JsonConvert = new JsonConvert();
  const [comments, setComments] = useState([undefined]);

  const [jcomments, setjComments] = useState([undefined]);
  useEffect(() => {
    caseForId;
    // fetchComments();
  }, [caseid]);
  //#endregion
  //#region caseForId
  const caseForId = async (id: string) => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios
      .get("/bonita/API/bpm/case/" + id)
      .then((resp) => {
        let result = resp;
        setCaseid(result.data);
        console.log("setCaseId", caseid);

        setCaseid(result.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };
  //#endregion

  return (
    <>
      <div className="form-group">
        <label className="form-label">Buscar caso</label>
        <input
          type="text"
          className=""
          id="caseId"
          placeholder="Numero de caso ?"
          onChange={(e) => setInputId(e.target.value)}
        />
        <button
          onClick={() => caseForId(inputId)}
          className="btn btn-outline-info btn-sm align-text-bottom"
        >
          Buscar
        </button>
      </div>
    </>
  );
}

export default CaseArchivedById;
