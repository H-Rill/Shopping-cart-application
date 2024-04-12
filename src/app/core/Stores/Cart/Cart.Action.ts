import { createAction, props } from "@ngrx/store";
import { Cart } from "../../../shared/modles/cart-model";


export const LOAD_CART = '[Cart Page] Load Cart';
export const LOAD_CART_SUCCESS = '[Cart Page] Load Cart Success';
export const LOAD_CART_FAIL = '[Cart Page] Load Cart Fail';
export const ADD_TO_CART = '[Cart Page] Add To Cart';
export const ADD_TO_CART_SUCCESS = '[Cart Page] Add To Cart Success';
export const UPDATE_CART = '[Cart Page] Update Cart';
export const UPDATE_STATUSES = '[Cart Page] Update Statuses'

export const UPDATE_CART_SUCCESS = '[Cart Page] Update Cart Success';
export const UPDATE_STATUSES_SUCCESS = '[Cart Page] Update Statuses Success';
export const DELETE_FROM_CART = '[Cart Page] Delete From Cart';
export const DELETE_FROM_CART_SUCCESS = '[Cart Page] Delete From Cart Success';
export const GET_CART= '[Cart Page] Get Cart';
export const GET_CART_SUCCESS = '[Cart Page] Get Cart Success';
export const OPEN_CART_POPUP = '[Cart Page] Open Cart Popup';
export const REORDER_CART_ITEMS = '[Cart Page] Reorder Cart Items';
export const GET_MAX_ID = '[Cart Page] Get Max Id'
export const GET_MAX_ID_SUCCESS = '[Cart Page] Get Max Id Success'

export const loadcart = createAction(LOAD_CART);
export const loadcartsuccess = createAction(LOAD_CART_SUCCESS, props<{ list: Cart[] }>());
export const loadcartfail = createAction(LOAD_CART_FAIL, props<{ errormessage: string }>());

export const addtocart= createAction(ADD_TO_CART, props<{ inputdata: Cart }>());
export const addtocartsuccess = createAction(ADD_TO_CART_SUCCESS, props<{ inputdata: Cart }>());

export const updatecart = createAction(UPDATE_CART, props<{ inputData: Cart }>());
export const updatestatuses = createAction(UPDATE_STATUSES, props<{ cartList: Cart[]}>())
export const updatecartsuccess = createAction(UPDATE_CART_SUCCESS, props<{ inputdata: Cart }>());
export const updatestatusessuccess = createAction(UPDATE_STATUSES_SUCCESS, props<{ inputdata: Cart }>());

export const deletefromcart = createAction(DELETE_FROM_CART, props<{ code: number }>());
export const deletefromcartsuccess = createAction(DELETE_FROM_CART_SUCCESS, props<{ code: number }>());

export const getcart = createAction(GET_CART, props<{ id: number }>());
export const getcartsuccess = createAction(GET_CART_SUCCESS, props<{ obj: Cart }>());

export const getmaxid = createAction(GET_MAX_ID);
export const getmaxidsuccess = createAction(GET_MAX_ID_SUCCESS, props<{ id: number }>());

export const opencartpopup = createAction(OPEN_CART_POPUP);
export const reordercartitems = createAction(REORDER_CART_ITEMS);
