import Modal from "../Modal/Modal";
import ModalStyles from "../Modal/ModalStyles.module.css";
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

function IngredientDetails({ isOpen, decline, card }) {
  function Detail({ type, content }) {
    return (
      <div className={classNames(ModalStyles.modalDetailsTexts, "mr-5 mb-15")}>
        <span
          className={classNames(
            ModalStyles.modalDetailsText,
            "text text_type_main-default text_color_inactive"
          )}
        >
          {type}
        </span>
        <span
          className={classNames(
            ModalStyles.modalDetailsText,
            "text_type_digits-default text_color_inactive"
          )}
        >
          {content}
        </span>
      </div>
    );
  }

  if (card.foodCard)
    return (
      <Modal isOpen={isOpen} closeModal={decline} header="Детали ингредиента">
        <img src={card.foodCard.image_large} alt={card.foodCard.name} />
        <h3 className={classNames("text text_type_main-medium mb-8 mt-4")}>
          {card.foodCard.name}
        </h3>
        <div className={classNames(ModalStyles.modalDetails)}>
          <Detail type="Калории, ккал" content={card.foodCard.calories} />
          <Detail type="Белки, г" content={card.foodCard.proteins} />
          <Detail type="Жиры, г" content={card.foodCard.fat} />
          <Detail type="Углеводы, г" content={card.foodCard.carbohydrates} />
        </div>
      </Modal>
    );
  else return <div>nothing</div>;
}

IngredientDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  decline: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};
export default IngredientDetails;
