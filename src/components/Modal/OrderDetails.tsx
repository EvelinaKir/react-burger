import modalStyles from "../Modal/ModalStyles.module.css";
import React, { FunctionComponent } from "react";
import classNames from "classnames";
import ErrorModal from "./ErrorModal";
import { useParams } from "react-router-dom";
import {
  countDate,
  countCostOrder,
} from "../../services/actions/index";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from '../../services/types/hooks';
import { getOrderAxios } from "../../services/actions/index";
import Spiner from "../Spiner/Spiner";
import { getCookie } from "../../services/actions/auth";
import { useRouteMatch } from "react-router-dom";
import { newObj } from '../../services/types/interfacesAndTypes'


type QuizParams = {
  id: string;
};

function OrderDetails() {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { id } = useParams<QuizParams>();
  const { isLoading, data } = useSelector(
    (state) => state.modalInfo
  );
  const modal = useSelector((state) => state.modalInfo.detailOrderInfo);
  const url =
    path === "/profile/orders/:id"
      ? `/orders?token=${getCookie("accessToken")}`
      : "/orders/all";
  useEffect(() => {
    if (!modal) dispatch(getOrderAxios(url));
  }, []);

  return (
    <div className={classNames(modalStyles.mainOrderDetailInfo, "pb-15")}>
      {isLoading && <Spiner />}
      {!isLoading && data && (
        <>
          <Container id={id} />
        </>
      )}
    </div>
  );
}

const Container: FunctionComponent<{ id: string }> = ({ id }) => {
  const all = useSelector((state) => state.apiList.foodData);
  const modal = useSelector((state) => state.modalInfo.detailOrderInfo);
  const allOrders = useSelector((state) => state.modalInfo.data);
  const [order] = allOrders!.orders.filter((elem: any) => elem._id == id);

  if (!order) {
    return (
      <div className={"mt-30"}>
        <ErrorModal
          typeErrorText={"Заказ не найден"}
          helpText={`Возможно его уже нет в списках!`}
        />
      </div>
    );
  }

  if (order) {
    const { right, totalCost } = countCostOrder(all, order.ingredients);

    return (
      <div className={classNames(modalStyles.orderDetailModal)}>
        {!modal && (
          <span
            className={classNames(
              modalStyles.detailOrderInfoHeader,
              "text text_type_digits-default mb-10"
            )}
          >{`#${order.number}`}</span>
        )}
        <span className={classNames("text text_type_main-medium mb-3")}>
          {order.name}
        </span>
        <div className={classNames("text text_type_main-default mb-15")}>
          {order.status === "done" ? (
            <span className={classNames(modalStyles.doneStatus, "mb-2")}>
              {"Выполнен"}
            </span>
          ) : (
            <span>{"not"}</span>
          )}
        </div>

        <span className={classNames("text text_type_main-medium mb-6")}>
          {"Состав"}
        </span>
        <div className={classNames("mb-10")}>
          <Ingredients total={right} />
        </div>
        <div className={classNames(modalStyles.orderInfoTotal)}>
          {" "}
          <span
            className={classNames(
              "text text_type_main-default text_color_inactive"
            )}
          >
            {countDate(order.createdAt).join(" ")}
          </span>
          <div className={classNames(modalStyles.orderInfoTotalCost)}>
            <span className={classNames("text text_type_digits-default mr-2")}>
              {totalCost}
            </span>
            <CurrencyIcon type={'primary'} />
          </div>
        </div>
      </div>
    );
  }
  else return null
}

const Ingredients: FunctionComponent<{ total: Array<newObj> | null }> = ({ total }) => {
  const noDuplicate = Array.from(new Set(total))

  noDuplicate.map((elem) => {
    elem.count = total!.filter((el) => el === elem).length;
    if (elem.type === "bun") {
      elem.count = 2;
    }
  });

  return (
    <div className={classNames(modalStyles.ingredientScroll)}>
      {noDuplicate.map((elem, i) => {
        return (
          <div
            className={classNames(modalStyles.scrollInside, "mb-4")}
            key={`${elem._id}${i}`}
          >
            <div className={classNames(modalStyles.imageAndNameOrder)}>
              <div className={classNames(modalStyles.orderImage)}>
                <img src={elem.image_mobile} alt={elem.name} />
              </div>
              <span
                className={classNames(
                  "text text_type_main-default m-4",
                  modalStyles.orderTextContent
                )}
              >
                {elem.name}
              </span>
            </div>
            <div className={classNames(modalStyles.priceOrderInfo)}>
              <span
                className={classNames("text text_type_digits-default mr-2")}
              >{`${elem.count} x ${elem.price}`}</span>
              <CurrencyIcon type={'primary'} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderDetails;
