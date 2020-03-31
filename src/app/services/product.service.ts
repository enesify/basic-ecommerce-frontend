import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) { }

  //returns an observble; 
  //map the Json data from Spring Data REST to Product array
  getProductList(): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  /**
   * if we have a custom controller class at backend side,
   * get product list would be like below
   * getProductList(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.baseUrl)
    );
  }
   */
  
}

//unwraps the JSON from Spring Data REST _embedded entry
interface GetResponse{
  _embedded: {
    products: Product[];
  } 
}
