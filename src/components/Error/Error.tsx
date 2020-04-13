import React, { useContext } from "react";
import "./Error.css";
import { appContext } from "../../context/app";

const Error: React.FC = () => {
  const { darkMode } = useContext(appContext);
  return (
    <div className={darkMode ? "Error darkmode" : "Error"}>
      <h1 className="Error__heading">Oh no :(</h1>
      <h2 className="Error__subheading">
        Necesitamos acceder a una ubicación válida
      </h2>
    </div>
  );
};

export default Error;
