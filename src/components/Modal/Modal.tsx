import React, { FunctionComponent } from "react";

import modalStyles from "../Modal/ModalStyles.module.css";
import classNames from "classnames";
import ModalOverlay from "./ModalOverlay";
import ReactDom from "react-dom";
import esc from "../../images/modalImages/modalEsc.svg";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from '../../services/types/hooks'
import { closeModal } from "../../services/actions";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";

const modalRoot = document.getElementById("modal-portal")!;

const Modal: FunctionComponent<{ children: React.ReactNode, header?: React.ReactNode }> = ({ children, header }) => {
  const location = useLocation<{ background: { pathname: string } }>()

  const { url } = useRouteMatch();
  const history = useHistory();
  const closeIngredient = () => {
    dispatch(closeModal());
    history.replace({ pathname: location.state ? `${location.state.background.pathname}` : `${url}` });
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
      <div className={classNames(modalStyles.mainContainer)}>
        <div className={modalStyles.modalHeader}>
          {header}
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


export default Modal;
