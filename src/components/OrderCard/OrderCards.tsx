import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from '../../services/types/hooks'
import OrderCardStyles from "./OrderCardStyles.module.css";
import classNames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  countDate,
  currentOrder,
  countCostOrder,
} from "../../services/actions/index";
import {
  useRouteMatch,
  Link,
  useLocation,
} from "react-router-dom";


function OrderCards() {
  const location = useLocation();
  const { url } = useRouteMatch();

  const orders = useSelector(
    (state) => state.webSocketAll.data?.orders
  );
  if (orders)
    return (
      <div>
        {orders.map((elem: any) => {

          return (
            <Link
              key={elem._id}
              to={{
                pathname: `${url}/${elem._id}`,
                state: { background: location },
              }}
            >
              <OrderCard elem={elem} key={elem._id} />
            </Link>
          );
        })}
      </div>
    );
  else return null
}

const OrderCard: FunctionComponent<{ elem: any }> = ({ elem }) => {
  const dispatch = useDispatch();
  const { createdAt, ingredients, name, number } = elem;
  const all = useSelector((state) => state.apiList.foodData);
  const { path } = useRouteMatch();

  const status = path === "/profile/orders" ? elem.status : "";
  const shownStatus = status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится' : status === 'created' ? 'Создан' : ''
  const { right, totalCost } = countCostOrder(all, ingredients);
  const statusStyle = status === 'done' ? OrderCardStyles.done : ''
  const getDetailOrder = () => {
    dispatch(currentOrder(elem));
  };

  return (
    <div
      className={classNames(OrderCardStyles.mainBox, "mb-4 p-6")}
      onClick={() => getDetailOrder()}
    >
      <div className={classNames(OrderCardStyles.header, "mb-6")}>
        <span
          className={classNames(
            OrderCardStyles.number,
            "text text_type_digits-default"
          )}
        >
          {"#" + `${number}`}
        </span>
        <span
          className={classNames(
            OrderCardStyles.time,
            "text text_type_main-default text_color_inactive"
          )}
        >
          {countDate(createdAt).join(" ")}
        </span>
      </div>
      <div className={classNames(OrderCardStyles.content)}>
        <span
          className={classNames(
            OrderCardStyles.name,
            "text text_type_main-medium mb-2"
          )}
        >
          {name}
        </span>
        <span
          className={classNames(
            OrderCardStyles.status,
            "text text_type_main-default mb-6"
          )}
        >
          <span className={`${statusStyle}`}>{shownStatus}</span>
        </span>
        <div className={classNames(OrderCardStyles.orderDetail)}>
          <div className={classNames(OrderCardStyles.ingredients, "mr-6")}>
            {right!.map((elem, i) => {
              let key = `${elem._id}${i}${number}`;
              if (i <= 4) {
                return (
                  <div
                    className={OrderCardStyles.image}
                    key={`${elem._id}${i}${number}`}
                  >
                    <img src={elem.image_mobile} alt={elem.name} />
                  </div>
                );
              }
              if (i === 5) {
                return (
                  <div
                    className={classNames(
                      OrderCardStyles.image,
                      OrderCardStyles.lastImage
                    )}
                    key={`${elem._id}${i}${number}`}
                  >
                    <span
                      className={classNames(
                        OrderCardStyles.plus,
                        "text text_type_digits-default"
                      )}
                    >{`+${right!.length - i}`}</span>
                    <img src={elem.image_mobile} alt={elem.name} />
                  </div>
                );
              }
            })}
          </div>
          <div
            className={classNames(
              OrderCardStyles.price,
              "text text_type_digits-default"
            )}
          >
            <span>{totalCost}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderCards;
