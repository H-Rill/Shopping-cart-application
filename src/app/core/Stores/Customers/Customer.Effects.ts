import { Injectable } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { beginLogin, forgotPassword, forgotPasswordFailure, forgotPasswordSuccess, getcustomers, getcustomerssuccess } from "./Customer.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { CustomerInfo } from "../../../shared/cutomer-model";
import { showalert } from "../Common/App.Action";
import { create } from "domain";

@Injectable()
export class CustomerEffects{
    constructor(private action$: Actions, private service: CustomerService, private route: Router){

    }
    _customerLogin = createEffect(() =>
        this.action$.pipe(
            ofType(beginLogin),
            switchMap((action) => {
                return this.service.customerLogin(action.customerCred).pipe(
                    switchMap((data: CustomerInfo[]) => {
                        if (data.length > 0) {
                            const _customerData = data[0];
                            if (_customerData.isActive=== true) {
                                this.service.setCustomerToLocalStorage(_customerData);
                                this.route.navigate([''])
                                return of(showalert({ message: 'Login success.', resulttype: 'pass' }))
                            } else {
                                return of(showalert({ message: 'InActive User.', resulttype: 'fail' }))
                            }
                        } else {
                            console.log('failed')
                            return of(showalert({ message: 'Login Failed: Invalid credentials.', resulttype: 'fail' }))
                        }


                    }),
                    catchError((_error) => of(showalert({ message: 'Login Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _getAllCustomers = createEffect(()=>
    this.action$.pipe(
        ofType(getcustomers),
        exhaustMap((action)=>{
            return this.service.getAllCustomers().pipe(
                map((data)=>{
                    return getcustomerssuccess({customerList:data})
                }),
                catchError((_error)=> of(showalert({message:'Failed to fetch customer list', resulttype: 'fail'})))
            )
        })
    ))

    _forgotPassword = createEffect(() =>
        this.action$.pipe(
            ofType(forgotPassword),
            exhaustMap(action =>
                this.service.forgotPassword(action.formData).pipe(
                    switchMap((data: any) => {
                        console.log('what');
                        console.log(data);
                        if (data && data.length > 0) {
                            console.log(data)
                            const firstItem = data[0]; 
                            const password = firstItem.password; 
                            localStorage.setItem('password', password);
                            console.log(localStorage.getItem('password'))
                            this.route.navigate(['forgotpassword/acknowledge']);
                            return of(forgotPasswordSuccess());
                        } else {
                            return of(showalert({ message: 'Invalid user credentials.', resulttype: 'fail' }))
                        }
                    }),
                    catchError(error => of(forgotPasswordFailure({ error: 'Failed to process forgot password request' })))
                )
            )
        )
    )
}