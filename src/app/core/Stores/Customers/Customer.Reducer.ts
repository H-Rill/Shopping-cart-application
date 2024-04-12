import { createReducer, on } from "@ngrx/store";
import { getcustomerssuccess } from "./Customer.Action";
import { customerAdapter, customerState } from "./Customer.State";

const _customerReducer = createReducer(customerState,
    on(getcustomerssuccess, (state, action) => {
        return customerAdapter.setAll(action.customerList, state)
    }),
    
)
export function customerReducer(state: any, action: any) {
    return _customerReducer(state, action);
}

