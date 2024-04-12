import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, of, map, switchMap, tap } from "rxjs";
import { showalert } from "../Common/App.Action";
import { ProductsService } from "../../services/products.service";
import { addproduct, addproductsuccess, deleteproduct, deleteproductsuccess, getproduct, getproductsuccess, loadproduct, loadproductfail,
    loadproductsuccess, updateproduct, updateproductsuccess } from "./Product.Action";

@Injectable()
export class productEffects {
    constructor(private actin$: Actions, private service: ProductsService) {

    }

    _loadproduct = createEffect(() =>
        this.actin$.pipe(
            ofType(loadproduct),
            exhaustMap((action) => {
                return this.service.getAll().pipe(
                    map((data) => {
                        return loadproductsuccess({ list: data })
                    }),
                    catchError((_error) => of(loadproductfail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getproduct = createEffect(() =>
        this.actin$.pipe(
            ofType(getproduct),
            exhaustMap((action) => {
                return this.service.getById(action.id).pipe(
                    map((data) => 
                    {return getproductsuccess({ obj: data });
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addproduct = createEffect(() =>
        this.actin$.pipe(
            ofType(addproduct),
            switchMap((action) => {
                return this.service.createProduct(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(addproductsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create product', resulttype: 'fail' })))
                )
            })
        )
    )
    _updateproduct = createEffect(() =>
        this.actin$.pipe(
            ofType(updateproduct),
            switchMap((action) => {
                return this.service.updateProduct(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateproductsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update product', resulttype: 'fail' })))
                )
            })
        )
    )
    _deleteproduct = createEffect(() =>
    this.actin$.pipe(
        ofType(deleteproduct),
        switchMap((action) => {
            console.log('asd');
            return this.service.deleteProductById(action.code).pipe(
                switchMap((data) => {
                    return of(deleteproductsuccess({ code: action.code }),
                        showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                }),
                catchError((_error) => of(showalert({ message: 'Failed to delete product', resulttype: 'fail' })))
            )
        })
    )
)



}