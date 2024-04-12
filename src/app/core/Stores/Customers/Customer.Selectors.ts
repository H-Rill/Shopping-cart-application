import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerModel } from "../../../shared/cutomer-model";
import { customerAdapter } from "./Customer.State";

const getCustomerState = createFeatureSelector<CustomerModel>('users');

const customerSelector = customerAdapter.getSelectors();
export const getCustomerList = createSelector(getCustomerState, customerSelector.selectAll)

export const getCustomerByCode = createSelector(getCustomerState, (state) => state.customerInfo);

export const selectUserInfo = createSelector(
    getCustomerState,
  (state: CustomerModel) => state.customerInfo
);