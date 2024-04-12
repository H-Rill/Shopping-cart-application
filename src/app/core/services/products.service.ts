import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../../shared/modles/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl='http://localhost:3000/products'

  constructor(private httpClient:HttpClient) { }

  getAll(){
    return this.httpClient.get<Products[]>(this.apiUrl)
  }

  getById(code:number){
    // console.log('Fetching user data for ID user service:', code);
    return this.httpClient.get<Products>(`${this.apiUrl}/${code}`)
  }

  createProduct(data:Products){
    return this.httpClient.post(`${this.apiUrl}`,data)
  }

  updateProduct(data:Products){
    return this.httpClient.put(`${this.apiUrl}/${data.id}`, data)
  }
  
  deleteProductById(id:number){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }
}
