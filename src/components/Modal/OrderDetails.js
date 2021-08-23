import ready from "../../images/modalImages/animatedModalReady.gif";
import modalStyles from "../Modal/ModalStyles.module.css";
import React from "react";
import classNames from "classnames";

function OrderDetails() {
  return (
    <>
      <span
        className={classNames(
          modalStyles.orderNumber,
          modalStyles.text,
          "text text_type_digits-large mb-8"
        )}
      >
        666666
      </span>
      <span
        className={classNames(
          modalStyles.orderNumberInfo,
          modalStyles.text,
          "text text_type_main-medium mb-15"
        )}
      >
        идентификатор заказа
      </span>
      <img
        alt="accepted icon"
        className={classNames(modalStyles.orderIcon, "mb-15")}
        src={ready}
      />
      <span
        className={classNames(
          modalStyles.orderReadyInfo,
          modalStyles.text,
          "text text_type_main-default mb-2"
        )}
      >
        Ваш заказ начали готовить
      </span>
      <span
        className={classNames(
          modalStyles.orderWaitInfo,
          "text text_type_main-default text_color_inactive mb-30"
        )}
      >
        Дождитесь готовности на орбитальной станции
      </span>
      </>
  );
}

export default OrderDetails;
