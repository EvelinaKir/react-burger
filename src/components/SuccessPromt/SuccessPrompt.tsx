import classNames from "classnames";
import React from "react";
import successPrompt from "./successPrompt.module.css";

function SuccessPrompt() {
  return (
    <div className={classNames(successPrompt.box, "mt-10")}>
      <span
        className={classNames(successPrompt.text, "text text_type_main-default")}
      >
        Успех!
      </span>
    </div>
  );
}
export default SuccessPrompt;