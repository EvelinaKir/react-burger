import React from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import '../AppHeader/AppHeader.css'





class appHeader extends React.Component {
    render() {
        return (
            <header className="headerMain">
                <nav>
                <ul className='headerMain-navigation'>

                    <li className='headerbox header-constructor mr-2 mt-4 mb-4'> 
                        <a href="#" className='headerbox'>
                            <div className='ml-5'><BurgerIcon type="secondary"/></div>
                            <p className="header-constructor_text text text_type_main-default text_color_inactive ml-2 mr-5"> Конструктор</p>
                        </a>
                    </li>

                    <li className='headerbox header-list-order mt-4 mb-4'>
                        <a href="#" className='headerbox'>
                            <div className='ml-5'><ListIcon type="secondary"/></div>
                            <p className="header-list-order_text text text_type_main-default text_color_inactive ml-2 mr-5">Лента заказов</p>
                        </a>
                    </li>

                    <li className='headerbox header-logo mt-4 mb-4 '>
                        <a href="#" className='headerbox'>
                            <div><Logo></Logo></div>
                        </a>
                    </li>

                    <li className='headerbox header-account mt-4 mb-4'>
                        <a href="#" className='headerbox'>
                            <div className='ml-5'><ProfileIcon type="secondary"/></div>
                            <p className="header-account_text text text_type_main-default text_color_inactive ml-2 mr-5">Личный кабинет</p>
                        </a>
                    </li>
                    
                </ul>
                </nav>
            </header>
        )
    }
}



export default appHeader;