import * as types from "../actions/index";
import { ingredientsApiList, initialIngredientsApi } from "./index";
import {
  ingredientsConstructorList,
  initialIngredientsConstructorList,
} from "./index";
import { currentIngredient, initialCurrentIngredient } from "./index";
import { currentOrderDetail, initialCurrentOrder } from "./index";
import { modalInfo, initialModal } from "./index";
import { createdOrder, initialOrder } from "./index";
import { tabSwtich, initialTab } from "./index";
import { totalPrice, initialPrice } from "./index";

describe(`API ingredient's list reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialIngredientsApi).toEqual({
      hasError: false,
      error: null,
      isLoading: false,
      foodData: null,
    });
  });

  it(`should handle GET_INGREDIENTS_API_REQUEST`, () => {
    const action = {
      type: types.GET_INGREDIENTS_API_REQUEST,
    };

    expect(ingredientsApiList(initialIngredientsApi, action)).toEqual({
      ...initialIngredientsApi,
      isLoading: true,
    });
  });

  it(`should handle GET_INGREDIENTS_API_SUCCESS`, () => {
    const stateBefore = {
      hasError: false,
      error: null,
      isLoading: true,
      foodData: null,
    };
    const action = {
      type: types.GET_INGREDIENTS_API_SUCCESS,
      items: [{ 1: 1 }, { 1: 1 }, { 1: 1 }],
    };

    expect(ingredientsApiList(stateBefore, action)).toEqual({
      ...stateBefore,
      foodData: action.items,
      isLoading: false,
      hasError: false,
    });
  });

  it(`should handle GET_INGREDIENTS_API_FAILED`, () => {
    const stateBefore = {
      hasError: false,
      error: null,
      isLoading: true,
      foodData: null,
    };
    const action = {
      type: types.GET_INGREDIENTS_API_FAILED,
      error: [1, 2, 3],
    };
    expect(ingredientsApiList(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      hasError: true,
      foodData: null,
      error: action.error,
    });
  });

  it(`should handle COUNT_CARD`, () => {
    const stateBefore = {
      hasError: false,
      error: null,
      isLoading: false,
      foodData: [1, 2, 3],
    };
    const action = {
      type: types.COUNT_CARD,
      value: [1, 2, 3, 4, 5],
    };
    expect(ingredientsApiList(stateBefore, action)).toEqual({
      ...stateBefore,
      foodData: action.value,
    });
  });
});

describe(`Ingredients constructor list reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialIngredientsConstructorList).toEqual({
      bun: [],
      mainIngredients: [],
    });
  });
  it(`should handle CONSTRUCTOR_BUN`, () => {
    const action = {
      type: types.CONSTRUCTOR_BUN,
      bun: [1, 2, 3],
    };
    expect(
      ingredientsConstructorList(initialIngredientsConstructorList, action)
    ).toEqual({
      ...initialIngredientsConstructorList,
      bun: action.bun,
    });
  });

  it(`should handle CONSTRUCTOR_MAIN_INGREDIENTS`, () => {
    const action = {
      type: types.CONSTRUCTOR_MAIN_INGREDIENTS,
      mainIngredients: [1, 2, 3],
    };
    expect(
      ingredientsConstructorList(initialIngredientsConstructorList, action)
    ).toEqual({
      ...initialIngredientsConstructorList,
      mainIngredients: action.mainIngredients,
    });
  });

  it(`should handle CONSTRUCTOR_CARD_CHANGE`, () => {
    const action = {
      type: types.CONSTRUCTOR_CARD_CHANGE,
      value: [1, 2, 3],
    };
    expect(
      ingredientsConstructorList(initialIngredientsConstructorList, action)
    ).toEqual({
      ...initialIngredientsConstructorList,
      mainIngredients: action.value,
    });
  });

  it(`should handle CONSTRUCTOR_CLEAN`, () => {
    const action = {
      type: types.CONSTRUCTOR_CLEAN,
    };
    const stateBefore = {
      mainIngredients: [1, 2, 3, 4, 5],
      bun: [1, 2, 3, 4, 5, 6],
    };
    expect(ingredientsConstructorList(stateBefore, action)).toEqual({
      ...stateBefore,
      mainIngredients: [],
      bun: [],
    });
  });
});

describe(`detailed current ingredient reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialCurrentIngredient).toEqual({
      name: "",
      image: null,
      calories: null,
      proteins: null,
      fat: null,
      carbohydrates: null,
    });
  });

  it(`should handle WRITE_CURRENT_INGREDIENT`, () => {
    const action = {
      type: types.WRITE_CURRENT_INGREDIENT,
      name: "some name",
      image: "some image url",
      calories: "some calories",
      proteins: "some proteins",
      fat: "some fat",
      carbohydrates: "carbohydrates",
    };

    expect(currentIngredient(initialCurrentIngredient, action)).toEqual({
      ...initialCurrentIngredient,
      name: action.name,
      image: action.image,
      calories: action.calories,
      proteins: action.proteins,
      fat: action.fat,
      carbohydrates: action.carbohydrates,
    });
  });

  it(`should handle DELETE_CURRENT_INGREDIENT`, () => {
    const action = {
      type: types.DELETE_CURRENT_INGREDIENT,
    };
    const stateBefore = {
      name: "some name",
      image: "some image url",
      calories: "some calories",
      proteins: "some proteins",
      fat: "some fat",
      carbohydrates: "carbohydrates",
    };

    expect(currentIngredient(stateBefore, action)).toEqual({
      name: "",
      image: null,
      calories: null,
      proteins: null,
      fat: null,
      carbohydrates: null,
    });
  });
});

describe(`detailed current order reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialCurrentOrder).toEqual({
      number: null,
      name: "",
      status: "",
      ingredients: [],
      createdAt: "",
    });
  });

  it(`should handle WRITE_CURRENT_ORDER_DETAIL`, () => {
    const action = {
      type: types.WRITE_CURRENT_ORDER_DETAIL,
      number: "12345",
      name: "some name",
      status: "some status",
      ingredients: [1234, 1234, 1243, 124],
      date: "some date",
    };
    expect(currentOrderDetail(initialCurrentOrder, action)).toEqual({
      ...initialCurrentOrder,
      number: action.number,
      name: action.name,
      status: action.status,
      ingredients: action.ingredients,
      createdAt: action.date,
    });
  });

  it(`should handle DELETE_CURRENT_ORDER_DETAIL`, () => {
    const action = {
      type: types.DELETE_CURRENT_ORDER_DETAIL,
    };
    const stateBefore = {
      number: "12345",
      name: "some name",
      status: "some status",
      ingredients: [1234, 1234, 1243, 124],
      createdAt: "some date",
    };
    expect(currentOrderDetail(stateBefore, action)).toEqual({
      number: null,
      name: "",
      status: "",
      ingredients: [],
      createdAt: "",
    });
  });
});

describe(`information of modal windows reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialModal).toEqual({
      ingridientModal: false,
      orderModal: false,
      detailOrderInfo: false,
      allClose: true,
      data: null,
      isLoading: false,
      error: null,
      hasError: false,
      modalError: false,
    });
  });

  it(`should handle MODAL_INGRIDIENT_OPEN`, () => {
    const action = {
      type: types.MODAL_INGRIDIENT_OPEN,
      open: true,
    };

    expect(modalInfo(initialModal, action)).toEqual({
      ...initialModal,
      ingridientModal: action.open,
      orderModal: false,
      allClose: false,
      modalError: false,
    });
  });

  it(`should handle MODAL_ORDER_OPEN`, () => {
    const action = {
      type: types.MODAL_ORDER_OPEN,
      open: true,
    };

    expect(modalInfo(initialModal, action)).toEqual({
      ...initialModal,
      orderModal: action.open,
      ingridientModal: false,
      modalError: false,
      allClose: false,
    });
  });

  it(`should handle MODAL_ORDER_DETAIL_OPEN`, () => {
    const action = {
      type: types.MODAL_ORDER_DETAIL_OPEN,
      open: true,
    };

    expect(modalInfo(initialModal, action)).toEqual({
      ...initialModal,
      orderModal: false,
      ingridientModal: false,
      modalError: false,
      detailOrderInfo: action.open,
      allClose: false,
    });
  });

  it(`should handle MODAL_ORDER_ERROR`, () => {
    const action = {
      type: types.MODAL_ORDER_ERROR,
      open: true,
    };

    expect(modalInfo(initialModal, action)).toEqual({
      ...initialModal,
      modalError: action.open,
      ingridientModal: false,
      allClose: false,
    });
  });

  it(`should handle MODAL_CLOSE`, () => {
    const action = {
      type: types.MODAL_CLOSE,
    };

    expect(modalInfo(initialModal, action)).toEqual({
      ...initialModal,
      ingridientModal: false,
      orderModal: false,
      modalError: false,
      detailOrderInfo: false,
      allClose: true,
    });
  });

  it(`should handle GET_INFO_ONE_ORDER_REQUEST`, () => {
    const action = {
      type: types.GET_INFO_ONE_ORDER_REQUEST,
    };

    expect(modalInfo(initialModal, action)).toEqual({
      ...initialModal,
      isLoading: true,
    });
  });

  it(`should handle GET_INFO_ONE_ORDER_SUCCESS`, () => {
    const action = {
      type: types.GET_INFO_ONE_ORDER_SUCCESS,
      value: [1, 2, 3, 4, 5, 6],
    };
    const stateBefore = {
      ingridientModal: false,
      orderModal: false,
      detailOrderInfo: true,
      allClose: false,
      data: null,
      isLoading: true,
      error: null,
      hasError: false,
    };

    expect(modalInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      data: action.value,
      hasError: false,
      isLoading: false,
    });
  });

  it(`should handle GET_INFO_ONE_ORDER_ERROR`, () => {
    const stateBefore = {
      ingridientModal: false,
      orderModal: false,
      detailOrderInfo: true,
      allClose: false,
      data: null,
      isLoading: true,
      error: null,
      hasError: false,
    };
    const action = {
      type: types.GET_INFO_ONE_ORDER_ERROR,
      value: [1, 2, 3, 4, 5, 6],
    };

    expect(modalInfo(stateBefore, action)).toEqual({
      ...stateBefore,
      hasError: true,
      isLoading: false,
      error: action.value,
    });
  });
});

describe(`detailed order information reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialOrder).toEqual({
      hasError: false,
      error: null,
      isLoading: false,
      orderInfo: null,
      success: false,
    });
  });
  it(`should handle SEND_ORDER_REQUEST`, () => {
    const action = {
      type: types.SEND_ORDER_REQUEST,
    };

    expect(createdOrder(initialOrder, action)).toEqual({
      ...initialOrder,
      isLoading: true,
    });
  });

  it(`should handle SEND_ORDER_SUCCESS`, () => {
    const action = {
      type: types.SEND_ORDER_SUCCESS,
      data: [1, 2, 3, 4, 5, 6],
    };

    const stateBefore = {
      hasError: false,
      error: null,
      isLoading: true,
      orderInfo: null,
      success: false,
    };

    expect(createdOrder(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      success: true,
      hasError: false,
      orderInfo: action.data,
    })
  });

  it(`should handle SEND_ORDER_FAILED`, () => {
    const action = {
      type: types.SEND_ORDER_FAILED,
      error: [1, 2, 3, 4, 5],
    };

    const stateBefore = {
      hasError: false,
      error: null,
      isLoading: true,
      orderInfo: null,
      success: false,
    };

    expect(createdOrder(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      hasError: true,
      error: action.error,
      orderInfo: null,
    })
  })
});

describe(`tab switcher (bun, main, sause) reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialTab).toEqual({
      currentTab: "bun",
    });
  });

  it(`should handle TAB_SWITCH`, () => {
    const action = {
      type: types.TAB_SWITCH,
      value: "main",
    };
    expect(tabSwtich(initialTab, action)).toEqual({
      ...initialTab,
      currentTab: action.value,
    });
  });
});

describe(`total price ingredients reducer`, () => {
  it(`should return the initial state`, () => {
    expect(initialPrice).toEqual({
      totalPrice: null,
    });
  });
  it(`should handle COUNT_TOTAL_PRICE`, () => {
    const action = {
      type: types.COUNT_TOTAL_PRICE,
      value: 12345,
    };
    expect(totalPrice(initialPrice, action)).toEqual({
      ...initialPrice,
      totalPrice: action.value,
    });
  });
});
