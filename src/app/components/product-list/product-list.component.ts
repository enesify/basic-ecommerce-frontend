import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentcategoryId: number;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  //similar to @PostConstruct
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    // check  if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol.
      this.currentcategoryId = +this.route.snapshot.paramMap.get('id');
    }

    else {
      // category id is unavailable... default to category id 1
      this.currentcategoryId = 1;
    }

    // method is invoked once you subscribe
    // executes in an asynchronous fashion
    // get the products for the given category id
    this.productService.getProductList(this.currentcategoryId).subscribe(
      data => {
        //assign results to the product array
        this.products = data;
      }
    )
  }

}
