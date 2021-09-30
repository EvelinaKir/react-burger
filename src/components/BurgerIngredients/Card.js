import React from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bIStyles from "../BurgerIngredients/BurgerIngredients.module.css";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { currentIngredient } from "../../services/actions/index";
import { useDrag } from "react-dnd";
import { itemTypes } from "../../services/actions/index";
import { useHistory, useRouteMatch } from "react-router-dom";

function Card({ id, image, price, name, index, elem }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const getIngredient = (elem) => {
    dispatch(currentIngredient(elem));
    // history.replace({ pathname: `${url}` + "ingredients" + `/` + `${id}` });
  };

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
      id={id}
      onClick={() => getIngredient(elem)}
    >
      {elem.counter > 0 && <Counter count={elem.counter} size="default" />}
      <img src={image} alt={name} />
      <div className={classNames(bIStyles.foodCardPrice, "mt-1 mb-1")}>
        <span
          className={classNames(
            bIStyles.foodCardPricePrice,
            "text text_type_digits-default"
          )}
        >
          {price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span
        className={classNames(
          bIStyles.foodCardPriceName,
          "text text_type_main-default"
        )}
      >
        {name}
      </span>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  elem: PropTypes.object.isRequired,
};

export default Card;
