import React from "react";
import PropTypes from "prop-types";
import ModalStyles from "../Modal/ModalStyles.module.css";

function ModalOverlay({ closeClick }) {
  return <div className={ModalStyles.overlay} onClick={closeClick}></div>;
}

ModalOverlay.propTypes = {
  closeClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
