import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import '../BurgerIngredients/BurgerIngredients.css'
import '../../utils/data.js'
import PropTypes from 'prop-types';
import foodData from '../../utils/data';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';



function Card (props){
  
  return(
          <div className='foodCard-main'>
            {
              props.props.food.map(elem =>{
                if (elem.type == props.type){
                    return  <div className='foodCard mt-6 ml-4'key={elem._id}>
                              <img src={elem.image} alt={elem.name} />
                                <div className="foodCard-price mt-1 mb-1">
                                  <span className='foodCard-price-price text text_type_digits-default'>
                                    {elem.price}
                                  </span>
                                  <CurrencyIcon type="primary"/>
                                </div>
                                <span className="foodCard-price-name text text_type_main-default ">
                                  {elem.name}
                                </span>
                            </div>
                  }
                })  
            }
          </div>
        )
    
}

Card.propTypes = {
  props: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}

function MainTab() {
    const [current, setCurrent] = React.useState('one')
    return (
      <div style={{ display: 'flex' }}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    )
  }

function BurgerIngredientsSection(props){
  return(
    <div className={props.sectionName}>
        <p className='foodRow-name text text_type_main-medium'>{props.textContent}</p>
        <Card props={foodData} type={props.cardType}/>
    </div>
  )
}

BurgerIngredientsSection.propTypes ={
  sectionName: PropTypes.string,
  textContent: PropTypes.string,
  cardType: PropTypes.string
  }


function BurgerIngredients(){
        return (
            <section className="main-burgerIngredients mr-10">
              <h2 className="main-burgerIngredients-header text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
              <div><MainTab></MainTab></div>
                <div className="main-burgerIngredients-body">
                <BurgerIngredientsSection sectionName='foodRow text text_type_main-medium mt-10' textContent="Булки" cardType="bun"></BurgerIngredientsSection>
                <BurgerIngredientsSection sectionName='foodRow text text_type_main-medium foodRow-sauce mt-10' textContent="Соусы" cardType="sauce"></BurgerIngredientsSection>
                <BurgerIngredientsSection sectionName='foodRow text text_type_main-medium foodRow-main mt-10' textContent="Начинки" cardType="main"></BurgerIngredientsSection>
                </div>
            </section>
        )
}






export default BurgerIngredients;