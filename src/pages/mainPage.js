import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import OrderDetails from "../components/Modal/OrderDetails";
import Modal from "../components/Modal/Modal";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import OrderModalError from "../components/Modal/OrderModalError";
import { useSelector } from "react-redux";
import IngredientDetails from "../components/Modal/IngredientDetails";
import mainStyles from "./mainPage.module.css";

function MainPage() {
  const { path } = useRouteMatch();
  const { ingridientModal, orderModal, orderModalError } = useSelector(
    (state) => state.modalInfo
  );

  return (
    <div className={mainStyles.main}>
      <div className={mainStyles.collectYourBurger}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <div className={mainStyles.burgerConstructor}>
            <BurgerConstructor />
          </div>
        </DndProvider>
        <Switch>
          {ingridientModal && (
            <Route path={`/ingredients/:id`}>
              <Modal
                children={<IngredientDetails />}
                header={"Детали ингредиента"}
              />
            </Route>
          )}
        </Switch>
        {orderModal && <Modal children={<OrderDetails />} />}
        {orderModalError && <Modal children={<OrderModalError />} />}
      </div>
    </div>
  );
}

export default MainPage;
