import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import "../../utils/data.js";
import PropTypes from "prop-types";
import foodData from "../../utils/data";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BIStyles from "../BurgerIngredients/BurgerIngredients.module.css";
import classNames from "classnames";


function Card(props) {
  return (
    <div className={BIStyles.foodCardMain}>
      {props.data.food.map((elem) => {
        if (elem.type === props.type) {
          return (
            <div
              className={classNames(BIStyles.foodCard, "mt-6 ml-4")}
              key={elem._id}
            >
              <img src={elem.image} alt={elem.name} />
              <div className={classNames(BIStyles.foodCardPrice, "mt-1 mb-1")}>
                <span
                  className={classNames(
                    BIStyles.foodCardPricePrice,
                    "text text_type_digits-default"
                  )}
                >
                  {elem.price}
                </span>
                <CurrencyIcon type="primary" />
              </div>
              <span
                className={classNames(
                  BIStyles.foodCardPriceName,
                  "text text_type_main-default"
                )}
              >
                {elem.name}
              </span>
            </div>
          );
        }
      })})
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

function MainTab() {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={BIStyles.mainTab}>
      <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === "Начинки"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

function BurgerIngredientsSection(props) {
  return (
    <div className={props.sectionName}>
      <p
        className={classNames(
          BIStyles.foodRowName,
          "text text_type_main-medium"
        )}
      >
        {props.textContent}
      </p>
      <Card data={foodData} type={props.cardType} />
    </div>
  );
}

BurgerIngredientsSection.propTypes = {
  sectionName: PropTypes.string,
  textContent: PropTypes.string,
  cardType: PropTypes.string,
};

function BurgerIngredients() {
  return (
    <section className={classNames(BIStyles.burgerIngredients, "mr-10")}>
      <h2
        className={classNames(
          BIStyles.burgerIngredientsHeader,
          "text text_type_main-large mt-10 mb-5"
        )}
      >
        Соберите бургер
      </h2>
      <div>
        <MainTab/>
      </div>
      <div className={BIStyles.burgerIngredientsBody}>
        <BurgerIngredientsSection
          sectionName={classNames(
            BIStyles.foodRow,
            BIStyles.foodRowBun,
            "text text_type_main-medium mt-10"
          )}
          textContent="Булки"
          cardType="bun"
        />
        <BurgerIngredientsSection
          sectionName={classNames(
            BIStyles.foodRow,
            BIStyles.foodRowSauce,
            "text text_type_main-medium mt-10"
          )}
          textContent="Соусы"
          cardType="sauce"
        />
        <BurgerIngredientsSection
          sectionName={classNames(
            BIStyles.foodRow,
            BIStyles.foodRowMain,
            "text text_type_main-medium mt-10"
          )}
          textContent="Начинки"
          cardType="main"
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
