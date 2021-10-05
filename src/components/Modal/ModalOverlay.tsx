import React, { FunctionComponent } from "react";
import modalStyles from "../Modal/ModalStyles.module.css";

const ModalOverlay: FunctionComponent<{closeClick: any }> = ({ closeClick }) => {
  return <div className={modalStyles.overlay} onClick={closeClick}></div>;
}


export default ModalOverlay;
