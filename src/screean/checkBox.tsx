import React from "react";
//import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
//import "bootswatch/dist/js/bootstrap";
import "../../src/style/bootswatch/dist/journal/bootstrapDev.css";
import "../../src/style/bootswatch/dist/js/bootstrap";

function CheckBox() {
  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic checkbox toggle button group"
    >
      <input
        type="checkbox"
        className="btn-check"
        id="btncheck1"
        //checked={true}
        autoComplete="off"
      />
      <label className="btn btn-primary" htmlFor="btncheck1">
        Checkbox 1
      </label>
      <input
        type="checkbox"
        className="btn-check"
        id="btncheck2"
        autoComplete="off"
      />
      <label className="btn btn-primary" htmlFor="btncheck2">
        Checkbox 2
      </label>
      <input
        type="checkbox"
        className="btn-check"
        id="btncheck3"
        autoComplete="off"
      />
      <label className="btn btn-primary" htmlFor="btncheck3">
        Checkbox 3
      </label>
    </div>
  );
}

export default CheckBox;
