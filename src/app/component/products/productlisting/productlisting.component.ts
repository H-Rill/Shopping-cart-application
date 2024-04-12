import { Component, OnInit, ViewChild } from '@angular/core';
import { Products } from '../../../shared/modles/product-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { deleteproductsuccess, getproduct, loadproduct, openpopup } from '../../../core/Stores/Products/Product.Action';
import { getproductlist } from '../../../core/Stores/Products/Product.Selectors';
import { MatTableDataSource } from '@angular/material/table';
import { AddproductComponent } from '../addproduct/addproduct.component';

@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrl: './productlisting.component.scss'
})
export class ProductlistingComponent implements OnInit {

  ProductList!:Products[];
  
  datasource:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns: string[] = [
    "id", "productname",  "description", "price","category", "brand", "imageUrl", "stockCount", "action"
  ]
  constructor(private dialog:MatDialog,  private store: Store){

  }
  ngOnInit(): void {
   this.store.dispatch(loadproduct());
    this.store.select(getproductlist).subscribe(data=>{
      this.ProductList = data;
      this.datasource = new MatTableDataSource<Products>(this.ProductList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort =this.sort;     
      console.log(data); 
    })
  }

  addProduct(){
    this.OpenAddProduct(0, 'Add New Product');
  }

  editProduct(code:number){
    this.OpenAddProduct(code, 'Update Product');
    this.store.dispatch(getproduct({id:code}))
  }

  deleteProduct(code:number){
    if(confirm('do you want to delete')){
      this.store.dispatch(deleteproductsuccess({code:code}))
    }

  }

  OpenAddProduct(code: number, title: string){
    this.store.dispatch(openpopup());
    this.dialog.open(AddproductComponent, {
      width: '60%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data:{
        id:code,
        title:title
      }

    })

  }
}
