import React, { FunctionComponent } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bIStyles from "../BurgerIngredients/BurgerIngredients.module.css";
import classNames from "classnames";
import { useDispatch } from '../../services/types/hooks'
import { currentIngredient } from "../../services/actions/index";
import { useDrag } from "react-dnd";
import { itemTypes } from "../../services/actions/index";
import { IIngredientElem } from '../../services/types/interfacesAndTypes'


const Card: FunctionComponent<{ index: number, elem: IIngredientElem }> = ({ index, elem }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, dragRef] = useDrag({
    type: itemTypes.ingredient,
    item: {
      item: elem,
      index: index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <div
      ref={dragRef}
      className={classNames(bIStyles.foodCard, "mt-6 ml-4")}
      id={elem._id}
      onClick={() => dispatch(currentIngredient(elem))}
    >
      {elem.counter > 0 ? (<Counter count={elem.counter} size="default" />) : null}
      <img src={elem.image} alt={elem.name} />
      <div className={classNames(bIStyles.foodCardPrice, "mt-1 mb-1")}>
        <span
          className={classNames(
            bIStyles.foodCardPricePrice,
            "text text_type_digits-default"
          )}
        >
          {elem.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span
        className={classNames(
          bIStyles.foodCardPriceName,
          "text text_type_main-default"
        )}
      >
        {elem.name}
      </span>
    </div>
  );
}

export default Card;
