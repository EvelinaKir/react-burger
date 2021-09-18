import { getCookie } from "./auth";
export const GET_INGREDIENTS_API_REQUEST = "GET_INGREDIENTS_API_REQUEST";
export const GET_INGREDIENTS_API_SUCCESS = "GET_INGREDIENTS_API_SUCCESS";
export const GET_INGREDIENTS_API_FAILED = "GET_INGREDIENTS_API_FAILED";
export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";
export const CONSTRUCTOR_BUN = "CONSTRUCTOR_BUN";
export const CONSTRUCTOR_MAIN_INGREDIENTS = "CONSTRUCTOR_MAIN_INGREDIENTS";
export const MODAL_INGRIDIENT_OPEN = "MODAL_INGRIDIENT_OPEN";
export const MODAL_ORDER_OPEN = "MODAL_ORDER_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";
export const WRITE_CURRENT_INGREDIENT = "WRITE_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";
export const TAB_SWITCH = "TAB_SWITCH";
export const CONSTRUCTOR_CARD_CHANGE = "CONSTRUCTOR_CARD_CHANGE";
export const COUNT_TOTAL_PRICE = "COUNT_TOTAL_PRICE";
export const COUNT_CARD = "COUNT_CARD";
export const MODAL_ORDER_ERROR = 'MODAL_ORDER_ERROR';
export const CONSTRUCTOR_CLEAN = 'CONSTRUCTOR_CLEAN';

export function getIngredientsApi(url) {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_API_REQUEST,
    });
    (async () => {
      try{
      const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      });
      if (res.ok) {
        const result = await res.json();
        const last = result.data.map((elem) => {
          elem.keyAdd = 0;
          elem.key = elem._id;
          elem.counter = 0;
          return elem;
        });
        dispatch({
          type: GET_INGREDIENTS_API_SUCCESS,
          items: last,
        });
      } 
    } catch(error) {
        dispatch({
          type: GET_INGREDIENTS_API_FAILED,
          error: `Ошибка! ${error.message}`,
        });
      }
    })();
  };
}

export function getConstructorIngredients(data) {
  const bun = data.find((elem) => (elem.type === "bun" ? elem : 0));
  return function (dispatch) {
    dispatch({
      type: CONSTRUCTOR_BUN,
      bun: bun,
    });
    dispatch({
      type: CONSTRUCTOR_MAIN_INGREDIENTS,
      mainIngredients: data
        .filter((elem) => elem.type !== "bun")
    });
    dispatch({
      type: COUNT_TOTAL_PRICE,
      value: data.map((elem) => elem.price).reduce((a, b) => a + b, 0),
    });
  };
}

export function currentIngredient(elem) {
  return function (dispatch) {
    dispatch({
      type: WRITE_CURRENT_INGREDIENT,
      name: elem.name,
      image: elem.image_large,
      calories: elem.calories,
      proteins: elem.proteins,
      fat: elem.fat,
      carbohydrates: elem.carbohydrates,
    });
    dispatch({
      type: MODAL_INGRIDIENT_OPEN,
      open: true,
    });
  };
}

export function sendOrder(data) {
  return function (dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: data,
      }),
    };
    const url = "https://norma.nomoreparties.space/api/orders";
    (async () => {
      try{
      const res = await fetch(url, requestOption);
      if (res.ok) {
        const result = await res.json();
        const last = await result;
        dispatch({
          type: SEND_ORDER_SUCCESS,
          data: last,
        });
        console.log(last)
      }} catch(error) {
        dispatch({
          type: SEND_ORDER_FAILED,
          error: error.message,
        });
      }
    })();
  };
}

export function switchTab(e) {
  return function (dispatch) {
    dispatch({
      type: TAB_SWITCH,
      value: e,
    });
  };
}

export function switchCard(dragIndex, hoverIndex, ingredients, dispatch) {
  const newIngredients = [...ingredients];
  const dragIngredient = newIngredients[dragIndex];
  newIngredients.splice(dragIndex, 1);
  newIngredients.splice(hoverIndex, 0, dragIngredient);
  return function (dispatch) {
    dispatch({
      type: "CONSTRUCTOR_CARD_CHANGE",
      value: newIngredients,
    });
  };
}

export function deleteCard(mainIngredients, id, elemKey) {
  let result = [];
  const filtered = mainIngredients.filter((elem) => {
    elem.keyAdd--;
    return elem !== elemKey;
  });
  mainIngredients.length === 1
    ? (result = mainIngredients)
    : (result = filtered);
  return function (dispatch) {
    dispatch({
      type: CONSTRUCTOR_CARD_CHANGE,
      value: result,
    });
  };
}

export function countPrice(mainIngredients, bun) {
  let mainPrice = 0
  let bunPrice = 0
  if (bun.type) {
  bunPrice = bun.price * 2;
  }
  if (!bun.type){
    bunPrice = 0
  }
   if (mainIngredients.length > 0) {
   mainPrice = mainIngredients.map((elem) => elem.price).reduce((a, b) => a + b, 0)}
   if (mainIngredients.length === 0) {
     mainPrice = 0
   }
  return function (dispatch) {
    dispatch({
      type: COUNT_TOTAL_PRICE,
      value: bunPrice + mainPrice,
    });
  };
}

export const itemTypes = {
  constructor: "movableCard",
  ingredient: "addbleCard",
};

export function addCard(elem, mainIngredients, bun) {
  let newMainIngredients = [...mainIngredients];
  let newElem = {};
  if (elem.item)
    return function (dispatch) {
      if (elem.item.type === "bun" && elem.item !== bun) {
        elem.item.keyAdd = 2;
        bun.counter = 0;
        elem.item.counter = 2;
        dispatch({
          type: CONSTRUCTOR_BUN,
          bun: elem.item,
        });
      }
      if (elem.item.type !== "bun" && !mainIngredients.includes(elem.item)) {
        newMainIngredients.push(elem.item);
        elem.item.keyAdd++;
      }
      if (elem.item.type !== "bun" && mainIngredients.includes(elem.item)) {
        elem.item.keyAdd++;
        Object.assign(newElem, elem.item);
        newElem.key += newElem.keyAdd;
        newMainIngredients.push(newElem);
      }
      dispatch({
        type: CONSTRUCTOR_MAIN_INGREDIENTS,
        mainIngredients: newMainIngredients,
      });
    };
}

export function count(mainIngredients, elemKey, totalCard) {
  const newTotal = [...totalCard.foodData].filter((elem) => elem.type !== "bun");
  const newMainIngredients = [...mainIngredients];
  const counted = newMainIngredients.filter(
    (elem) => elem._id === elemKey._id
  ).length;
  const exact = newTotal.find((elem) => elem._id === elemKey._id);
  

  const filtered = newTotal.indexOf(exact);

  const difference = newTotal
    .filter((x) => !newMainIngredients.includes(x))
    .concat(newMainIngredients.filter((x) => !newTotal.includes(x)));

  
    if (difference) {
    difference.map((elem) => {
      elem.counter = 0;
      return elem;
    });
    newTotal.concat(difference).filter((elem, index) => {
      return newTotal.indexOf(elem) === index && elem.counter === 0;
    });
  }
  
  exact.counter = counted;
  newTotal.splice(filtered, 1, exact);


  return function (dispatch) {
    dispatch({
      type: COUNT_CARD,
      value: totalCard.foodData
    });
  };
}

export function closeModal(){
  return function(dispatch){
    dispatch({
    type: 'MODAL_CLOSE'
  })
  dispatch({
    type: 'DELETE_CURRENT_INGREDIENT'
  })
  }
}

export function openModalOrder(infoToSend){
  return function(dispatch){
    if (infoToSend) {
      dispatch({
        type: "CONSTRUCTOR_CLEAN"
      })
    dispatch(sendOrder(infoToSend))
  dispatch({
    type: "MODAL_ORDER_OPEN",
    open: true,
  }) 
  }
  if (!infoToSend){
    dispatch({
    type: "MODAL_ORDER_ERROR",
    open: true,
  })
  }
  }
};

export function cleanCounter(total){
  const result = total.map((elem) => {
    elem.counter = 0
    return elem
  })
  return function(dispatch){
    dispatch({
      type: COUNT_CARD,
      value: result
    });
  }
}