import React from "react";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Spiner from "../Spiner/Spiner";
import { useState, useEffect } from "react";
import OrderDetails from "../Modal/OrderDetails";
import Modal from '../Modal/Modal';

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
        if(res.ok) {
        const result = await res.json();
        setState({ ...state, isLoading: false, foodData: result });
      } else {
        throw new Error(`Ошибка ${res.status}`)
      }
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
    <div className={appStyles.App}>
      <AppHeader />
      <main className={appStyles.main}>
        {isLoading && <Spiner />}
        {hasError && "Ошибка" && <div>{error}</div>}
        {!isLoading && !hasError && foodData && (
          <div className={appStyles.collectYourBurger}>
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
            <div className={appStyles.burgerConstructor}>
              <BurgerConstructor
                info={foodData.data}
                makeAnOrder={() =>
                  setIsOpen({ ...isOpen, openModalOrder: true })
                }
              />
              <Modal
                isOpen={openModalOrder}
                closeModal={() => setIsOpen({ ...isOpen, openModalOrder: false })}
                header={(<span className={"mt-15"}></span>)}
                children={<OrderDetails/>}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
