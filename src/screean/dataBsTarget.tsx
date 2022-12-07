import React from "react";
<<<<<<< HEAD
import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
import "bootswatch/dist/js/bootstrap";
=======
//import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
//import "bootswatch/dist/js/bootstrap";
import "../../src/style/bootswatch/dist/journal/bootstrapDev.css";
import "../../src/style/bootswatch/dist/js/bootstrap";
>>>>>>> release
//import "../App.css";

function DataBsTarget() {
  return (
    <>
      <div className="col-3 row">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Button with data-bs-target
        </button>
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              Offcanvas
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </div>
            <div className="dropdown mt-3">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown button
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataBsTarget;
