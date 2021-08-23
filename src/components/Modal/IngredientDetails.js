import modalStyles from "../Modal/ModalStyles.module.css";
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

function IngredientDetails({ card }) {

  function Detail({ type, content }) {
    return (
      <div className={classNames(modalStyles.modalDetailsTexts, "mr-5 mb-15")}>
        <span
          className={classNames(
            modalStyles.modalDetailsText,
            "text text_type_main-default text_color_inactive"
          )}
        >
          {type}
        </span>
        <span
          className={classNames(
            modalStyles.modalDetailsText,
            "text_type_digits-default text_color_inactive"
          )}
        >
          {content}
        </span>
      </div>
    );
  }


  Detail.propTypes ={
    type: PropTypes.string,
    content: PropTypes.number 
  }

  if (card.foodCard)
    return (
<>
        <img src={card.foodCard.image_large} alt={card.foodCard.name} />
        <h3 className={classNames("text text_type_main-medium mb-8 mt-4")}>
          {card.foodCard.name}
        </h3>
        <div className={classNames(modalStyles.modalDetails)}>
          <Detail type="Калории, ккал" content={card.foodCard.calories} />
          <Detail type="Белки, г" content={card.foodCard.proteins} />
          <Detail type="Жиры, г" content={card.foodCard.fat} />
          <Detail type="Углеводы, г" content={card.foodCard.carbohydrates} />
        </div>
</>
    );
  else return <div>nothing</div>;
}



IngredientDetails.propTypes = {
  card: PropTypes.object.isRequired,
};
export default IngredientDetails;
