import classNames from "classnames";
import React, {FunctionComponent} from "react";
import errorStyles from "./errorPrompt.module.css";

const ErrorPrompt: FunctionComponent<{error: number | string}> = ({error}) => {
  return (
    <div className={classNames(errorStyles.box, "mt-10")}>
      <span
        className={classNames(errorStyles.text, "text text_type_main-default")}
      >
        Ошибка {error} !
      </span>
      <span
        className={classNames(errorStyles.text, "text text_type_main-default")}
      >
        Проверьте правильность введенных данных
      </span>
    </div>
  );
}
export default ErrorPrompt;
