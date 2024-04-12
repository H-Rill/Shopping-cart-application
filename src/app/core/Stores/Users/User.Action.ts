import { createAction, props } from "@ngrx/store";
import { Usercred, Users } from "../../../shared/modles/users-model";

export const BEGIN_LOGIN='[auth] begin login'
export const DUPLICATE_USER = '[user page] duplicate user'
export const DUPLICATE_USER_SUCC = '[user page] duplicate user succ'
export const LOAD_USER='[user page]load user'
export const LOAD_USER_SUCCESS='[user page]load user success'
export const LOAD_USER_FAIL='[user page]load user fail'
export const ADD_USER='[user page]add user'
export const ADD_USER_SUCCESS='[user page]add user success'
export const UPDATE_USER='[user page]update user'
export const UPDATE_USER_SUCCESS='[user page]update user success'


// export const DELETE_USER='[user page]delete user'
// export const DELETE_USER_SUCCESS='[user page]delete user success'

export const GET_USER='[user page]get user'
export const GET_USER_SUCCESS='[user page]get user success'
export const OPEN_POPUP_USER='[user page]open popup'


export const beginLogin=createAction(BEGIN_LOGIN,props<{usercred:Usercred}>())
export const duplicateUser=createAction(DUPLICATE_USER,props<{username:string}>())
export const duplicateUserSuccess=createAction(DUPLICATE_USER_SUCC,props<{isduplicate:boolean}>())
export const loaduser=createAction(LOAD_USER)
export const loadusersuccess=createAction(LOAD_USER_SUCCESS,props<{list:Users[]}>())
export const loaduserfail=createAction(LOAD_USER_FAIL,props<{errormessage:string}>())

export const adduser=createAction(ADD_USER,props<{inputdata:Users}>())
export const addusersuccess=createAction(ADD_USER_SUCCESS,props<{inputdata:Users}>())

export const updateuser=createAction(UPDATE_USER,props<{inputdata:Users}>())
export const updateusersuccess=createAction(UPDATE_USER_SUCCESS,props<{inputdata:Users}>())

// export const deleteeuser=createAction(DELETE_USER,props<{code:number}>())
// export const deleteusersuccess=createAction(DELETE_USER_SUCCESS,props<{code:number}>())

export const getuser=createAction(GET_USER,props<{id:number}>())
export const getusersuccess=createAction(GET_USER_SUCCESS,props<{obj:Users}>())

export const getUsername=createAction(GET_USER,props<{username:string}>())
export const getUsernameSuccess=createAction(GET_USER_SUCCESS,props<{obj:Users}>())

export const openPopupUser=createAction(OPEN_POPUP_USER);