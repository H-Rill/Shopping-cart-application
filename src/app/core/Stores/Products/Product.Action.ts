import { createAction, props } from "@ngrx/store";
import { Products } from "../../../shared/modles/product-model";


export const LOAD_PRODUCT='[product page]load product'
export const LOAD_PRODUCT_SUCCESS='[product page]load product success'
export const LOAD_PRODUCT_FAIL='[product page]load product fail'
export const ADD_PRODUCT='[product page]add product'
export const ADD_PRODUCT_SUCCESS='[product page]add product success'
export const UPDATE_PRODUCT='[product page]update product'
export const UPDATE_PRODUCT_SUCCESS='[product page]update product success'


export const DELETE_PRODUCT='[product page]delete product'
export const DELETE_PRODUCT_SUCCESS='[product page]delete product success'

export const GET_PRODUCT='[product page]get product'
export const GET_PRODUCT_SUCCESS='[product page]get product success'
export const OPEN_POPUP='[product page]open popup'

export const loadproduct=createAction(LOAD_PRODUCT)
export const loadproductsuccess=createAction(LOAD_PRODUCT_SUCCESS,props<{list:Products[]}>())
export const loadproductfail=createAction(LOAD_PRODUCT_FAIL,props<{errormessage:string}>())

export const addproduct=createAction(ADD_PRODUCT,props<{inputdata:Products}>())
export const addproductsuccess=createAction(ADD_PRODUCT_SUCCESS,props<{inputdata:Products}>())

export const updateproduct=createAction(UPDATE_PRODUCT,props<{inputdata:Products}>())
export const updateproductsuccess=createAction(UPDATE_PRODUCT_SUCCESS,props<{inputdata:Products}>())

export const deleteproduct=createAction(DELETE_PRODUCT,props<{code:number}>())
export const deleteproductsuccess=createAction(DELETE_PRODUCT_SUCCESS,props<{code:number}>())

export const getproduct=createAction(GET_PRODUCT,props<{id:number}>())
export const getproductsuccess=createAction(GET_PRODUCT_SUCCESS,props<{obj:Products}>())

export const openpopup=createAction(OPEN_POPUP);