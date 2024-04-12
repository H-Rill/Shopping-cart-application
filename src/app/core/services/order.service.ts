import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../shared/modles/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = 'http://localhost:3000/orders';
  constructor(private httpClient: HttpClient) {
  }

  getAllOrders() {
    return this.httpClient.get<Order[]>(this.apiUrl);
  }

  getOrdersById(code: number) {
    return this.httpClient.get<Order>(this.apiUrl + '/' + code);
  }

  deleteOrderById(code: number) {
    return this.httpClient.delete(this.apiUrl + '/' + code);
  }

  updateOrder(data: Order) {
    return this.httpClient.put(this.apiUrl + '/' + data.id, data);
  }

  createOdrder(data: Order) {
    return this.httpClient.post(this.apiUrl, data);
  }
}
