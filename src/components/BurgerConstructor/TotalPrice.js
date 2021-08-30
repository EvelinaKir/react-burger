import React from "react";
import { useContext } from "react";
import { ProductContext } from "../../services/productContext";
import classNames from "classnames";
import bCStyles from "../BurgerConstructor/BurgerConstructor.module.css";

export default function TotalPrice() {
  let foodContext = useContext(ProductContext);
  let bun =
    foodContext.find((elem) => (elem.type === "bun" ? elem : 0)).price * 2;
  let noBun = foodContext
    .map((elem) => (elem.type !== "bun" ? elem.price : 0))
    .reduce((a, b) => a + b, 0);
  let totalPrice = bun + noBun;

  return (
    <span
      className={classNames(
        bCStyles.basketCountPrice,
        "text",
        "text_type_digits-medium"
      )}
    >
      {totalPrice}
    </span>
  );
}
