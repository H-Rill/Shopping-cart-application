import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductModel } from "../../../shared/modles/product-model";

const getproductstate = createFeatureSelector<ProductModel>('products');

export const getproductlist = createSelector(getproductstate, (state) => {
    return state.list;
})

export const getproduct = createSelector(getproductstate, (state) => {
    return state.productobj;
})