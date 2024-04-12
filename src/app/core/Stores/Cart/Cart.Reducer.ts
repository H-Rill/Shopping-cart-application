import { createReducer, on } from "@ngrx/store";
import { CartState } from "./Cart.State"; 
import { addtocartsuccess, deletefromcartsuccess, getcartsuccess, getmaxidsuccess, loadcartfail, loadcartsuccess, opencartpopup, updatecartsuccess, updatestatuses } from "./Cart.Action";

const _CartReducer = createReducer(CartState,

    on(getmaxidsuccess, (state, action) => {
        return {
            ...state,
            maxId: action.id,
        }
    }),
    on(loadcartsuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errormessage: ''
        }
    }),
    on(getcartsuccess, (state, action) => {
        return {
            ...state,
            cartobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadcartfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addtocartsuccess, (state, action) => {
        const _maxid = Math.max(...state.list.map(o => o.id));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...state,
            list: [...state.list, _newdata],
            errormessage: ''
        }
    }),
    on(updatestatuses, (state, { cartList }) => ({
        ...state,
        cartList: cartList.map(cartItem => ({
          ...cartItem,
          status: 'pending' 
        }))
      })),
    on(updatecartsuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deletefromcartsuccess, (state, action) => {
        const _newdata = state.list.filter(o=>o.id!==action.code);
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(opencartpopup, (state, action) => {
        return {
            ...state,
            cartobj:{
                id: 0,
                orderId: 0,
                userId: 0,
                username: "",
                productId: 0,
                productname: "",
                quantity: 0,
                unitPrice: 0,
                totalPrice: 0,
                status: ""
            }
        }
    })
)

export function CartReducer(state: any, action: any) {
    return _CartReducer(state, action);
}
