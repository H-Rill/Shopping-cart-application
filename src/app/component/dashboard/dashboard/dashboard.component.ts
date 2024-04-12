import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  topProducts: any[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.loadTopProducts();
  }

  loadTopProducts() {
    this.productService.getAll().subscribe(products => {
      console.log(products);
      products.sort((a, b) => b.orderCount - a.orderCount);
      this.topProducts = products.slice(0, 5);
    });
  }
}
