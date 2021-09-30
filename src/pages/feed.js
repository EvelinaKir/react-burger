import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import feedStyles from "./feedStyles.module.css";
import { wsConnect } from "../services/actions/webSocket";
import classNames from "classnames";
import { getCookie } from "../services/actions/auth";
import orderssData from "../utils/data";
import OrderCards from "../components/OrderCard/OrderCards";
import OrderDetails from "../components/Modal/OrderDetails";
import OrderNumbers from "../components/OrderNumbers/OrderNumbers";
import Modal from "../components/Modal/Modal";
import SmallSpiner from "../components/Spiner/SmallSpiner";
import {
  useHistory,
  useRouteMatch,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

function Feed() {
  const isLoading = useSelector((state) => state.webSocketAll.isLoading);
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();
  const currentOrderNumber = useSelector(
    (state) => state.currentOrderDetail.number
  );
  const { detailOrderInfo } = useSelector((state) => state.modalInfo);
  const data = useSelector((state) => state.webSocketAll.data);

  useEffect(() => {
    dispatch({
      type: "WS_CONNECTION_START",
      value: "wss://norma.nomoreparties.space/orders/all",
      place: false,
    });
    return () => {
      dispatch({
        type: "WS_CONNECTION_TO_CLOSE",
      });
    };
  }, []);
  
  return (
    <div className={classNames(feedStyles.main)}>
      <div className={classNames(feedStyles.mainBox, "mr-15")}>
        {isLoading && (
          <div className={feedStyles.spiner}>
            <SmallSpiner />
          </div>
        )}
        {!isLoading && data && (
          <>
            <div className={feedStyles.feedList}>
              <span
                className={classNames(
                  "text text_type_main-large mt-10 mb-5",
                  feedStyles.headerText
                )}
              >
                Лента заказов
              </span>
              <div className={classNames(feedStyles.feed)}>
                <OrderCards />
              </div>
            </div>
            <div
              className={classNames(feedStyles.ordersNumbers, "mt-25 ml-15")}
            >
              <OrderNumbers />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Feed;
