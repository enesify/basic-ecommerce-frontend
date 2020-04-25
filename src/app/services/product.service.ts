import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api2";

  constructor(private httpClient: HttpClient) { }

  //returns an observble; 
  //map the Json data from Spring Data REST to Product array
  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/products/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);


    //const searchUrl = `${this.baseUrl}/api/products/search/findByCategoryId?id=${theCategoryId}`;
    //return this.httpClient.get<GetResponse>(searchUrl).pipe(
    //  map(response => response._embedded.products)
    //);
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponse> {

    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/products/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponse>(searchUrl);

  }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl: string = `${this.baseUrl}/products/findById?id=${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const productCategoryUrl = `${this.baseUrl}/product-category`;
    return this.httpClient.get<ProductCategory[]>(productCategoryUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(keyword: string, thePage: number, thePageSize: number): Observable<GetResponse> {
    const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
      + `&page=${thePage}&size=${thePageSize}`;


    return this.httpClient.get<GetResponse>(searchUrl);
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response.content));
  }
}

//unwraps the JSON from Spring Data REST content entry
interface GetResponse {
  /* _embedded:{
     products: Product[];
   }*/
  content: Product[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
