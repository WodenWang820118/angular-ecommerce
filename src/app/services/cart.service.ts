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
  storage: Storage = localStorage;

  constructor() {
    // read data from storage
    try {
      // avoid null pointer exception
      this.cartItems = this.getPersistedCartItems() || [];
    } catch (e) {
      console.log(e);
      this.cartItems = [];
    }
    console.log(this.cartItems);
    this.computeCartTotalPrice();
  }

  getPersistedCartItems(): CartItem[] {
    return JSON.parse(this.storage.getItem('cartItems') as string);
  }

  persistCartItems(): void {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(product: Product | CartItem): void {
    const cartItem: CartItem = (product instanceof CartItem) ? product : new CartItem(product);

    if (this.hasExistingCartItem(cartItem)) {
      this.cartItems.forEach(item => {
        if (item.id === cartItem.id) {
          item.quantity++;
        }
      });
    } else {
      this.cartItems.push(cartItem);
    }
    this.computeCartTotalPrice();
  }

  decrementQuantity(cartItem: CartItem): void {
    this.cartItems.forEach(item => {
      if (item.id === cartItem.id) {
        if (item.quantity > 1) {
          item.quantity--;
        }
      }
    });
    this.computeCartTotalPrice();
  }

  removeCartItem(cartItem: CartItem): void {
    this.cartItems.forEach((item, index) => {
      if (item.id === cartItem.id) {
        this.cartItems.splice(index, 1);
      }
    });
    this.computeCartTotalPrice();
  }

  hasExistingCartItem(cartItem: CartItem): boolean {
    return this.cartItems.some(item => item.id === cartItem.id);
  }

  computeCartTotalPrice(): number {
    if (this.cartItems.length === 0) {return -1;}

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.cartItems.forEach((item: CartItem) => {
      totalPriceValue += item.quantity * item.unitPrice;
      totalQuantityValue += item.quantity;
    });

    this.updateTotalPrice(totalPriceValue);
    this.updateTotalQuantity(totalQuantityValue);

    // persist cart items
    this.persistCartItems();

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

