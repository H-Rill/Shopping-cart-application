import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { adduser, addusersuccess, beginLogin, duplicateUser, duplicateUserSuccess, getuser, getusersuccess, loaduser, loaduserfail, loadusersuccess, updateuser, updateusersuccess } from "./User.Action";
import { catchError, exhaustMap, of, map, switchMap, mergeMap } from "rxjs";

import { UserService } from "../../services/user.service";
import { showalert } from "../Common/App.Action";
import { Router } from "@angular/router";

@Injectable()
export class userEffects {
    constructor(private actin$: Actions, private service: UserService, private route: Router) {

    }

    _loaduser = createEffect(() =>
        this.actin$.pipe(
            ofType(loaduser),
            exhaustMap((action) => {
                return this.service.getAll().pipe(
                    map((data) => {
                        return loadusersuccess({ list: data })
                    }),
                    catchError((_error) => of(loaduserfail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getuser = createEffect(() =>
        this.actin$.pipe(
            ofType(getuser),
            exhaustMap((action) => {
                return this.service.getById(action.id).pipe(
                    map((data) => 
                    {return getusersuccess({ obj: data });
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _adduser = createEffect(() =>
        this.actin$.pipe(
            ofType(adduser),
            switchMap((action) => {
                return this.service.createUser(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(addusersuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create user', resulttype: 'fail' })))
                )
            })
        )
    )

    _duplicateuser = createEffect(() =>
        this.actin$.pipe(
          ofType(duplicateUser),
          switchMap((action) => {
            return this.service.duplicateUsername(action.username).pipe(
                switchMap((data) => {
                if (data.length > 0) {
                  return [
                    duplicateUserSuccess({ isduplicate: true }),
                    showalert({ message: 'Username already exist', resulttype: 'fail' })
                  ];
                } else {
                  return [duplicateUserSuccess({ isduplicate: false })];
                }
              }),
              catchError((_error) => {
                return of(showalert({ message: 'Failed to create user', resulttype: 'fail' }));
              })
            );
          })
        )
      );

    _updateuser = createEffect(() =>
        this.actin$.pipe(
            ofType(updateuser),
            switchMap((action) => {
                return this.service.updateUser(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateusersuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update user', resulttype: 'fail' })))
                )
            })
        )
    )

    _userLogin = createEffect(() =>
        this.actin$.pipe(
            ofType(beginLogin),
            exhaustMap((action) => {
                return this.service.userLogin(action.usercred).pipe(
                    map((data) => {
                        if(data.length>0){
                            const _userdata=data[0];
                            if(_userdata.isActive===true) {
                                if(_userdata.role ==='admin'){
                                    this.service.setUserToLocalStorage(_userdata);
                                    this.route.navigate([''])
                                return showalert({ message: 'Login success.', resulttype: 'pass' })
                                } else if(_userdata.role ==='user'){
                                    this.service.setUserToLocalStorage(_userdata);
                                    this.route.navigate(['/shops'])
                                    return showalert({ message: 'Login success.', resulttype: 'pass' })
                                }
                                else{
                                    return showalert({ message: 'Login Failed: Invalid credentails. ', resulttype: 'fail' })
                                }
                            } else{
                                return showalert({ message: 'InActive User', resulttype: 'fail' })
                            }
                        }else{
                            return showalert({ message: 'Login Failed: Invalid credentails.', resulttype: 'fail' })
                            }
                       
                    }),
                    catchError((_error) => of(showalert({ message: `Login Failed due to ${_error.message}`, resulttype: 'fail' })))
                )
            })
        )
    )

    


}