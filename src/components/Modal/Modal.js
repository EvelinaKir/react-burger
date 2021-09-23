import React from "react";
import PropTypes from "prop-types";
import modalStyles from "../Modal/ModalStyles.module.css";
import classNames from "classnames";
import ModalOverlay from "../Modal/ModalOverlay";
import ReactDom from "react-dom";
import esc from "../../images/modalImages/modalEsc.svg";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/actions";
import { useHistory } from "react-router-dom";

const modalRoot = document.getElementById("modal-portal");

function Modal({ children, header }) {
  const history = useHistory();
  const closeIngredient = () => {
    dispatch(closeModal());
    history.replace({ pathname: "/" });
  };
  const dispatch = useDispatch();
  const { allClose } = useSelector((state) => state.modalInfo);
  const escapeClosed = useCallback((e) => {
    if (e.key === "Escape") {
      closeIngredient();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", escapeClosed);
    return () => {
      window.removeEventListener("keydown", escapeClosed);
    };
  }, []);

  if (allClose) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <ModalOverlay closeClick={() => closeIngredient()} />
      <div className={modalStyles.mainContainer}>
        <div className={modalStyles.modalHeader}>
          <span
            className={classNames(
              modalStyles.headerText,
              "text text_type_main-large ml-10 mt-10"
            )}
          >
            {header}
          </span>
          <div
            className={classNames(modalStyles.closeButton, "mt-15 mr-10")}
            onClick={() => closeIngredient()}
          >
            <img alt="escape button" src={esc} />
          </div>
        </div>
        <div className={modalStyles.modalBody}>{children}</div>
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.any,
  header: PropTypes.any,
};

export default Modal;
