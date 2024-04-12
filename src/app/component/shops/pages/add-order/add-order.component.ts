import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CartService } from '../../../../core/services/cart.service';
import { getcart } from '../../../../core/Stores/Cart/Cart.Selector';
import { take } from 'rxjs';
import { Cart } from '../../../../shared/modles/cart-model';
import { addtocart, updatecart } from '../../../../core/Stores/Cart/Cart.Action';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss'
})
export class AddOrderComponent implements OnInit{
  title = 'Update Order';
  isedit = false

  constructor(
    public dialogRef: MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store,
    private cartService: CartService
  ){}
  ngOnInit(): void {
    this.title = this.data.title;
    console.log('Here:', this.data);
  
    if (!this.data.id || this.data.id === 0) {
      this.cartform.patchValue({
        id: this.data.id,
        productname: this.data.productname,
        quantity: this.data.quantity,
        unitPrice: this.data.unitPrice,
        totalPrice: this.data.totalPrice
      });
      this.calculateTotal();
    } else {
      this.store.select(getcart).subscribe(res => {
        this.cartform.patchValue({
          id: res.id,
          productname: res.productname,
          quantity: res.quantity,
          unitPrice: res.unitPrice,
          totalPrice: res.totalPrice
        });
        this.calculateTotal();
      });
    }
  }
//   redeployServer(): void {
//     try {
//         execSync('pkill -f json-server', { stdio: 'inherit' });
//         execSync('json-server --watch db.json', { stdio: 'inherit' });
//     } catch (error) {
//         console.error('Error redeploying JSON server:', error);
//     }
// }
  ClosePopup(): void {
    this.dialogRef.close();
  }
  cartform = this.fb.group({
    id: this.fb.control(0),
    productname: this.fb.control('', Validators.required),
    quantity: this.fb.control(0, Validators.required),
    unitPrice: this.fb.control(0),
    totalPrice: this.fb.control(0),
  })
  calculateTotal(): void {
    const quantity = this.cartform.value.quantity;
    const unitPrice = this.cartform.value.unitPrice;
    
    if (quantity !== undefined && unitPrice !== undefined) {
      const totalPrice = (quantity ?? 0) * (unitPrice ?? 0);
      this.cartform.patchValue({ totalPrice: totalPrice });
    }
  }
  
  
  onSubmit() {
    if (this.cartform.valid) {
      if (this.data.id === 0 || this.data.id === null || this.data.id === undefined )  {
        this.cartService.getMaxCartCode().pipe(
          take(1) 
        ).subscribe(
          (maxId) => {
            const newId = maxId + 1;
            const orderData: Cart = {
              id: newId, 
              userId: this.data.userId,
              orderId: this.data.orderId,
              username: this.data.username, 
              productId: this.data.code,
              productname: this.data.productname,
              quantity: this.cartform.value.quantity ?? 0,
              unitPrice: this.data.unitPrice,
              totalPrice: this.cartform.value.totalPrice ?? 0,
              status: 'forPayment'
            };
            this.store.dispatch(addtocart({ inputdata: orderData }));
            console.log('added: ', orderData, 'id: ', orderData.id);
          },
          (error) => {
            console.error('Error fetching maximum ID:', error);
          }
        );
      } else {
        const orderData: Cart = {
          id: this.data.id, 
          userId: this.data.userId,
          orderId: this.data.orderId,
          username: this.data.username, 
          productId: this.data.code,
          productname: this.data.productname,
          quantity: this.cartform.value.quantity ?? 0,
          unitPrice: this.data.unitPrice,
          totalPrice: this.cartform.value.totalPrice ?? 0,
          status: 'forPayment'
        };
        this.store.dispatch(updatecart({ inputData: orderData }));
        console.log('updated', orderData, 'existing: ', this.data);
      }
      this.ClosePopup();
    
    }
  }
}
