import React from 'react';
import foodData from '../../utils/data';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import '../BurgerConstructor/BurgerConstructor.css'
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurConstructor(props){
    return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className='burconstructor-body mt-25'>
              {
                props.props.food.map((elem, i) =>{
                  if ( i === 0) {
                    return  <div className="BurConstructorItem ml-4 mr-4">
                            <DragIcon type="primary"/>
                            <ConstructorElement key={elem._id + 1}
                            type="top"
                            isLocked={true}
                            text={elem.name}
                            price={elem.price}
                            thumbnail={elem.image_mobile}
                            />
                            </div>
                  }

                if ( i == props.props.food.length - 1) {
                    return  <div className="BurConstructorItem ml-4 mr-4">
                              <DragIcon type="primary"/>
                              <ConstructorElement key={elem._id + 2}
                              type="bottom"
                              isLocked={true}
                              text={elem.name}
                              price={elem.price}
                              thumbnail={elem.image_mobile}
                              />
                            </div>
                  }

                if ( i < props.props.food.length) {
                    return <div className="BurConstructorItem ml-4 mr-4">
                            <DragIcon type="primary"/>
                            <ConstructorElement key={elem._id + 3}
                            text={elem.name}
                            price={elem.price}
                            thumbnail={elem.image_mobile}
                            />
                          </div>
                  }
                })
              }
            </div>   
    )
  }



function BurgerConstructor () {
  console.log(CurrencyIcon)
    return (
        <section className="burgerConstructor-body">
            <BurConstructor props={foodData}></BurConstructor>
            <div className="main-page-basket mt-10">
            
             <span className="main-page-basket__count-price text text_type_digits-medium">666</span>
             <div className="main-page-basket__CurrencyIcon">
             <CurrencyIcon type='primary'/>
             </div>
               
             <Button type="primary" size="medium">Офоромить заказ</Button>     
             </div>
               
           
        </section>
    )
}

BurConstructor.propTypes = {
  props: PropTypes.object.isRequired,
}
export default BurgerConstructor;