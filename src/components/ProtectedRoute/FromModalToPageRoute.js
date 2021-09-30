import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Spiner from "../Spiner/Spiner";
import OrderDetails from "../Modal/OrderDetails";
import IngredientDetails from "../../components/Modal/IngredientDetails";

function FromModalToPageRoute({ children, ...rest }) {
  const { logged } = useSelector((state) => state.userInfo);

  return (
    <>
      <Route
        {...rest}
        render={(e) => {
          if (e.match.path === "/feed/:id") {
            return <OrderDetails />;
          }
          if (e.match.path === "/profile/orders/:id" && logged) {
            return <OrderDetails />;
          } else <Redirect to="/" />;
        }}
      />
    </>
  );
}

export default FromModalToPageRoute;
