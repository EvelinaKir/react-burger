import Modal from "../Modal/Modal";
import ready from "../../images/modalImages/animatedModalReady.gif";
import ModalStyles from "../Modal/ModalStyles.module.css";
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

function OrderDetails({ isOpen, decline }) {
  const head = <span classNames={"mt-15"}></span>;
  return (
    <Modal isOpen={isOpen} closeModal={decline} header={head}>
      <span
        className={classNames(
          ModalStyles.orderNumber,
          ModalStyles.text,
          "text text_type_digits-large mb-8"
        )}
      >
        666666
      </span>
      <span
        className={classNames(
          ModalStyles.orderNumberInfo,
          ModalStyles.text,
          "text text_type_main-medium mb-15"
        )}
      >
        идентификатор заказа
      </span>
      <img
        alt="accepted icon"
        className={classNames(ModalStyles.orderIcon, "mb-15")}
        src={ready}
      />
      <span
        className={classNames(
          ModalStyles.orderReadyInfo,
          ModalStyles.text,
          "text text_type_main-default mb-2"
        )}
      >
        Ваш заказ начали готовить
      </span>
      <span
        className={classNames(
          ModalStyles.orderWaitInfo,
          "text text_type_main-default text_color_inactive mb-30"
        )}
      >
        Дождитесь готовности на орбитальной станции
      </span>
    </Modal>
  );
}

OrderDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  decline: PropTypes.func.isRequired,
};

export default OrderDetails;
