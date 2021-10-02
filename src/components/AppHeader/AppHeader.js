import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "../AppHeader/AppHeader.module.css";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNoLogIn,
  loggedInInput,
} from "../../services/actions/auth";

function AppHeader() {
  const {  logged, userInfo } =
    useSelector((state) => state.userInfo);

  const location = useLocation();


  const dispatch = useDispatch();
  useEffect(() => {
    if (logged) {
      dispatch({
        type: "INPUT_PASSWORD_VALUE",
        value: "",
      });
      dispatch({
        type: "PROFILE_SELECTED",
        value: true,
      });
    }
    if (!logged) {
      dispatch(clearNoLogIn());
    }
  }, [location.pathname]);

  useEffect(() => {
    if (logged) {
      dispatch(loggedInInput(userInfo));
    }
  }, [logged]);

  return (
    <header className={appHeaderStyles.headerMain}>
      <nav>
        <ul className={appHeaderStyles.headerMainNav}>
          <li
            className={classNames(
              appHeaderStyles.headerbox,
              appHeaderStyles.headerСonstructor,
              "mr-2 mt-4 mb-4"
            )}
          >
            <NavLink
              exact
              to={{ pathname: "/" }}
              className={appHeaderStyles.headerbox}
              activeClassName={appHeaderStyles.activeLink}
            >
              <div className="ml-5">
                <BurgerIcon type="secondary" />
              </div>
              <p
                className={classNames(
                  "text",
                  "text_type_main-default",
                  "text_color_inactive",
                  "ml-2 mr-5"
                )}
              >
                Конструктор
              </p>
            </NavLink>
          </li>

          <li className={classNames(appHeaderStyles.headerbox, "mt-4 mb-4")}>
            <NavLink
              exact
              activeClassName={appHeaderStyles.activeLink}
              to={{ pathname: "/feed" }}
              className={appHeaderStyles.headerbox}
            >
              <div className="ml-5">
                <ListIcon type="secondary" />
              </div>
              <p
                className={classNames(
                  "text",
                  "text_type_main-default",
                  "text_color_inactive",
                  "ml-2 mr-5"
                )}
              >
                Лента заказов
              </p>
            </NavLink>
          </li>

          <li
            className={classNames(
              appHeaderStyles.headerbox,
              appHeaderStyles.headerLogo,
              "mt-4 mb-4"
            )}
          >
            <div className={appHeaderStyles.headerbox}>
              <Logo />
            </div>
          </li>
          <li
            className={classNames(
              appHeaderStyles.headerbox,
              appHeaderStyles.headerAccount,
              "mt-4 mb-4"
            )}
          >
            <NavLink
              activeClassName={appHeaderStyles.activeLink}
              to={{ pathname: "/profile" }}
              className={appHeaderStyles.headerbox}
            >
              <div className="ml-5">
                <ProfileIcon type="secondary" />
              </div>
              <p
                className={classNames(
                  "text",
                  "text_type_main-default",
                  "text_color_inactive",
                  "ml-2 mr-5"
                )}
              >
                Личный кабинет
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
