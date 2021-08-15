import React from "react";
import foodData from "../../utils/data";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BCStyles from "../BurgerConstructor/BurgerConstructor.module.css";
import classNames from "classnames";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Buns({ data }) {
  const res = data.food.find((elem) => {
    return elem.type === "bun";
  });

  return (
    <div className={classNames(BCStyles.bunsBody, "mt-25")} key={res._id + 1}>
      <div className={classNames(BCStyles.bun, "ml-6")}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={res.name}
          price={res.price}
          thumbnail={res.image_mobile}
        />
      </div>
      <div className={BCStyles.allIngredients}>
        <Ingredients data={foodData} />
      </div>
      <div className={classNames(BCStyles.bun, "ml-6")}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={res.name}
          price={res.price}
          thumbnail={res.image_mobile}
        />
      </div>
    </div>
  );
}

function Ingredients({ data }) {
  return data.food.map((elem) => {
    if (elem.type !== "bun") {
      return (
        <div className={classNames(BCStyles.ingredient)} key={elem._id + 3}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={elem.name}
            price={elem.price}
            thumbnail={elem.image_mobile}
          />
        </div>
      );
    }
  });
}

function BurgerConstructor() {
  return (
    <section className={BCStyles.body}>
      <Buns data={foodData} />
      <div className={classNames(BCStyles.basket, "mt-10")}>
        <span
          className={classNames(
            BCStyles.basketCountPrice,
            "text",
            "text_type_digits-medium"
          )}
        >
          666
        </span>
        <div className={BCStyles.basketCurrencyIcon}>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">
          Офоромить заказ
        </Button>
      </div>
    </section>
  );
}

Buns.propTypes = {
  data: PropTypes.object.isRequired,
};

Ingredients.propTypes = {
  data: PropTypes.object.isRequired,
};
export default BurgerConstructor;
