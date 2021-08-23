import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import bIStyles from "../BurgerIngredients/BurgerIngredients.module.css";
import classNames from "classnames";
import IngredientDetails from "../Modal/IngredientDetails";
import { useState } from "react";
import Modal from '../Modal/Modal';

function MainTab() {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={bIStyles.mainTab}>
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
      <div className={bIStyles.foodCardMain}>
        {info.map((elem) => {
          if (elem.type === type) {
            return (
              <div
                className={classNames(bIStyles.foodCard, "mt-6 ml-4")}
                key={elem._id}
                id={elem._id}
                onClick={modalInfo}
              >
                <img src={elem.image} alt={elem.name} />
                <div
                  className={classNames(bIStyles.foodCardPrice, "mt-1 mb-1")}
                >
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
        })}
      </div>
    );
  }

  function BurgerIngredientsSection({ sectionName, textContent, cardType }) {
    return (
      <div className={sectionName}>
        <p
          className={classNames(
            bIStyles.foodRowName,
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
    <section className={classNames(bIStyles.burgerIngredients, "mr-10")}>
      <h2
        className={classNames(
          bIStyles.burgerIngredientsHeader,
          "text text_type_main-large mt-10 mb-5"
        )}
      >
        Соберите бургер
      </h2>
      <div>
        <MainTab />
      </div>
      <div className={bIStyles.burgerIngredientsBody}>
        <BurgerIngredientsSection
          sectionName={classNames(
            bIStyles.foodRow,
            bIStyles.foodRowBun,
            "text text_type_main-medium mt-10"
          )}
          textContent="Булки"
          cardType="bun"
        />
        <BurgerIngredientsSection
          sectionName={classNames(
            bIStyles.foodRow,
            bIStyles.foodRowSauce,
            "text text_type_main-medium mt-10"
          )}
          textContent="Соусы"
          cardType="sauce"
        />
        <BurgerIngredientsSection
          sectionName={classNames(
            bIStyles.foodRow,
            bIStyles.foodRowMain,
            "text text_type_main-medium mt-10"
          )}
          textContent="Начинки"
          cardType="main"
        />
      </div>
      <Modal
        isOpen={isOpen}
        children={(<IngredientDetails card={currentCard}/>)}
        closeModal={decline} 
        header="Детали ингредиента"
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
