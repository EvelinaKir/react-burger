import ready from "../../images/modalImages/animatedModalReady.gif";
import modalStyles from "../Modal/ModalStyles.module.css";
import React from "react";
import classNames from "classnames";
import { useSelector } from '../../services/types/hooks'


function OrderReady() {
  const { hasError, error, isLoading, orderInfo, success } = useSelector(state => state.createdOrder)

  return (
    <>
      {isLoading && (
        <span
          className={classNames(
            modalStyles.orderNumber,
            modalStyles.text,
            "text text_type_digits-large mb-8"
          )}
        >
          Loading...
        </span>
      )}
      {orderInfo && !isLoading && !hasError && success && (
        <>
          <span
            className={classNames(
              modalStyles.orderNumber,
              modalStyles.text,
              "text text_type_digits-large mb-8"
            )}
          >
            {orderInfo.order.number}
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
      )}
      {hasError && (
        <span className={classNames(
          modalStyles.orderNumber,
          modalStyles.text,
          "text text_type_digits-large mb-8"
        )}>
          {`Ops! Ошибка ${error}`}
        </span>
      )}
    </>
  );
}

export default OrderReady;
