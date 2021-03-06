import modalStyles from "../Modal/ModalStyles.module.css";
import React, { FunctionComponent } from "react";
import classNames from "classnames";
import { useSelector } from '../../services/types/hooks'
import { useParams } from "react-router-dom";

type QuizParams = {
  id: string;
};
function IngredientDetails() {
  const { id } = useParams<QuizParams>();
  const foodList = useSelector((state) => state.apiList.foodData);
  const exact = foodList!.find((elem: { _id: string }) => elem._id === id);
  const modal = useSelector((state) => state.modalInfo.ingridientModal);
  if (exact)
    return (
      <div className={modalStyles.ingredientContainer}>
        {!modal && (
          <div
            className={classNames(
              modalStyles.headerTextNoModal,
              "text text_type_main-large mt-10"
            )}
          >
            {`
Детали ингредиента`}
          </div>
        )}
        <img
          className={modalStyles.image}
          src={exact.image_large}
          alt={exact.name}
        />
        <h3 className={classNames("text text_type_main-medium mb-8 mt-4")}>
          {exact.name}
        </h3>
        <div className={classNames(modalStyles.modalDetails)}>
          <Detail type="Калории, ккал" content={exact.calories} />
          <Detail type="Белки, г" content={exact.proteins} />
          <Detail type="Жиры, г" content={exact.fat} />
          <Detail type="Углеводы, г" content={exact.carbohydrates} />
        </div>
      </div>
    );
  else return null
}

const Detail: FunctionComponent<{ type: string, content: number }> = ({ type, content }) => {
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


export default IngredientDetails;
