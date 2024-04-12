import { createAction, props } from "@ngrx/store"
import { CustomerCred, Customers, ForgotPasswordFormData } from "../../../shared/cutomer-model"


export const BEGIN_LOGIN='[auth] begin login'
export const GET_CUSTOMERS='[customer] get customers'
export const GET_CUSTOMER_SUCC='[customer] get customers succ'
export const FORGOT_PASSWORD='[Forgot Password] Forgot Password'
export const FORGOT_PASSWORD_SUCCESS='[Forgot Password] Forgot Password Success'
export const FORGOT_PASSWORD_FAILURE='[Forgot Password] Forgot Password Failure'

export const beginLogin=createAction(BEGIN_LOGIN,props<{customerCred:CustomerCred}>())
export const getcustomers=createAction(GET_CUSTOMERS)
export const getcustomerssuccess=createAction(GET_CUSTOMER_SUCC,props<{customerList:Customers[]}>())
export const forgotPassword = createAction(FORGOT_PASSWORD, props<{ formData: ForgotPasswordFormData }>());
export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);
export const forgotPasswordFailure = createAction(FORGOT_PASSWORD_FAILURE, props<{ error: string }>());


export const updateUserInterests = createAction(
    '[User] Update User Interests',
    props<{ userId: number; updatedInterests: string[] }>()
  );