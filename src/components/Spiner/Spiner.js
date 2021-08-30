import React from "react";
import spinerStyles from "./Spiner.module.css";
import bun from "../../images/spinerImages/burgerBun.svg";
import salad from "../../images/spinerImages/BurgerSalad.svg";
import classNames from "classnames";

function Spiner() {
  return (
    <div className={spinerStyles.container}>
      <div className={spinerStyles.spiner}>
        <div className={spinerStyles.bun}>
          <img alt="buns" src={bun} />
        </div>
        <div className={spinerStyles.ingredients}>
          <img alt="ingredients" src={salad} />
        </div>
      </div>
      <span
        className={classNames(spinerStyles.text, "text text_type_main-default")}
      >
        Загрузка
      </span>
    </div>
  );
}

export default Spiner;
