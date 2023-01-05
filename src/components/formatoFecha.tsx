import Moment from "moment";
export const formatearFecha = (start: string) => {
  let fecha = Moment(start).format("yyyy/MM/DD  HH:mm:ss");
  if (fecha === "Invalid date") {
    fecha = "0000/00/00 00:00:00";
  }

  return fecha;
};
