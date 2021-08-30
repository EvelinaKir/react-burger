import React from "react";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Spiner from "../Spiner/Spiner";
import { useState, useEffect } from "react";
import OrderDetails from "../Modal/OrderDetails";
import Modal from "../Modal/Modal";
import { ProductContext } from "../../services/productContext";
import { OrderContext } from "../../services/orderContext";

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
        if (res.ok) {
          const result = await res.json();
          setState({ ...state, isLoading: false, foodData: result });
        } else {
          throw new Error(`Ошибка ${res.status}`);
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
  const initialIngredients = foodData;

  const [answer, setAnswer] = useState({
    result: null,
    isLoading: false,
    error: null,
  });

  const makeAnOrder = () => {
    let bunId = initialIngredients.data.find((elem) =>
      elem.type === "bun" ? elem : 0
    )._id;
    let noBunId = initialIngredients.data
      .filter((elem) => elem.type != "bun")
      .map((elem) => elem._id);
    let resultId = noBunId.concat(bunId, bunId);
    const url = "https://norma.nomoreparties.space/api/orders";
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: resultId,
      }),
    };

    (async () => {
      try {
        setAnswer({ ...answer, isLoading: true });
        const res = await fetch(url, requestOption);
        if (res.ok) {
          const result = await res.json();
          const last = await result;
          setAnswer({ ...answer, isLoading: false, result: last });
        } else {
          throw new Error(`Ошибка ${res.status}`);
        }
      } catch (e) {
        setAnswer({ ...answer, isLoading: false, error: e });
      }
    })();
    setIsOpen({ ...isOpen, openModalOrder: true });
  };

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
              <ProductContext.Provider value={initialIngredients.data}>
                <BurgerConstructor makeAnOrder={makeAnOrder} />
              </ProductContext.Provider>
              <OrderContext.Provider value={answer}>
                <Modal
                  isOpen={openModalOrder}
                  closeModal={() =>
                    setIsOpen({ ...isOpen, openModalOrder: false })
                  }
                  header={<span className={"mt-15"}></span>}
                  children={<OrderDetails />}
                />
              </OrderContext.Provider>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
