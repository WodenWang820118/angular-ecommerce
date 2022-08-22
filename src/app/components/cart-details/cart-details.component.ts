import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cartItem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {
    // setInterval(() => {
    //   this.listCartDetails();
    //   this.cartService.computeCartTotalPrice();
    // }, 1000);
  }

  ngOnInit(): void {
    this.listCartDetails();
    // trigger the computation of the total price and update UI
    this.cartService.computeCartTotalPrice();
  }

  listCartDetails() {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem);
  }
}
