import React from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bCStyles from "../BurgerConstructor/BurgerConstructor.module.css";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import {
  count,
  switchCard,
  deleteCard,
  sendOrder,
  getConstructorIngredients,
  countPrice,
  addCard,
} from "../../services/actions/index";
import { itemTypes } from "../../services/actions/index";
function Buns() {
  const { mainIngredients, bun } = useSelector(
    (state) => state.constructorList
  );

  const dispatch = useDispatch();
  const [, dropIngredient] = useDrop({
    accept: itemTypes.ingredient,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    drop(item, monitor) {
      dispatch(addCard(item, mainIngredients, bun));
    },
  });
  return (
    <div
      className={classNames(bCStyles.bunsBody, "mt-25")}
      key={bun._id + bun.keyAdd}
    >
      <div className={classNames(bCStyles.bun, "ml-6")}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + "\n" + "(вверх)"}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </div>
      <div className={bCStyles.allIngredients} ref={dropIngredient}>
        <Ingredients />
      </div>
      <div className={classNames(bCStyles.bun, "ml-6")}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + "\n" + "(вниз)"}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </div>
    </div>
  );
}

function Ingredients() {
  const mainIngredients = useSelector(
    (state) => state.constructorList.mainIngredients
  );
  return mainIngredients.map((elem, i) => {
    return (
      <Ingredient
        elemKey={elem}
        id={elem._id}
        name={elem.name}
        price={elem.price}
        image={elem.image_mobile}
        index={i}
        key={elem.key + elem.keyAdd}
      />
    );
  });
}

function Ingredient({ id, name, price, image, index, version, elemKey }) {
  const dispatch = useDispatch();
  const totalCard = useSelector((state) => state.apiList);
  const { mainIngredients, bun } = useSelector(
    (state) => state.constructorList
  );
  useEffect(() => {
    dispatch(count(mainIngredients, elemKey, totalCard));
  }, [mainIngredients, bun, deleteCard, switchCard]);

  const ref = useRef(null);

  const [, dropRef] = useDrop({
    accept: itemTypes.constructor,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(switchCard(dragIndex, hoverIndex, mainIngredients));
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, dragRef] = useDrag({
    type: itemTypes.constructor,
    item: () => {
      return { id, index, elemKey };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  dragRef(dropRef(ref));

  return (
    <div
      className={classNames(bCStyles.ingredient)}
      ref={ref}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => {
          dispatch(deleteCard(mainIngredients, id, elemKey, totalCard));
        }}
      />
    </div>
  );
}
Ingredient.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  index: PropTypes.number,
};
function BurgerConstructor() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.apiList.foodData);
  const { mainIngredients, bun } = useSelector(
    (state) => state.constructorList
  );

  useEffect(() => {
    dispatch(countPrice(mainIngredients, bun));
  }, [mainIngredients, bun]);

  const totalPrice = useSelector((state) => state.price.totalPrice);
  const infoToSend = mainIngredients
    .map((elem) => elem._id)
    .concat(bun._id, bun._id);
  const openModalOrder = (infoToSend) => {
    dispatch(sendOrder(infoToSend));
    dispatch({
      type: "MODAL_ORDER_OPEN",
      open: true,
    });
  };

  useEffect(() => {
    dispatch(getConstructorIngredients(store));
  }, []);

  return (
    <section className={bCStyles.body}>
      <Buns />
      <div className={classNames(bCStyles.basket, "mt-10")}>
        <span
          className={classNames(
            bCStyles.basketCountPrice,
            "text",
            "text_type_digits-medium"
          )}
        >
          {totalPrice}
        </span>
        <div className={bCStyles.basketCurrencyIcon}>
          <CurrencyIcon type="primary" />
        </div>
        <div
          className={bCStyles.basketButton}
          onClick={() => openModalOrder(infoToSend)}
        >
          <Button type="primary" size="medium">
            Офоромить заказ
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BurgerConstructor;
