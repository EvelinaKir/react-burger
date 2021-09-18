import { combineReducers } from "redux";
import React from "react";
import {
  GET_INGREDIENTS_API_REQUEST,
  GET_INGREDIENTS_API_SUCCESS,
  GET_INGREDIENTS_API_FAILED,
  CONSTRUCTOR_BUN,
  CONSTRUCTOR_MAIN_INGREDIENTS,
  MODAL_INGRIDIENT_OPEN,
  MODAL_ORDER_OPEN,
  MODAL_CLOSE,
  MODAL_ORDER_ERROR,
  WRITE_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  TAB_SWITCH,
  CONSTRUCTOR_CARD_CHANGE,
  COUNT_TOTAL_PRICE,
  COUNT_CARD,
  CONSTRUCTOR_CLEAN,
} from "../actions/index";

import {userRegistrationInfo, inputValue, userInfo, forgotRequest, profileChange} from './auth'

const initialIngredientsApi = {
  hasError: false,
  error: null,
  isLoading: false,
  foodData: null,
};

const initialIngredientsConstructorList = {
  bun: [],
  mainIngredients: [],
};

const initialCurrentIngredient = {
  name: "",
  image: null,
  calories: null,
  proteins: null,
  fat: null,
  carbohydrates: null,
};

const initialModal = {
  ingridientModal: false,
  orderModal: false,
  allClose: true,
};

const initialOrder = {
  hasError: false,
  error: null,
  isLoading: false,
  orderInfo: null,
  orderBase: [],
  success: false
}

const initialTab = {
  currentTab : 'bun'
}

const initialPrice = {
  totalPrice: null
}


const ingredientsApiList = (state = initialIngredientsApi, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_API_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_API_SUCCESS: {
      return {
        ...state,
        foodData: action.items,
        isLoading: false,
        hasError: false,
      };
    }
    case GET_INGREDIENTS_API_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        foodData: null,
        error: action.error,
      };
    }
    case COUNT_CARD: {
      return {
        ...state,
        foodData: action.value

        }
      }
    default: {
      return state;
    }
  }
};

const ingredientsConstructorList = (
  state = initialIngredientsConstructorList,
  action
) => {
  switch (action.type) {
    case CONSTRUCTOR_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    case CONSTRUCTOR_MAIN_INGREDIENTS: {
      return {
        ...state,
        mainIngredients: action.mainIngredients,
      };
    }
    case CONSTRUCTOR_CARD_CHANGE: {
      return {
        ...state,
        mainIngredients: action.value
      }
    }
    case CONSTRUCTOR_CLEAN: {
      return {
        ...state,
        mainIngredients: initialIngredientsConstructorList.mainIngredients,
        bun: initialIngredientsConstructorList.bun
      }
    }
    default: {
      return state;
    }
  }
};


const currentIngredient = (state = initialCurrentIngredient, action) => {
  switch (action.type) {
    case WRITE_CURRENT_INGREDIENT: {
      return {
        ...state,
          name: action.name,
        image: action.image,
        calories: action.calories,
        proteins: action.proteins,
        fat: action.fat,
        carbohydrates: action.carbohydrates,

        
      };
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        initialCurrentIngredient
        }
      }
    
    default: {
        return state;
      }
  }
}

const modalInfo = (state = initialModal, action) => {
  switch (action.type) {
    case MODAL_INGRIDIENT_OPEN: {
      return {
        ...state,
        ingridientModal: action.open,
        orderModal: false,
        allClose: false,
        orderModalError: false,
  
      };
    }
    case MODAL_ORDER_OPEN: {
      return {
        ...state,
        orderModal: action.open,
        ingridientModal: false,
        orderModalError: false,
        allClose: false
  
      };
    }
    case MODAL_ORDER_ERROR: {
      return {
        ...state,
        orderModalError: action.open,
        ingridientModal: false,
        allClose: false,
      }
    }
    case MODAL_CLOSE: {
      return {
        ...state,
        ingridientModal: false,
        orderModal: false,
        orderModalError: false,
        allClose: true
      }
    }
    default: {
        return state;
      }
  }
}

const createdOrder = (state = initialOrder, action) => {
    switch (action.type) {
      case SEND_ORDER_REQUEST: {
        return {
          ...state,
          isLoading: true
        }
      }
      case SEND_ORDER_SUCCESS: {
        return{
          ...state,
          isLoading: false,
           success: true,
           hasError: false,
          orderInfo: action.data,
          orderBase: state.orderBase.concat(action.data)
          
         
        }
      }
      case SEND_ORDER_FAILED: {
        return {
          ...state,
          isLoading: false,
          hasError: true,
          error: action.error,
          orderInfo: null
        }
      }
      default: {
        return state;
      }
    }
};


const tabSwtich = (state = initialTab, action) => {
  switch(action.type) {
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.value
      }
    }
    default: {
      return state;
    }
  }
}
const totalPrice = (state = initialPrice, action) => {
  switch(action.type) {
    case COUNT_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.value
      }
    }
    default: {
      return state;
    }
  }
}





export const rootReducer = combineReducers({
  apiList: ingredientsApiList,
  constructorList: ingredientsConstructorList,
  modalInfo: modalInfo,
  currentIngredient: currentIngredient,
    createdOrder: createdOrder,
    tabSwtich: tabSwtich,
    price: totalPrice,
    registration: userRegistrationInfo,
    inputValue : inputValue,
    userInfo : userInfo,
    forgotRequest : forgotRequest,
    profileTabChange : profileChange,
});
