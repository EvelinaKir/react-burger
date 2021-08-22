import React from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BCStyles from "../BurgerConstructor/BurgerConstructor.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";

function Buns({ data }) {
  const res = data.find((elem) => {
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
        <Ingredients data={data} />
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
  return data.map((elem) => {
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

function BurgerConstructor({ info, makeAnOrder }) {
  return (
    <section className={BCStyles.body}>
      <Buns data={info} />
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
        <div className={BCStyles.basketButton} onClick={makeAnOrder}>
          <Button type="primary" size="medium">
            Офоромить заказ
          </Button>
        </div>
      </div>
    </section>
  );
}

Buns.propTypes = {
  data: PropTypes.array.isRequired,
};

Ingredients.propTypes = {
  data: PropTypes.array.isRequired,
};

BurgerConstructor.propTypes = {
  info: PropTypes.array.isRequired,
  makeAnOrder: PropTypes.func.isRequired,
};
export default BurgerConstructor;
