import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { getproduct } from '../../../core/Stores/Products/Product.Selectors';
import { Products } from '../../../shared/modles/product-model';
import { ProductsService } from '../../../core/services/products.service';
import { addproduct, updateproduct } from '../../../core/Stores/Products/Product.Action';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent  implements OnInit {
  hide = true;
  title ="Add New Product";
  dialogdata:any;
  nextId: number = 0;
  editcode!: number;
  categoryOptions = categoryOptions;
  stockValue: number = 0;

  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddproductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store,
    private productService: ProductsService) {

  }

  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.editcode = this.dialogdata.code;
    this.store.select(getproduct).subscribe(res => {
      this.productform.setValue({
        id: res.id, 
        productname: res.productname, 
        description: res.description, 
        price: res.price,
        category: res.category, 
        brand: res.brand, 
        stockCount:  res.stockCount,
        imageUrl: res.imageUrl
      });
    });

    this.productService.getAll().subscribe(products=>{
      const maxId = products.reduce((max, product) => Math.max(max,product.id), 0)
      this.nextId = maxId + 1;
    });
  }

  productform = this.builder.group({
    id: this.builder.control(0),
    productname: this.builder.control('', Validators.required),
    description: this.builder.control(''),
    price: this.builder.control(0, Validators.required),
    category: this.builder.control('', Validators.required),
    brand: this.builder.control('', Validators.required),
    stockCount: this.builder.control(0, Validators.required),
    imageUrl: this.builder.control('', Validators.required)
  })


  SaveProducts(){
    const price = this.productform.get('price')?.value;
  const stockCount = this.productform.get('stockCount')?.value;

  if (price === 0 || stockCount === 0) {
    if (price === 0) {
      this.productform.get('price')?.setErrors({ zeroPrice: true });
    }
    if (stockCount === 0) {
      this.productform.get('stockCount')?.setErrors({ zeroStock: true });
    }
    return; 
  }
    if (this.productform.valid) {
      const _obj: Products = {
        id: this.productform.value.id as number,
        productname: this.productform.value.productname as string,
        description: this.productform.value.description as string,
        price: this.productform.value.price as number,
        category: this.productform.value.category as string,
        brand: this.productform.value.brand as string,
        stockCount: this.productform.value.stockCount as number,
        imageUrl:this.productform.value.imageUrl as string,
        orderCount: 0
      }
      if (_obj.id === 0) {
        _obj.id = this.getNextId();
        this.store.dispatch(addproduct({ inputdata: _obj }));
      } else {
        this.store.dispatch(updateproduct({ inputdata: _obj }));
      }
      this.ClosePopup();
    }
  }
 

  ClosePopup(){
    this.ref.close();
  }

  getproductNameErrorMessage(): string {
    const productNameControl = this.productform.get('productname');
    if (productNameControl?.touched && !productNameControl?.value) {
      return 'Product name must not be empty';
    }
    return '';
  }

  getBrandErrorMessage(): string {
    const brandControl = this.productform.get('brand');
    if (brandControl?.touched && !brandControl?.value) {
      return 'Brand must not be empty';
    }
    return '';
  }

  getCategoryErrorMessage(): string {
    const categoryControl = this.productform.get('category');
    if (!categoryControl?.value) {
      return 'Category must not be empty';
    }
    return '';
  }

  getPriceErrorMessage(): string {
    const priceControl = this.productform.get('price');
    if (priceControl?.touched && priceControl?.value === 0) {
      return 'Price must not be zero';
    }
    return '';
  }
  
  getStockErrorMessage(): string {
    const stockCountControl = this.productform.get('stockCount');
    if (stockCountControl?.touched && stockCountControl?.value === 0) {
      return 'Stock must not be zero';
    }
    return '';
  }

  decrementStock() {
    const stockCountControl = this.productform.get('stockCount');
    if (stockCountControl && stockCountControl.value && stockCountControl.value > 0) {
      stockCountControl.setValue(stockCountControl.value - 1);
    }
  }
  
  incrementStock() {
    const stockCountControl = this.productform.get('stockCount');
    if (stockCountControl) {
      const currentValue = stockCountControl.value || 0; // Use 0 if value is null
      stockCountControl.setValue(currentValue + 1);
    }
  }
  
  getNextId(): number {
    return this.nextId = 0 ? 0 : this.nextId;

  }

 


}

export const categoryOptions: { value: string, viewValue: string }[] = [
  { value: 'electronics', viewValue: 'Electronics' },
  { value: 'apparel-accessories', viewValue: 'Apparel & Accessories' },
  { value: 'home-kitchen', viewValue: 'Home & Kitchen' },
  { value: 'health-beauty', viewValue: 'Health & Beauty' },
  { value: 'toys-games', viewValue: 'Toys & Games' },
  { value: 'grocery-gourmet-foods', viewValue: 'Grocery & Gourmet Foods' },
];


