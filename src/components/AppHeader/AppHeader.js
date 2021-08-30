import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "../AppHeader/AppHeader.module.css";
import classNames from "classnames";

function AppHeader() {
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
            <a href="#" className={appHeaderStyles.headerbox}>
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
                {" "}
                Конструктор
              </p>
            </a>
          </li>

          <li className={classNames(appHeaderStyles.headerbox, "mt-4 mb-4")}>
            <a href="#" className={appHeaderStyles.headerbox}>
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
            </a>
          </li>

          <li
            className={classNames(
              appHeaderStyles.headerbox,
              appHeaderStyles.headerLogo,
              "mt-4 mb-4"
            )}
          >
            <a href="#" className={appHeaderStyles.headerbox}>
              <div>
                <Logo />
              </div>
            </a>
          </li>
          <li
            className={classNames(
              appHeaderStyles.headerbox,
              appHeaderStyles.headerAccount,
              "mt-4 mb-4"
            )}
          >
            <a href="#" className={appHeaderStyles.headerbox}>
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
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
