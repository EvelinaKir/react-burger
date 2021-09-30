import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderNumbersStyles from "./OrderNumbersStyles.module.css";
import orderssData from "../../utils/data";

import classNames from "classnames";

function OrderNumbers(){
    const {orders, total, totalToday} =  useSelector(state => state.webSocketAll.data)
    const doneOrders = orders.filter(elem => elem.status === 'done')
    const inWorkOrders = orders.filter(elem => elem.status === 'inWork')
    let doneStyle = '' 
    doneOrders.length > 40 ? doneStyle = 'text text_type_main-small' : doneStyle ='text text_type_digits-default'
    
    return(
        <div className={classNames(OrderNumbersStyles.main)}>
            <div className={classNames(OrderNumbersStyles.table)}>
                <div className={classNames(OrderNumbersStyles.ready, 'mr-9')}>
                    <span className={classNames('text text_type_main-medium pb-6', OrderNumbersStyles.readyHeader)}>Готовы:</span>
                    <div className={classNames('mr-9', OrderNumbersStyles.readyNumbers)}>
                        {doneOrders.map((elem, i) => {
                            return (<span className={`mb-2 mr-1 ${doneStyle}`}key={elem.number}>{elem.number}</span>)
                        })}
                    </div>
                </div>
                <div className={classNames(OrderNumbersStyles.inWork)}>
                <span className={classNames('text text_type_main-medium pb-6', OrderNumbersStyles.inWorkTitle)}>В работе:</span>
                <div className={classNames(' mr-9', OrderNumbersStyles.inWorkNumbers)}>
                {doneOrders.map((elem, i) => {
                            return (<span className={`mb-2 mr-1 ${doneStyle}`}key={elem.number}>{elem.number}</span>)
                        })}  
                </div>
                </div>
            </div>
            <div className={classNames(OrderNumbersStyles.forAllTime)}>
                <span className={classNames('text text_type_main-medium mt-15')}>Выполнено за все время:</span>
                <span className={classNames(OrderNumbersStyles.number, 'text text_type_digits-large')}>{total}</span>
            </div>
            <div className={classNames(OrderNumbersStyles.forToday)}>
                <span className={classNames('text text_type_main-medium mt-15')}>Выполнено за сегодня:</span>
                <span className={classNames(OrderNumbersStyles.number, 'text text_type_digits-large')}>{totalToday}</span>
            </div>
        </div>
    )
}
export default OrderNumbers