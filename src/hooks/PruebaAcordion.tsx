import { Navigate } from "react-router-dom";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

export const PruebaAcordion = ({ children }: { children: JSX.Element }) => {
  return children;
};
