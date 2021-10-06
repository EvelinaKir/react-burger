import modalStyles from "../Modal/ModalStyles.module.css";
import React, { FunctionComponent } from "react";
import classNames from "classnames";
import error from '../../images/modalImages/error.svg'

const ErrorModal: FunctionComponent<{ typeErrorText: string, helpText: string }> = ({ typeErrorText, helpText }) => {
    return (
        <div className={(classNames(modalStyles.ModalError))}>
            <span className={(classNames('text text_type_main-large mb-8'))}>Ошибка!</span>
            <div className={(classNames(modalStyles.errorImg, 'mb-15'))}><img alt='Error' src={error} /></div>
            <span className={(classNames('text text_type_main-medium mb-5'))}>{typeErrorText}</span>
            <span className={(classNames('text text_type_main-default text_color_inactive mb-2', modalStyles.ErrorText))}>{helpText}</span>
        </div>



    )

}

export default ErrorModal


// В бургере отсутвует булка
// Пожалуйста, добавьте булку
