import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
import "bootswatch/dist/js/bootstrap";
import React from "react";
import Lista from "./lista";
const Accordion = () => {
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
                Lista de casos
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <Lista />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;

/*

      <Children
        title={"title"}
        content={"content"}
        information={information}
        sum={funSum}
      />
      <button className="btn btn-succes" onClick={() => traercomponente}>
        traer componente
      </button>
      
{JSON.stringify(
                    cases.map((user) => (
                      <div className="user" key={user}>
                        {user}
                      </div>
                    ))
                  )} */
