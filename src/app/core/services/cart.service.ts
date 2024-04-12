import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Cart } from '../../shared/modles/cart-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apirUrl = 'http://localhost:3000/cart';
  constructor(private httpClient: HttpClient) { }

  getAllCart() {
    return this.httpClient.get<Cart[]>(this.apirUrl);
  }

  getCartById(code: number) {
    return this.httpClient.get<Cart>(this.apirUrl + '/' + code);
  }
  deleteCart(code: number) {
    return this.httpClient.delete(this.apirUrl + '/' + code);
  }

  updateCart(data: Cart) {
    return this.httpClient.put(this.apirUrl + '/' + data.id, data);
  }

  createCart(data: Cart) {
    return this.httpClient.post(this.apirUrl, data);
  }

  getMaxCartCode(): Observable<number> {
    return this.getAllCart().pipe(
      map((carts: Cart[]) => {
        if (carts && carts.length > 0) {
          return Math.max(...carts.map(cart => cart.id));
        } else {
          return 0;
        }
      })
    );
  }

  UpdateStatusesToPending(cartList: Cart[]): Observable<any> {
    const observables: Observable<any>[] = [];
    cartList.forEach(cart => {
      const updateObservable = this.httpClient.put(this.apirUrl + '/' + cart.id, { ...cart, status: 'pending' });
      observables.push(updateObservable);
    });
    return forkJoin(observables);
  }
}
