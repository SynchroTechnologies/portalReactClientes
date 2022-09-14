import React from "react";
import "../../node_modules/bootswatch/dist/journal/bootstrap.css";
import "bootswatch/dist/js/bootstrap";

function RadioButton() {
  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio1"
        autoComplete="off"
        checked={false}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio1">
        Radio 1
      </label>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio2"
        autoComplete="off"
        checked={false}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio2">
        Radio 2
      </label>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio3"
        autoComplete="off"
        checked={false}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio3">
        Radio 3
      </label>
    </div>
  );
}

export default RadioButton;
