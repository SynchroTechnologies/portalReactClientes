import React, { useState } from "react";
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

interface Props {
  msj: string;
}
const AlertDanger: React.FC<Props> = ({ msj }) => {
  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <div className="alert alert-dismissible alert-primary">
        {/*<button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
      ></button> 
        <strong>Oh !</strong>{" "}*/}
        {/*<a href="#" className="alert-link">
          {msj}
        </a>{" "}*/}
        {msj}
      </div>
    </>
  );
};
export default AlertDanger;
