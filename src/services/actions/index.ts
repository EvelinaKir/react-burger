import { instance } from "./axios";
import { getCookie } from "./auth";
import {Dispatch} from 'redux'
import { History } from 'history';
import {Ielem, IElemInconstructor, IIngredientElem, newObj} from '../types/interfaces'

export const GET_INGREDIENTS_API_REQUEST: 'GET_INGREDIENTS_API_REQUEST' = "GET_INGREDIENTS_API_REQUEST";
export const GET_INGREDIENTS_API_SUCCESS: 'GET_INGREDIENTS_API_SUCCESS' = "GET_INGREDIENTS_API_SUCCESS";
export const GET_INGREDIENTS_API_FAILED: 'GET_INGREDIENTS_API_FAILED' = "GET_INGREDIENTS_API_FAILED";

export const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED: 'SEND_ORDER_FAILED' = "SEND_ORDER_FAILED";

export const CONSTRUCTOR_BUN: 'CONSTRUCTOR_BUN' = "CONSTRUCTOR_BUN";

export const CONSTRUCTOR_MAIN_INGREDIENTS: 'CONSTRUCTOR_MAIN_INGREDIENTS' = "CONSTRUCTOR_MAIN_INGREDIENTS";

export const MODAL_INGRIDIENT_OPEN: 'MODAL_INGRIDIENT_OPEN' = "MODAL_INGRIDIENT_OPEN";
export const MODAL_ORDER_OPEN: 'MODAL_ORDER_OPEN' = "MODAL_ORDER_OPEN";
export const MODAL_CLOSE: 'MODAL_CLOSE' = "MODAL_CLOSE";
export const MODAL_ORDER_ERROR: 'MODAL_ORDER_ERROR' = "MODAL_ORDER_ERROR";
export const MODAL_ORDER_DETAIL_OPEN: 'MODAL_ORDER_DETAIL_OPEN' = "MODAL_ORDER_DETAIL_OPEN";

export const WRITE_CURRENT_INGREDIENT: 'WRITE_CURRENT_INGREDIENT' = "WRITE_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT: 'DELETE_CURRENT_INGREDIENT' = "DELETE_CURRENT_INGREDIENT";

export const TAB_SWITCH: 'TAB_SWITCH' = "TAB_SWITCH";

export const CONSTRUCTOR_CARD_CHANGE: 'CONSTRUCTOR_CARD_CHANGE' = "CONSTRUCTOR_CARD_CHANGE";
export const CONSTRUCTOR_CLEAN: 'CONSTRUCTOR_CLEAN' = "CONSTRUCTOR_CLEAN";

export const COUNT_TOTAL_PRICE: 'COUNT_TOTAL_PRICE' = "COUNT_TOTAL_PRICE";

export const COUNT_CARD: 'COUNT_CARD' = "COUNT_CARD";

export const WRITE_CURRENT_ORDER_DETAIL: 'WRITE_CURRENT_ORDER_DETAIL' = "WRITE_CURRENT_ORDER_DETAIL";
export const DELETE_CURRENT_ORDER_DETAIL: 'DELETE_CURRENT_ORDER_DETAIL' = "DELETE_CURRENT_ORDER_DETAIL";

export const GET_INFO_ONE_ORDER_REQUEST: 'GET_INFO_ONE_ORDER_REQUEST' = "GET_INFO_ONE_ORDER_REQUEST";
export const GET_INFO_ONE_ORDER_SUCCESS: 'GET_INFO_ONE_ORDER_SUCCESS' = "GET_INFO_ONE_ORDER_SUCCESS";
export const GET_INFO_ONE_ORDER_ERROR: 'GET_INFO_ONE_ORDER_ERROR' = "GET_INFO_ONE_ORDER_ERROR";

export interface IGetIngredientsApiRequest {
  readonly type: typeof GET_INGREDIENTS_API_REQUEST;
}

export interface IGetIngredientsApiSuccess {
  readonly type: typeof GET_INGREDIENTS_API_SUCCESS;
  readonly items: Array<object>
}

export interface IGetIngredientsApiFailed {
  readonly type: typeof GET_INGREDIENTS_API_FAILED;
  readonly error: object
}

export interface ISendOrderRequest {
  readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderSuccess  {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly data: object
}

export interface ISendOrderFailed  {
  readonly type: typeof SEND_ORDER_FAILED;
  readonly error: object
}

export interface IConstructorBun  {
  readonly type: typeof CONSTRUCTOR_BUN;
  readonly bun: object | null
}

export interface IConstructorMainIngredients  {
  readonly type: typeof CONSTRUCTOR_MAIN_INGREDIENTS;
  readonly mainIngredients: Array<object>
}


export interface IModalOpenIngredient {
  readonly type: typeof MODAL_INGRIDIENT_OPEN;
  readonly open: boolean
}

export interface IModalOpenOrder {
  readonly type: typeof MODAL_ORDER_OPEN;
  readonly open: boolean
}

export interface IModalOpenOrderDetail {
  readonly type: typeof MODAL_ORDER_DETAIL_OPEN;
  readonly open: boolean
}

export interface IModalOpenError {
  readonly type: typeof MODAL_ORDER_ERROR;
  readonly open: boolean
}

export interface IModalClose {
  readonly type: typeof MODAL_CLOSE;
}

export interface IWhireCurrentIngredient {
  readonly type: typeof WRITE_CURRENT_INGREDIENT;
  readonly name: string ;
  readonly image: string ;
  readonly calories: number ;
  readonly proteins: number ;
  readonly fat: number ;
  readonly carbohydrates: number ;

}

export interface IDeleteCurrentIngredient {
  readonly type: typeof DELETE_CURRENT_INGREDIENT;
}

export interface ITabSwitch {
  readonly type: typeof TAB_SWITCH;
  readonly value: string;
}

export interface IConstructorCardChange {
  readonly type: typeof CONSTRUCTOR_CARD_CHANGE;
  readonly value: Array<object>;
}

export interface IConstructorClean {
  readonly type: typeof CONSTRUCTOR_CLEAN;
}

export interface ICountTotalPrice {
  readonly type: typeof COUNT_TOTAL_PRICE;
  readonly value: number | null;
}

export interface ICountCard {
  readonly type: typeof COUNT_CARD;
  readonly value: Array<object>
}

export interface IWriteCurrentOrderDetail {
  readonly type: typeof WRITE_CURRENT_ORDER_DETAIL;
  readonly number: number;
  readonly name: string;
  readonly status: string;
  readonly ingredients: Array<object>;
  readonly date: string;

}
export interface IDeleteCurrentOrderDetail {
  readonly type: typeof DELETE_CURRENT_ORDER_DETAIL;
}

export interface IGetIngoOneOrderRequest {
  readonly type: typeof GET_INFO_ONE_ORDER_REQUEST;
}

export interface IGetIngoOneOrderSuccess {
  readonly type: typeof GET_INFO_ONE_ORDER_SUCCESS;
  readonly value: object
}

export interface IGetIngoOneOrderError {
  readonly type: typeof GET_INFO_ONE_ORDER_ERROR;
  readonly value: object
}

export type TIndexActions = 
| IGetIngoOneOrderError
|IGetIngoOneOrderSuccess
|IGetIngoOneOrderRequest
| IDeleteCurrentOrderDetail
|IWriteCurrentOrderDetail
|ICountCard
|ICountTotalPrice
|IConstructorClean
|IConstructorCardChange
|ITabSwitch
|IDeleteCurrentIngredient
|IWhireCurrentIngredient
|IModalClose
|IModalOpenError
|IModalOpenOrderDetail
|IModalOpenOrder
|IModalOpenIngredient
|IConstructorMainIngredients
|IConstructorBun
|ISendOrderFailed
|ISendOrderSuccess
|ISendOrderRequest
|IGetIngredientsApiFailed
|IGetIngredientsApiSuccess
|IGetIngredientsApiRequest;


//Fetch code as an example.

// export function getIngredientsApi(url) {
//   return function (dispatch) {
//     dispatch({
//       type: GET_INGREDIENTS_API_REQUEST,
//     });
//     (async () => {
//       try {
//         const res = await fetch(url, {
//           method: "GET",
//           mode: "cors",
//           cache: "no-cache",
//           credentials: "same-origin",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           redirect: "follow",
//           referrerPolicy: "no-referrer",
//         });
//         if (res.ok) {
//           const result = await res.json();
//           const last = result.data.map((elem) => {
//             elem.keyAdd = 0;
//             elem.key = elem._id;
//             elem.counter = 0;
//             return elem;
//           });
//           dispatch({
//             type: GET_INGREDIENTS_API_SUCCESS,
//             items: last,
//           });
//         }
//       } catch (error) {
//         dispatch({
//           type: GET_INGREDIENTS_API_FAILED,
//           error: `Ошибка! ${error.message}`,
//         });
//       }
//     })();
//   };
// }

//axios code
export function getOrderAxios(url: string) {
  return async function (dispatch:Dispatch<TIndexActions>) {
    try {
      const res = await instance.get(url);
      dispatch({
        type: GET_INFO_ONE_ORDER_REQUEST,
      });
      if (res.status === 200) {
        const { data } = res;
        //
        dispatch({
          type: GET_INFO_ONE_ORDER_SUCCESS,
          value: data,
        });
      }
    } catch (error: any) {
      dispatch({
        type: GET_INFO_ONE_ORDER_ERROR,
        value: error,
      });
    }
  };
}

export function getIngredientsApiAxios() {
  return async function (dispatch:Dispatch<TIndexActions>) {
    try {
      const res = await instance.get("ingredients");
      dispatch({
        type: GET_INGREDIENTS_API_REQUEST,
      });
      if (res.status === 200) {
        const { data } = res.data;
        const last = data.map((elem: Ielem) => {
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
    } catch (error: any) {
      dispatch({
        type: GET_INGREDIENTS_API_FAILED,
        error: error,
      });
    }
  };
}

export function getConstructorIngredients(data: Array<object>) {
  const bun: object | null = data.find((elem: IElemInconstructor) => {
    if (elem.type === "bun")  {return elem }
  else return null}) || null;
  return function (dispatch:Dispatch<TIndexActions>) {
    dispatch({
      type: CONSTRUCTOR_BUN,
      bun: bun,
    });
    dispatch({
      type: CONSTRUCTOR_MAIN_INGREDIENTS,
      mainIngredients: data.filter((elem: IElemInconstructor) => elem.type !== "bun"),
    });
    dispatch({
      type: COUNT_TOTAL_PRICE,
      value: data.map((elem: IElemInconstructor) => elem.price).reduce((a: number, b: number | undefined) => a + b!, 0) || null,
    });
  };
}

export function currentIngredient(elem: IIngredientElem) {
  return function (dispatch:Dispatch<TIndexActions>) {
    dispatch({
      type: WRITE_CURRENT_INGREDIENT,
      name: elem.name ,
      image: elem.image_large ,
      calories: elem.calories ,
      proteins: elem.proteins ,
      fat: elem.fat ,
      carbohydrates: elem.carbohydrates ,
    });
    dispatch({
      type: MODAL_INGRIDIENT_OPEN,
      open: true,
    });
  };
}

// export function sendOrder(data) {
//   return function (dispatch) {
//     dispatch({
//       type: SEND_ORDER_REQUEST,
//     });
//     const requestOption = {
//       method: "POST",
//       headers: { "Content-Type": "application/json",
//       Authorization: "Bearer " + getCookie("accessToken")
//     },
//       body: JSON.stringify({
//         ingredients: data,
//       }),
//     };
//     const url = "https://norma.nomoreparties.space/api/orders";
//     (async () => {
//       try {
//         const res = await fetch(url, requestOption);
//         if (res.ok) {
//           const result = await res.json();
//           const last = await result;
//           dispatch({
//             type: SEND_ORDER_SUCCESS,
//             data: last,
//           });
//         }
//       } catch (error) {
//         dispatch({
//           type: SEND_ORDER_FAILED,
//           error: error.message,
//         });
//       }
//     })();
//   };
// }

export function sendOrderAxios(data: Array<object>) {
  return async function (dispatch:Dispatch<TIndexActions>) {
    try {
      dispatch({
        type: SEND_ORDER_REQUEST,
      });
      const res = await instance.post("orders", {
        ingredients: data,
      });
      if (res.status === 200) {
        const { data } = res;
        dispatch({
          type: SEND_ORDER_SUCCESS,
          data: data,
        });
      }
    } catch (error: any) {
      dispatch({
        type: SEND_ORDER_FAILED,
        error: error,
      });
    }
  };
}

export function switchTab(e: string) {
  return function (dispatch:Dispatch<TIndexActions>) {
    dispatch({
      type: TAB_SWITCH,
      value: e,
    });
  };
}

export function switchCard(dragIndex: number, hoverIndex: number, ingredients: Array<object>) {
  const newIngredients = [...ingredients];
  const dragIngredient = newIngredients[dragIndex];
  newIngredients.splice(dragIndex, 1);
  newIngredients.splice(hoverIndex, 0, dragIngredient);
  return function (dispatch:Dispatch<TIndexActions>) {
    dispatch({
      type: "CONSTRUCTOR_CARD_CHANGE",
      value: newIngredients,
    });
  };
}


export function deleteCard(mainIngredients: Array<{keyAdd: number}>, id: string, elemKey: object) {
  let result: Array<object> = [];
  const filtered = mainIngredients.filter((elem) => {
    elem.keyAdd--;
    return elem !== elemKey;
  });
  mainIngredients.length === 1
    ? (result = mainIngredients)
    : (result = filtered);
  return function (dispatch:Dispatch<TIndexActions>) {
    dispatch({
      type: CONSTRUCTOR_CARD_CHANGE,
      value: result,
    });
  };
}

export function countPrice(mainIngredients: Array<{price: number}>, bun: {type: string, price: number}) {
  let mainPrice = 0;
  let bunPrice = 0;
  if (bun.type) {
    bunPrice = bun.price * 2;
  }
  if (!bun.type) {
    bunPrice = 0;
  }
  if (mainIngredients.length > 0) {
    mainPrice = mainIngredients
      .map((elem) => elem.price)
      .reduce((a, b) => a + b, 0);
  }
  if (mainIngredients.length === 0) {
    mainPrice = 0;
  }
  return function (dispatch:Dispatch<TIndexActions>) {
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


export function addCard(elem: any, mainIngredients: Array<object>, bun: {counter: number}) {
  let newMainIngredients = [...mainIngredients];
  let newElem: any = {};
  if (elem.item)
    return function (dispatch:Dispatch<TIndexActions>) {
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


export function count(mainIngredients: Array<object>, elemKey: {_id: string}, totalCard: {foodData:Array<object> }) {
  const newTotal = [...totalCard.foodData].filter(
    (elem: any) => elem.type !== "bun"
  );
  const newMainIngredients = [...mainIngredients];
  const counted = newMainIngredients.filter(
    (elem: any) => elem._id === elemKey._id
  ).length;
  const exact: any = newTotal.find((elem: any) => elem._id === elemKey._id);

  const filtered = newTotal.indexOf(exact);

  const difference = newTotal
    .filter((x) => !newMainIngredients.includes(x))
    .concat(newMainIngredients.filter((x) => !newTotal.includes(x)));

  if (difference) {
    difference.map((elem: any) => {
      elem.counter = 0;
      return elem;
    });
    newTotal.concat(difference).filter((elem: any, index) => {
      return newTotal.indexOf(elem) === index && elem.counter === 0;
    });
  }

  exact.counter = counted;
  newTotal.splice(filtered, 1, exact);

  return function (dispatch:Dispatch<TIndexActions>) {
    dispatch({
      type: COUNT_CARD,
      value: totalCard.foodData,
    });
  };
}

export function closeModal() {
  return function (dispatch:Dispatch<TIndexActions>) {
    dispatch({
      type: "MODAL_CLOSE",
    });
    dispatch({
      type: "DELETE_CURRENT_INGREDIENT",
    });
  };
}

export function openModalOrder(infoToSend: null | Array<object>) {
  return function (dispatch: any) {
    if (infoToSend) {
      dispatch({
        type: "CONSTRUCTOR_CLEAN",
      });
      dispatch(sendOrderAxios(infoToSend));
      dispatch({
        type: "MODAL_ORDER_OPEN",
        open: true,
      });
    }
    else {
      dispatch({
        type: "MODAL_ORDER_ERROR",
        open: true,
      });
    }
  };
}



export function cleanCounter(total: Array<{counter: number}>) {
  const result = total.map((elem) => {
    elem.counter = 0;
    return elem;
  });
  return function (dispatch:Dispatch<TIndexActions>) {
    dispatch({
      type: COUNT_CARD,
      value: result,
    });
  };
}

export function countDate(createdAt: string) {
  function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  const date = new Date(createdAt);
  const today = Number(new Date().getDate().toString());
  const previosMonth: number  = Number(new Date().getMonth().toString());

  const presentYear: number = Number(new Date().getFullYear().toString());

  const countedMonth = daysInMonth(previosMonth, presentYear);

  const options: object = {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const formatted = date
    .toLocaleDateString("ru-RU", options)
    .toString()
    .replace(/[,.]/g, "")
    .split(" ");
  const newDate = formatted.slice();
  formatted.map((elem, i, arr: any) => {
    let minusDay = today - arr[0];
    const orderDay = Number(arr[0]);
    if (minusDay <= 0) {
      minusDay = Number(countedMonth) - Number(orderDay) + 1;
    }
    if (orderDay == today) {
      newDate.splice(0, 1, "Сегодня,");
    }
    if (orderDay == today - 1) {
      newDate.splice(0, 1, "Вчера,");
    }
    if (orderDay > today && orderDay !== today - 1) {
      newDate.splice(
        0,
        1,
        minusDay === 1
          ? "Вчера,"
          : `${minusDay} ${minusDay <= 4 ? "дня" : "дней"} назад`
      );
    }
    if (orderDay < today && orderDay !== today - 1) {
      newDate.splice(
        0,
        1,
        minusDay === 1
          ? "Вчера,"
          : `${minusDay} ${minusDay <= 4 ? "дня" : "дней"} назад`
      );
    }
    newDate.splice(2, 1, `i-${arr[2]}`);
  });
  return newDate;
}

export function currentOrder(elem: {number: number, name: string, status: string, ingredients: Array<object>, createdAt: string}) {
  return function (dispatch :Dispatch<TIndexActions>) {
    dispatch({
      type: WRITE_CURRENT_ORDER_DETAIL,
      number: elem.number,
      name: elem.name,
      status: elem.status,
      ingredients: elem.ingredients,
      date: elem.createdAt,
    });
    dispatch({
      type: MODAL_ORDER_DETAIL_OPEN,
      open: true,
    });
  };
}

export function countCostOrder(all: Array<newObj>, ingredients: Array<object>) {

  
  let result: {right: null | Array<newObj>;
    totalCost: null | number;} = {
    right: null,
    totalCost: null,
  };

  const sim = all
    .filter((x: any) => ingredients.includes(x._id))
    .concat(ingredients.filter((x) => all.includes(x)));


  result.right = sim.sort((a: any) => {
    if (a.type === "bun") {
      return -1;
    } else {
      return 1;
    }
  });

  result.totalCost = result.right
    .map((elem: any) => {
      if (elem.type == "bun") {
        return elem.price * 2;
      }
      if (elem.type != "bun") {
        return elem.price;
      }
    })
    .reduce((a, b) => a + b, 0);

  return result;
}


export type TindexActions = {
  
}