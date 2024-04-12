import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "../../services/cart.service"; 
import { catchError, exhaustMap, of, map, switchMap } from "rxjs";
import {  addtocart, addtocartsuccess,deletefromcart, deletefromcartsuccess, getcart, getcartsuccess, getmaxid, getmaxidsuccess, loadcart, loadcartfail, loadcartsuccess,updatecart, updatecartsuccess, updatestatuses, updatestatusessuccess } from "./Cart.Action";
import { showalert } from "../Common/App.Action";

@Injectable()
export class CartEffects {
    constructor(private actin$: Actions, private service: CartService) {}

    _loadcart = createEffect(() =>
        this.actin$.pipe(
            ofType(loadcart),
            exhaustMap(() => {
                return this.service.getAllCart().pipe(
                    map((data) => {
                        return loadcartsuccess({ list: data })
                    }),
                    catchError((_error) => of(loadcartfail({ errormessage: _error.message })))
                )
            })
        )
    );
    _getmaxid= createEffect(() =>
        this.actin$.pipe(
            ofType(getmaxid),
            exhaustMap(() => {
                return this.service.getMaxCartCode().pipe(
                    map((maxId) => {
                        return getmaxidsuccess({ id: maxId })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data: ' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    );

    _getcart= createEffect(() =>
        this.actin$.pipe(
            ofType(getcart),
            exhaustMap((action) => {
                return this.service.getCartById(action.id).pipe(
                    map((data) => {
                        return getcartsuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data: ' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    );

    _addtocart = createEffect(() =>
        this.actin$.pipe(
            ofType(addtocart),
            switchMap((action) => {
                return this.service.createCart(action.inputdata).pipe(
                    switchMap(() => {
                        return [
                            addtocartsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' })
                        ];
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create order', resulttype: 'fail' })))
                )
            })
        )
    );
       

    _updatecart = createEffect(() =>
        this.actin$.pipe(
            ofType(updatecart),
            switchMap((action) => {
                return this.service.updateCart(action.inputData).pipe(
                    switchMap(() => {
                        return [
                            updatecartsuccess({ inputdata: action.inputData }),
                            showalert({ message: 'Updated successfully.', resulttype: 'pass' })
                        ];
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update order', resulttype: 'fail' })))
                )
            })
        )
    );

   _deletefromcart = createEffect(() =>
        this.actin$.pipe(
            ofType(deletefromcart),
            switchMap((action) => {
                return this.service.deleteCart(action.code).pipe(
                    switchMap(() => {
                        return [
                            deletefromcartsuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' })
                        ];
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete order', resulttype: 'fail' })))
                )
            })
        )
    );
}
