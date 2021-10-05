export interface Ielem {
    keyAdd: number;
    key: string;
    counter: number;
    _id: string;
  } 

 export interface IElemInconstructor {
    type?: string,
    price?: number
  }
  export interface IIngredientElem {
    name: string;
    image_large: string;
    image: string | undefined;
    type: string | undefined;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    counter: number;
    _id: string | undefined;
    price: number
  } 

  export interface newObj {
    count?: number,
    type?: string,
    image_mobile?: string,
    name?: string,
    _id?: string,
    price?: string,
  } 


  export interface IelemIngredients {
    _id: string,
    name: string,
    price: number,
    image_mobile: string,
    key: string,
    keyAdd: number,
  }
  
  interface IElemKey {
    _id: string;
  }
  export interface IIelemIngredientPick {
    id: string,
    name: string,
    price: number,
    image: string,
    index: number,
    elemKey: IElemKey
  }
  export interface IUserInfo {
    user: {
      name: string,
      email: string,
    }
  }

  export  interface Ires {
    status?: string | number,
    data: {
      accessToken: string,
      refreshToken: string,
    }
  }

  export interface IInfo {
    email: string,
    password: string,
    }
    