import callApi from "./components/callApi";
import "./App.css";
import Accordion from "./screean/acordion";
import NavBar from "./screean/navBar";
import RadioButton from "./screean/radioButton";
import CheckBox from "./screean/checkBox";
import DataBsTarget from "./screean/dataBsTarget";
import AlertDanger from "./screean/alertDanger";

function AppStyle() {
  const CallApi = async () => {
    callApi();
  };
  const ocultar = async () => {
    const alerd = document.getElementById("aler")?.remove;
    console.log(alerd);
    return alerd;
  };
  return (
    <div className="App">
      <NavBar />
      <RadioButton />

      <header className="">
        <CheckBox />
        <button onClick={CallApi} type="button" className="btn btn-primary">
          Primary
        </button>
        <button onClick={ocultar} type="button" className="btn btn-primary">
          Primary
        </button>
        <div className="container-fluid col-6" id="aler">
          <AlertDanger msj={""} />
        </div>
        <DataBsTarget />
      </header>

      <div className="container-fluid col-12">
        {/*<Accordion item="unos" />*/}
      </div>
    </div>
  );
}

export default AppStyle;
