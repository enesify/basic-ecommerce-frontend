import { Injectable, Inject } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      //find the item in the cart based on item id

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      //check if we found it
      alreadyExistInCart = (existingCartItem != undefined);
    }

    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(theCartItem);
    }

    //compute total price and quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.cartItems.forEach(element => {
      totalPriceValue += element.quantity * element.unitPrice;
      totalQuantityValue += element.quantity;
    });

    //publish the new values... all subscribers will receive te new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //  this.logCartData(totalPriceValue, totalQuantityValue);
  }

  //logCartData(totalPriceValue: number, totalQuantityValue: number) {
  //  console.log(`Contents of the cart`);

  //}
}
