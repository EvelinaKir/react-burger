import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BIStyles from "../BurgerIngredients/BurgerIngredients.module.css";
import classNames from "classnames";
import IngredientDetails from "../Modal/IngredientDetails";
import { useState } from "react";

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

function BurgerIngredients({ info, openInfo, isOpen, decline }) {
  const [currentCard, setCard] = useState({
    foodCard: null,
  });

  function modalInfo(e) {
    let found = info.find((elem) => {
      if (elem._id === e.currentTarget.id) return elem;
    });
    found ? setCard({ ...currentCard, foodCard: found }) : setCard(null);
    openInfo();
  }

  function Card({ type }) {
    return (
      <div className={BIStyles.foodCardMain}>
        {info.map((elem) => {
          if (elem.type === type) {
            return (
              <div
                className={classNames(BIStyles.foodCard, "mt-6 ml-4")}
                key={elem._id}
                id={elem._id}
                onClick={modalInfo}
              >
                <img src={elem.image} alt={elem.name} />
                <div
                  className={classNames(BIStyles.foodCardPrice, "mt-1 mb-1")}
                >
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
        })}
      </div>
    );
  }

  function BurgerIngredientsSection({ sectionName, textContent, cardType }) {
    return (
      <div className={sectionName}>
        <p
          className={classNames(
            BIStyles.foodRowName,
            "text text_type_main-medium"
          )}
        >
          {textContent}
        </p>
        <Card type={cardType} />
      </div>
    );
  }

  Card.propTypes = {
    type: PropTypes.string.isRequired,
  };

  BurgerIngredientsSection.propTypes = {
    sectionName: PropTypes.string,
    textContent: PropTypes.string,
    cardType: PropTypes.string,
  };

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
        <MainTab />
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
      <IngredientDetails
        isOpen={isOpen}
        decline={decline}
        card={currentCard}
        allInfo={info}
      />
    </section>
  );
}

BurgerIngredients.propTypes = {
  info: PropTypes.array.isRequired,
  openInfo: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  decline: PropTypes.func.isRequired,
};
export default BurgerIngredients;
