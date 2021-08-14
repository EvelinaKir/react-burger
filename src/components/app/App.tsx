import React from 'react';
import './App.css';
import './AppClean.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main className='main'>
        <div className="collect-your-burger">
         <BurgerIngredients></BurgerIngredients> 
        <BurgerConstructor></BurgerConstructor>  
        </div>
      </main>
    </div>
  );
}

export default App;
