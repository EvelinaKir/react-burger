import classNames from "classnames";
import React from "react";
import notFountStyles from "./notFound404.module.css";

function NotFound404() {
  return (
    <div className={classNames(notFountStyles.mainbox)}>
      <span
        className={classNames(
          notFountStyles.text,
          "text text_type_digits-large mb-6"
        )}
      >
        Error 404
      </span>
      <span
        className={classNames(
          notFountStyles.text,
          "text text_type_main-large mb-20"
        )}
      >
        {":("}
      </span>
      <span
        className={classNames(
          notFountStyles.text,
          "text text_type_main-medium"
        )}
      >
        Извините, страница не найдена
      </span>
    </div>
  );
}

export default NotFound404;
