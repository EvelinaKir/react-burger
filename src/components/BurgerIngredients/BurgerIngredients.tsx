import React, { FunctionComponent } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import bIStyles from "../BurgerIngredients/BurgerIngredients.module.css";
import classNames from "classnames";
import { useDispatch, useSelector } from '../../services/types/hooks'
import { Link, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import { switchTab } from "../../services/actions";
import { TIngredient } from '../../services/types/interfacesAndTypes'
import Card from "./Card";




function MainTab() {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.tabSwtich.currentTab);

  const toSwitchTab = (e: string) => {
    dispatch(switchTab(e));
    const element = document.getElementById(e);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={bIStyles.mainTab}>
      <Tab
        value="bun"
        active={current === "bun"}
        onClick={(e) => toSwitchTab(e)}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "sauce"}
        onClick={(e) => toSwitchTab(e)}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === "main"}
        onClick={(e) => toSwitchTab(e)}
      >
        Начинки
      </Tab>
    </div>
  );
}

const Cards: FunctionComponent<{ type: string }> = ({ type }) => {
  const location = useLocation();
  const info = useSelector((state) => state.apiList.foodData);
  if (info)
    return (
      <div className={bIStyles.foodCardMain}>
        {info.map((elem: TIngredient, i: number) => {
          if (elem.type === type) {
            return (
              <Link
                to={{
                  pathname: `/ingredients/${elem._id}`,
                  state: { background: location },
                }}
                key={elem._id}>
                <Card
                  index={i}
                  elem={elem}
                  key={elem._id}
                />
              </Link>
            );
          }
        })}
      </div>
    );
  else return null
}

const BurgerIngredientsSection: FunctionComponent<{ sectionName: string, textContent: string, cardType: string }> = ({ sectionName, textContent, cardType }) => {
  return (
    <div className={sectionName} id={cardType}>
      <p
        className={classNames(
          bIStyles.foodRowName,
          "text text_type_main-medium"
        )}
      >
        {textContent}
      </p>
      <Cards type={cardType} />
    </div>
  );
}
function BurgerIngredients() {
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLInputElement>(null);
  const ingredientsScroll = (e: any) => {

    const bun = e.target.childNodes[0].offsetHeight;
    const sauce = e.target.childNodes[1].clientHeight;
    if (scrollRef.current) {
      if (scrollRef.current.scrollTop < bun) {
        dispatch(switchTab("bun"));
      }
      if (
        scrollRef.current.scrollTop >= bun &&
        scrollRef.current.scrollTop < bun + sauce
      ) {
        dispatch(switchTab("sauce"));
      }
      if (scrollRef.current.scrollTop >= bun + sauce) {
        dispatch(switchTab("main"));
      }
    }
  };
  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.addEventListener("scroll", (e) => {
        ingredientsScroll(e);
      });
    }
    return () => {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", (e) => {
          ingredientsScroll(e);
        });
      }
    };
  }, []);

  return (
    <section className={classNames(bIStyles.burgerIngredients, "mr-10")}>
      <h2
        className={classNames(
          bIStyles.burgerIngredientsHeader,
          "text text_type_main-large mt-10 mb-5"
        )}
      >
        Соберите бургер
      </h2>
      <div>
        <MainTab />
      </div>
      <div className={bIStyles.burgerIngredientsBody} ref={scrollRef}>
        <BurgerIngredientsSection
          sectionName={classNames(
            bIStyles.foodRow,
            bIStyles.foodRowBun,
            "text text_type_main-medium pt-10"
          )}
          textContent="Булки"
          cardType="bun"
        />
        <BurgerIngredientsSection
          sectionName={classNames(
            bIStyles.foodRow,
            bIStyles.foodRowSauce,
            "text text_type_main-medium pt-10"
          )}
          textContent="Соусы"
          cardType="sauce"
        />
        <BurgerIngredientsSection
          sectionName={classNames(
            bIStyles.foodRow,
            bIStyles.foodRowMain,
            "text text_type_main-medium pt-10"
          )}
          textContent="Начинки"
          cardType="main"
        />
      </div>
    </section>
  );
}


export default BurgerIngredients;
