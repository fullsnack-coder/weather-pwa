import React from "react";
import "./Loader.css";

type Props = {
  darkmode?: boolean;
};

const Loader: React.FC<Props> = ({ darkmode }) => {
  return (
    <div className="sk-chase">
      <div
        className={darkmode ? "sk-chase-dot darkmode" : "sk-chase-dot"}
      ></div>
      <div
        className={darkmode ? "sk-chase-dot darkmode" : "sk-chase-dot"}
      ></div>
      <div
        className={darkmode ? "sk-chase-dot darkmode" : "sk-chase-dot"}
      ></div>
      <div
        className={darkmode ? "sk-chase-dot darkmode" : "sk-chase-dot"}
      ></div>
      <div
        className={darkmode ? "sk-chase-dot darkmode" : "sk-chase-dot"}
      ></div>
      <div
        className={darkmode ? "sk-chase-dot darkmode" : "sk-chase-dot"}
      ></div>
    </div>
  );
};

export default Loader;
