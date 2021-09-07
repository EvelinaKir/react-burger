import modalStyles from "../Modal/ModalStyles.module.css";
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {useSelector} from 'react-redux' 



function IngredientDetails() {
const {name, image, calories, proteins, fat, carbohydrates} = useSelector(state => state.currentIngredient)
const modal = useSelector(state => state.modalInfo.ingridientModal)

  if (modal)
    return (
<>
        <img src={image} alt={name} />
        <h3 className={classNames("text text_type_main-medium mb-8 mt-4")}>
          {name}
        </h3>
        <div className={classNames(modalStyles.modalDetails)}>
          <Detail type="Калории, ккал" content={calories} />
          <Detail type="Белки, г" content={proteins} />
          <Detail type="Жиры, г" content={fat} />
          <Detail type="Углеводы, г" content={carbohydrates} />
        </div>
</>
    );
  else return null;
}

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

export default IngredientDetails;
