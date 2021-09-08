import React from "react";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Spiner from "../Spiner/Spiner";
import { useEffect } from "react";
import OrderDetails from "../Modal/OrderDetails";
import Modal from "../Modal/Modal";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import OrderModalError from '../Modal/OrderModalError'
import {useDispatch, useSelector} from 'react-redux'
import {getIngredientsApi} from '../../services/actions/index'
import IngredientDetails from '../Modal/IngredientDetails'


function App() {
  const dispatch = useDispatch();
  const  {  hasError, error, isLoading, foodData } = useSelector(state => state.apiList)
  const {ingridientModal, orderModal, orderModalError} = useSelector(state => state.modalInfo)
  const url = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    dispatch(getIngredientsApi(url))
  }, []);

 
  return (
    <div className={appStyles.App}>
      <AppHeader />
      <main className={appStyles.main}>
        {isLoading && <Spiner />}
        {hasError && "Ошибка" && <div>{error}</div>}
        {!isLoading && !hasError && foodData && (
          <div className={appStyles.collectYourBurger}>
            <DndProvider backend={HTML5Backend}> 
            <BurgerIngredients/>
            <div className={appStyles.burgerConstructor}>
                <BurgerConstructor/>
            </div>
            </DndProvider>
            {ingridientModal && <Modal
                  children={<IngredientDetails/>}
                  header={'Детали ингредиента'}
                />}
                {orderModal &&  <Modal
                  children={<OrderDetails />
                  }
                />}
                {
                orderModalError &&  <Modal
                 children={<OrderModalError />
                 }
               /> 
                }
                  
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

