import React from 'react';
import AppStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
  return (
    <div className={AppStyles.App}>
      <AppHeader/>
      <main className={AppStyles.main}>
        <div className={AppStyles.collectYourBurger}>
        <BurgerIngredients/> 
        <div className={AppStyles.burgerConstructor}>
        <BurgerConstructor/>  
        </div>
        </div>
      </main>
    </div>
  );
}

export default App;
