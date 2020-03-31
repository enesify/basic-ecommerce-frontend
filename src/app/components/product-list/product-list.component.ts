import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  //similar to @PostConstruct
  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(){
    // method is invoked once you subscribe
    // executes in an asynchronous fashion
    this.productService.getProductList().subscribe(
      data => {
        //assign results to the product array
        this.products = data;
      }
    )
  }

}
