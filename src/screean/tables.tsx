import React from "react";
//import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
//import "bootswatch/dist/js/bootstrap";

import "../../src/style/bootswatch/dist/journal/bootstrapDev.css";
import "../../src/style/bootswatch/dist/js/bootstrap";

function Tables() {
  return (
    <table className="table table-hover table-success table-striped">
      <thead>
        <tr>
          <th scope="col">Type</th>
          <th scope="col">Column heading</th>
          <th scope="col">Column heading</th>
          <th scope="col">Column heading</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-light">
          <th scope="row">Active</th>
          <td>Column content</td>
          <td>Column content</td>
          <td>Column content</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Tables;
