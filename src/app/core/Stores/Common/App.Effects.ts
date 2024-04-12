import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of } from "rxjs";
import { emptyaction, showalert } from "./App.Action";

@Injectable()
export class AppEffects{
    constructor (private $action: Actions,
        private _snackbar: MatSnackBar){
    }

        _showAlert=createEffect(()=>
        this.$action.pipe(
            ofType(showalert),
            exhaustMap((action)=>{
                return this.ShowSnackBarAlert(action.message,action.resulttype).afterDismissed().pipe(
                    map(()=>{
                        return emptyaction();
                    })
                )
            })
        ))

        
        ShowSnackBarAlert(message:string,resulttype: string='fail'){
            let _class=resulttype=='pass'?'green-snackbar': 'red-snackbar'
            return this._snackbar.open(message, 'OK',{
                verticalPosition:'top',
                horizontalPosition:'end',
                duration:5000,
                panelClass:[_class]
            })
        }
}