import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
//import "bootswatch/dist/js/bootstrap";

import "../../src/style/bootswatch/dist/js/bootstrap";
import React from "react";
import ListaTareas from "./lista-tareas";

const AccordionTarea = () => {
  return (
    <>
      <div className="col-12 row">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Lista de tareas
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <ListaTareas />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccordionTarea;
