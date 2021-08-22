import React from "react";
import PropTypes from "prop-types";
import ModalStyles from "../Modal/ModalStyles.module.css";
import classNames from "classnames";
import ModalOverlay from "../Modal/ModalOverlay";
import ReactDom from "react-dom";
import esc from "../../images/modalImages/modalEsc.svg";
import { useEffect, useCallback } from "react";

const modalRoot = document.getElementById("modal-portal");

function Modal({ children, header, isOpen, closeModal }) {
  const escapeClosed = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", escapeClosed);
    return () => {
      window.removeEventListener("keydown", escapeClosed);
    };
  }, [isOpen, escapeClosed]);

  if (!isOpen) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <ModalOverlay closeClick={closeModal} />
      <div className={ModalStyles.mainContainer}>
        <div className={ModalStyles.modalHeader}>
          <span
            className={classNames(
              ModalStyles.headerText,
              "text text_type_main-large ml-10 mt-10"
            )}
          >
            {header}
          </span>
          <div
            className={classNames(ModalStyles.closeButton, "mt-15 mr-10")}
            onClick={closeModal}
          >
            <img alt="escape button" src={esc} />
          </div>
        </div>
        <div className={ModalStyles.modalBody}>{children}</div>
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.any,
  header: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
