import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { CartItem } from '../common/cartItem';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(product: Product | CartItem): void {
    const cartItem: CartItem = (product instanceof CartItem) ? product : new CartItem(product);

    if (this.hasExistingCartItem(cartItem)) {
      this.cartItems.forEach(item => {
        if (item.getId() === cartItem.getId()) {
          item.increaseQuantity();
        }
      });
    } else {
      this.cartItems.push(cartItem);
    }
    this.computeCartTotalPrice();
  }

  decrementQuantity(cartItem: CartItem): void {
    this.cartItems.forEach(item => {
      if (item.getId() === cartItem.getId()) {
        if (item.getQuantity() > 1) {
          item.decreaseQuantity();
        }
      }
    });
    this.computeCartTotalPrice();
  }

  removeCartItem(cartItem: CartItem): void {
    this.cartItems.forEach((item, index) => {
      if (item.getId() === cartItem.getId()) {
        this.cartItems.splice(index, 1);
      }
    });
    this.computeCartTotalPrice();
  }

  hasExistingCartItem(cartItem: CartItem): boolean {
    return this.cartItems.some(item => item.getId() === cartItem.getId());
  }

  computeCartTotalPrice(): number {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.cartItems.forEach(item => {
      totalPriceValue += item.getQuantity() * item.getUnitPrice();
      totalQuantityValue += item.getQuantity();
    });

    this.updateTotalPrice(totalPriceValue);
    this.updateTotalQuantity(totalQuantityValue);

    return totalPriceValue;
  }

  updateTotalPrice(newTotalPrice: number): void {
    this.totalPrice.next(newTotalPrice);
  }

  updateTotalQuantity(newTotalQuantity: number): void {
    this.totalQuantity.next(newTotalQuantity);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }
}

