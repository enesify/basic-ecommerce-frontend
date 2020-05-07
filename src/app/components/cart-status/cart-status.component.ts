import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

import { LocalStorage, SessionStorage, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  @SessionStorage("totalPrice")
  totalPrice: number;

  @SessionStorage("totalQuantity")
  totalQuantity: number;


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
    
    this.updateCartStatus();

  }
  updateCartStatus() {

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.storage.observe('totalPrice').subscribe(
      newvalue => { if (newvalue != 0) { this.totalPrice = newvalue } }
    );

    this.storage.observe('totalQuantity').subscribe(
      newvalue => { if (newvalue != 0) { this.totalQuantity = newvalue } }
    );

  }

}
