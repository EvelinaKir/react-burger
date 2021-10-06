import React from "react";
import { useSelector } from '../../services/types/hooks'
import OrderNumbersStyles from "./OrderNumbersStyles.module.css";
import classNames from "classnames";

function OrderNumbers() {
    const orders = useSelector(state => state.webSocketAll.data?.orders)
    const totalToday = useSelector(
        (state) => state.webSocketAll.data?.totalToday)
    const total = useSelector(
        (state) => state.webSocketAll.data?.total
    );

    let doneOrders
    let inWorkOrders
    if (orders) {
        doneOrders = orders.filter((elem) => elem.status === 'done')

        inWorkOrders = orders.filter((elem) => elem.status === 'pending')
    }
    if (doneOrders && inWorkOrders)
        return (
            <div className={classNames(OrderNumbersStyles.main)}>
                <div className={classNames(OrderNumbersStyles.table)}>
                    <div className={classNames(OrderNumbersStyles.ready, 'mr-9')}>
                        <span className={classNames('text text_type_main-medium pb-6', OrderNumbersStyles.readyHeader)}>Готовы:</span>
                        <div className={classNames('mr-9', OrderNumbersStyles.readyNumbers)}>
                            {doneOrders.map((elem) => {
                                return (<span className={`mb-2 mr-1 text text_type_digits-default`} key={elem.number}>{elem.number}</span>)
                            })}
                        </div>
                    </div>
                    <div className={classNames(OrderNumbersStyles.inWork)}>
                        <span className={classNames('text text_type_main-medium pb-6', OrderNumbersStyles.inWorkTitle)}>В работе:</span>
                        <div className={classNames(' mr-9', OrderNumbersStyles.inWorkNumbers)}>
                            {inWorkOrders.map((elem) => {
                                return (<span className={`mb-2 mr-1 text text_type_digits-default`} key={elem.number}>{elem.number}</span>)
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
    else return null
}
export default OrderNumbers