import classNames from "classnames";
import React from "react";
import successStyles from "./successPrompt.module.css";

function SuccessPrompt() {
  return (
    <div className={classNames(successStyles.box, "mt-10")}>
      <span
        className={classNames(successStyles.text, "text text_type_main-default")}
      >
        Успех!
      </span>
    </div>
  );
}
export default SuccessPrompt;