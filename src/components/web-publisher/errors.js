import React, { useContext } from "react";
import AppContext from "./context";

const ErrorsLog = () => {
  const { errors } = useContext(AppContext);
  console.log("errors", errors);
  return <div>TODO : Errors à afficher</div>;
};

export default ErrorsLog;
