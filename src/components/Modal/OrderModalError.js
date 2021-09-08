import modalStyles from "../Modal/ModalStyles.module.css";
import React from "react";
import classNames from "classnames"; 
import error from '../../images/modalImages/error.svg'

  function OrderModalError(){
    return (
        <div className={(classNames(modalStyles.orderModalError))}>
            <span className={(classNames('text text_type_main-large mb-8'))}>Ошибка!</span>
            <div className={(classNames(modalStyles.errorImg, 'mb-15'))}><img  alt='Error' src={error}/></div>
            <span className={(classNames('text text_type_main-medium mb-5'))}>В бургере отсутвует булка</span>
            <span className={(classNames('text text_type_main-default text_color_inactive mb-2'))}> Пожалуйста, добавьте булку</span>
        </div>
        
        
        
    )

}

export default OrderModalError