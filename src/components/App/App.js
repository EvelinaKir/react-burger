import React from "react";
import AppStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Spiner from "../Spiner/Spiner";
import { useState, useEffect } from "react";
import OrderDetails from "../Modal/OrderDetails";

function App() {
  const [state, setState] = useState({
    hasError: false,
    error: null,
    isLoading: false,
    foodData: null,
  });
  const url = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    (async () => {
      try {
        setState({ ...state, isLoading: true });
        const res = await fetch(url);
        const result = await res.json();
        setState({ ...state, isLoading: false, foodData: result });
      } catch (e) {
        setState({ ...state, error: e, hasError: true });
      }
    })();
  }, []);

  const [isOpen, setIsOpen] = useState({
    openModalOrder: false,
    openModalProductInfo: false,
  });

  const { hasError, error, isLoading, foodData } = state;
  const { openModalOrder, openModalProductInfo } = isOpen;

  return (
    <div className={AppStyles.App}>
      <AppHeader />
      <main className={AppStyles.main}>
        {isLoading && <Spiner />}
        {hasError && "Ошибка" && <div>{error}</div>}
        {!isLoading && !hasError && foodData && (
          <div className={AppStyles.collectYourBurger}>
            <BurgerIngredients
              info={foodData.data}
              openInfo={() =>
                setIsOpen({ ...isOpen, openModalProductInfo: true })
              }
              isOpen={openModalProductInfo}
              decline={() =>
                setIsOpen({ ...isOpen, openModalProductInfo: false })
              }
            />
            <div className={AppStyles.burgerConstructor}>
              <BurgerConstructor
                info={foodData.data}
                makeAnOrder={() =>
                  setIsOpen({ ...isOpen, openModalOrder: true })
                }
              />
              <OrderDetails
                isOpen={openModalOrder}
                decline={() => setIsOpen({ ...isOpen, openModalOrder: false })}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
