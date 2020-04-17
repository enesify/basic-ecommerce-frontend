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

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  //returns an observble; 
  //map the Json data from Spring Data REST to Product array
  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id
    //const searchUrl = `${this.baseUrl}/api/products/search/findByCategoryId?id=${theCategoryId}`;
    const searchUrl = `${this.baseUrl}/api2/products?id=${theCategoryId}`;

    return this.getProducts(searchUrl);

    //return this.httpClient.get<GetResponse>(searchUrl).pipe(
    //  map(response => response._embedded.products)
    //);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const productCategoryUrl = `${this.baseUrl}/api2/product-category`;
    return this.httpClient.get<ProductCategory[]>(productCategoryUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/api2/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchUrl);
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(map(response => response.content));
  }
}

//unwraps the JSON from Spring Data REST content entry
interface GetResponse {
  /* _embedded:{
     products: Product[];
   }*/
  content: Product[];
}
