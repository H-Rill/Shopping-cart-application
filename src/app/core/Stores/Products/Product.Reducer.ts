import { createReducer, on } from "@ngrx/store";


import { ProductState } from "./Product.State";
import { addproductsuccess, deleteproductsuccess, getproductsuccess, loadproductfail, loadproductsuccess, openpopup, updateproductsuccess } from "./Product.Action";

const _ProductReducer = createReducer(ProductState,
    on(loadproductsuccess, (state, action) => {
        console.log('loadproductsuccess action dispatched. Data:', action.list);
       return{
            ...state,
            list:[...action.list],
            errormessage: ''
        }
    }),
    on(loadproductfail, (state, action) => {
        console.log('loadproductsuccess action dispatched. Data:', action.errormessage);
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addproductsuccess, (state, action) => {
        const _maxid = Math.max(...state.list.map(o => o.id));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...state,
            list: [...state.list, _newdata],
            errormessage: ''
        }
    }),

    on(getproductsuccess, (state, action) => {
        return {
            ...state,
            productobj:action.obj,
            errormessage: ''
        }
    }),

    on(updateproductsuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deleteproductsuccess, (state, action) => {
        console.log('Reducer triggered:', state, action);
        const _newdata = state.list.filter(o=>o.id!==action.code);
        console.log('New data after deletion:', _newdata);
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(openpopup, (state, action) => {
        return {
            ...state,
            productobj: {
                id:0,
                productname:"",
                description:"",
                price: 0,
                category:"",
                brand:"",
                stockCount:0,
                imageUrl:"",
                orderCount: 0
            }
        }
    })
)

export function ProductReducer(state: any, action: any) {
    return _ProductReducer(state, action);
}