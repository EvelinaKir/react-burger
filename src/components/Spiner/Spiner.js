import React from "react";
import SpinerStyles from "./Spiner.module.css";
import bun from "../../images/spinerImages/burgerBun.svg";
import salad from "../../images/spinerImages/BurgerSalad.svg";
import classNames from "classnames";

function Spiner() {
  return (
    <div className={SpinerStyles.container}>
      <div className={SpinerStyles.spiner}>
        <div className={SpinerStyles.bun}>
          <img alt="buns" src={bun} />
        </div>
        <div className={SpinerStyles.ingredients}>
          <img alt="ingredients" src={salad} />
        </div>
      </div>
      <span
        className={classNames(SpinerStyles.text, "text text_type_main-default")}
      >
        Загрузка
      </span>
    </div>
  );
}

export default Spiner;
