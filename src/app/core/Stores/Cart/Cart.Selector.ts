import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartModel } from "../../../shared/modles/cart-model";


const getcartstate = createFeatureSelector<CartModel>('cart');

export const getcartlist = createSelector(getcartstate, (state) => {
    return state.list;
})

export const getcart = createSelector(getcartstate, (state) => {
    return state.cartobj;
})