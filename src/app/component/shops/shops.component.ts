import { Component, OnInit, ViewChild } from '@angular/core';
import { Products } from '../../shared/modles/product-model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { loadproduct } from '../../core/Stores/Products/Product.Action';
import { getproductlist } from '../../core/Stores/Products/Product.Selectors';
import { MatTableDataSource } from '@angular/material/table';
import { opencartpopup } from '../../core/Stores/Cart/Cart.Action';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { Cart } from '../../shared/modles/cart-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.scss'
})
export class ShopsComponent implements OnInit {

  minPrice: number = 0;
  maxPrice: number = 0;
  ProductList!: Products[];
  datasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  priceRange: number = 0;
  uniqueCategories: string[] = [
    "",
    "laptop",
    "phone",
    "gaming devices",
    "games",
    "gadget accessories"
  ];

  displayedColums: string[] = [ 
    "id",
    "productname",
    "description",
    "price",
    "category",
    "brand",
    "orderCount",
    "stockCount",
    "image"]
    constructor(
      private dialog: MatDialog,
       private store: Store,
       private router: Router) {
  
    }
    ngOnInit(): void {
      this.store.dispatch(loadproduct());
      this.store.select(getproductlist).subscribe(item => {
        this.ProductList = item;
        this.datasource = new MatTableDataSource<Products>(this.ProductList);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      });
    }
    CartList!: Cart[];
    GotoCart() {
      this.router.navigate(['/cart']);
    }
    clearFilters(searchInput: HTMLInputElement, categorySelect: any) {
      if (categorySelect instanceof HTMLSelectElement) {
        categorySelect.value = '';
      }
    
      if (searchInput) {
        searchInput.value = '';
      }
    
      this.applyFilter('', ''); 
    }
    applyPriceFilter(): void {
      let filteredData = this.ProductList;
    
      if (this.minPrice !== undefined && this.minPrice !== null && this.minPrice >= 0) {
        filteredData = filteredData.filter(product => product.price >= this.minPrice);
      }
    
      if (this.maxPrice !== undefined && this.maxPrice !== null && this.maxPrice >= 0) {
        filteredData = filteredData.filter(product => product.price <= this.maxPrice);
      }
    
      this.datasource = new MatTableDataSource<Products>(filteredData);
    }
    
  
  
    sortByName(order: string): void {
      let sortedList: Products[];
    
      if (order === 'asc') {
        sortedList = [...this.ProductList].sort((a, b) => a.productname.localeCompare(b.productname));
      } else {
        sortedList = [...this.ProductList].sort((a, b) => b.productname.localeCompare(a.productname));
      }
    
      this.datasource = new MatTableDataSource<Products>(sortedList);
    }
    
    
    applyFilter(searchValue: string, categoryValue: string) {
      let filteredData = this.ProductList;
  
      if (searchValue) {
        filteredData = filteredData.filter((item: Products) => {
          const nameMatch = item.productname.toLowerCase().includes(searchValue.toLowerCase());
          const descriptionMatch = item.description.toLowerCase().includes(searchValue.toLowerCase());
          return nameMatch || descriptionMatch;
        });
      }
  
      if (categoryValue) {
        filteredData = filteredData.filter((item: Products) => {
          return item.category.toLowerCase().includes(categoryValue.toLowerCase());
        });
      }
  
      this.datasource.data = filteredData;
    }
  
    getUniqueCategories(): string[] {
      const categories = this.ProductList.map(item => item.category);
      return [...new Set(categories)];
    }
    filterByPrice() {
      if (this.priceRange > 0) {
        this.datasource.filterPredicate = (data: Products, filter: string) => {
          return data.price <= this.priceRange;
        };
        this.datasource.filter = this.priceRange.toString();
      } else {
        this.datasource.filterPredicate = null;
        this.datasource.filter = '';
      }
    }
    seeData( product: Products, quantity: number, productId: number){
      const orderData: Cart = {
        id: 0,
        userId: 11213,
        orderId: 99, 
        username: 'dmiranda',
        productId: product.id,
        productname: product.productname, 
        quantity: quantity,
        unitPrice: product.price,
        totalPrice: product.price*quantity,
        status: 'forPayment'
      };
      console.log(orderData),
      this.OpenPopup(
        orderData.id,
        'Add Order',
        orderData.orderId,
        orderData.productname,
        orderData.quantity,
        orderData.unitPrice,
        orderData.totalPrice
      )
    }
    
    FunctionAddCart(
      id: number,
      orderId: number,
      productname: string,
      quantity: number,
      unitPrice: number,
      totalPrice: number
    ) {
      this.OpenPopup(id, 'Add to Cart', orderId, productname, quantity, unitPrice, totalPrice);
    }
  
    OpenPopup(
      id: number,
      title: string,
      orderId: number,
      productname: string,
      quantity: number,
      unitPrice: number,
      totalPrice: number) {
      this.store.dispatch(opencartpopup());
      this.dialog.open(AddOrderComponent, {
        width: '60%',
        height: '60%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {
          id: id,
          title: title,
          orderId: orderId,
          productname: productname,
          quantity: quantity,
          unitPrice: unitPrice,
          totalPrice: totalPrice
        }
      })
  
    }
}
