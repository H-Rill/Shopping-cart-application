import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModels, UsersModel } from "../../../shared/modles/users-model";

const getuserstate = createFeatureSelector<UsersModel>('users');
const getuserstates = createFeatureSelector<UserModels>('users');

export const getuserlist = createSelector(getuserstate, (state) => {
    return state.list;
})

export const getSelectUser = createSelector(getuserstate, (state) => {
    return state.userobj;
})

export const isDuplicateUser = createSelector(getuserstates,(state) => state.isDuplicate);