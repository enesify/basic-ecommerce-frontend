import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice:number;
  totalQuantity:number;

  constructor(private cartService: CartService,
    private storage: SessionStorageService) { }

  ngOnInit(): void {

    if(this.storage.retrieve('totalPrice') === undefined ){
      this.totalPrice = 0.00;
    }
    else {
      this.totalPrice = this.storage.retrieve('totalPrice');
    }

    if(this.storage.retrieve('totalQuantity') === undefined ){
      this.totalQuantity = 0.00;
    }
    else {
      this.totalQuantity = this.storage.retrieve('totalQuantity');
    }

    this.listCartDetails();
  }
  listCartDetails() {

    this.cartItems = this.cartService.cartItems;
    
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();

  }

  incrementQuantity(cartItem:CartItem){
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem:CartItem){
    this.cartService.decrementQuantity(cartItem);
  }

  removeItem(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem);
  }
  

}
