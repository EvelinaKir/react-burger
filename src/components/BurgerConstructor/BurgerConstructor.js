import React from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bCStyles from "../BurgerConstructor/BurgerConstructor.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ProductContext } from "../../services/productContext";
import TotalPrice from "../BurgerConstructor/TotalPrice";

function Buns() {
  const foodContext = useContext(ProductContext);
  const res = foodContext.find((elem) => {
    return elem.type === "bun";
  });

  return (
    <div className={classNames(bCStyles.bunsBody, "mt-25")} key={res._id + 1}>
      <div className={classNames(bCStyles.bun, "ml-6")}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={res.name + "\n" + "(вверх)"}
          price={res.price}
          thumbnail={res.image_mobile}
        />
      </div>
      <div className={bCStyles.allIngredients}>
        <Ingredients />
      </div>
      <div className={classNames(bCStyles.bun, "ml-6")}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={res.name + "\n" + "(вниз)"}
          price={res.price}
          thumbnail={res.image_mobile}
        />
      </div>
    </div>
  );
}

function Ingredients() {
  const foodContext = useContext(ProductContext);
  return foodContext.map((elem) => {
    if (elem.type !== "bun") {
      return (
        <div className={classNames(bCStyles.ingredient)} key={elem._id + 3}>
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

function BurgerConstructor({ makeAnOrder }) {
  return (
    <section className={bCStyles.body}>
      <Buns />
      <div className={classNames(bCStyles.basket, "mt-10")}>
        <TotalPrice />
        <div className={bCStyles.basketCurrencyIcon}>
          <CurrencyIcon type="primary" />
        </div>
        <div className={bCStyles.basketButton} onClick={makeAnOrder}>
          <Button type="primary" size="medium">
            Офоромить заказ
          </Button>
        </div>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  makeAnOrder: PropTypes.func.isRequired,
};
export default BurgerConstructor;
