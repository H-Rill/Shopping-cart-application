import { createReducer, on } from "@ngrx/store";

import { addusersuccess, duplicateUserSuccess, getusersuccess, loaduserfail, loadusersuccess, openPopupUser, updateusersuccess } from "./User.Action";
import { UserState } from "./User.State";

const _UserReducer = createReducer(UserState,
    on(loadusersuccess, (state, action) => {
      
       return{
            ...state,
            list:[...action.list],
            errormessage: ''
        }
    }),
    on(loaduserfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addusersuccess, (state, action) => {
        const _maxid = Math.max(...state.list.map(o => o.id));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...state,
            list: [...state.list, _newdata],
            errormessage: ''
        }
    }),

    on(getusersuccess, (state, action) => {
        return {
            ...state,
            userobj:action.obj,
            errormessage: ''
        }
    }),

    on(updateusersuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    // on(deleteusersuccess, (state, action) => {
    //     const _newdata = state.list.filter(o=>o.id!==action.code);
    //     return {
    //         ...state,
    //         list: _newdata,
    //         errormessage: ''
    //     }
    // }),
    on(openPopupUser, (state, action) => {
        return {
            ...state,
            userobj: {
                id:0,
                username:"",
                firstName:"",
                middleName:"",
                lastName:"",
                password:"",
                email:"",
                birthdate: new Date(),
                // interests:[],
                mobilenumber:"",
                role:"",
                isActive:true
            }
        }
    }),

    on(duplicateUserSuccess,(state,action)=>{
        return {...state, isDuplicate:action.isduplicate}
    })
    
)

export function UserReducer(state: any, action: any) {
    return _UserReducer(state, action);
}