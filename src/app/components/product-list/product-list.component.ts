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
  currentcategoryId: number = 1;
  searchMode: boolean;
  previousCategoryId: number = 1;
  previousKeyword: string;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  //similar to @PostConstruct
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleListProducts() {
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

    //Check if we have a different category than previous
    //Note: Angular will reuse a component if it is currently being viewed
    //
    //if we have a different category than previous
    //then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentcategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentcategoryId;
    console.log(`currentCategoryId = ${this.currentcategoryId}, thePageNumber = ${this.thePageNumber}`);

    // method is invoked once you subscribe
    // executes in an asynchronous fashion
    // get the products for the given category id

    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentcategoryId).subscribe(this.processResult())
  }

  handleSearchProducts() {

    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    //if we have a different keyword than previous
    //then set thePageNumber back to 1
    if(this.previousKeyword != keyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = keyword;
    this.productService.searchProductsPaginate(keyword, this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());

  }

  processResult() {
    return data => {
      this.products = data.content;
      this.thePageNumber = data.number + 1;
      this.thePageSize = data.size;
      this.theTotalElements = data.totalElements;
    }

  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

}
