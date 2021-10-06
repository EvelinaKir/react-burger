import React from "react";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import OrderReady from "../components/Modal/OrderReady";
import Modal from "../components/Modal/Modal";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useSelector } from "../services/types/hooks";
import mainStyles from "./mainPage.module.css";
import ErrorModal from '../components/Modal/ErrorModal'

function MainPage() {

  const { orderModal, modalError } =
    useSelector((state) => state.modalInfo);

  return (
    <div className={mainStyles.main}>
      <div className={mainStyles.collectYourBurger}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <div className={mainStyles.burgerConstructor}>
            <BurgerConstructor />
          </div>
        </DndProvider>
        {orderModal && (<Modal children={<OrderReady />} />)}
        {modalError && (<Modal children={<ErrorModal typeErrorText={'В бургере отсутвует булка'} helpText={'Пожалуйста, добавьте булку'} />} />)}
      </div>
    </div>
  );
}

export default MainPage;
