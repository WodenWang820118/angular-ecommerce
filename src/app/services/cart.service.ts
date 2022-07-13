import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { CartItem } from '../common/cartItem';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    if (this.hasExistingCartItem(cartItem)) {
      cartItem.increaseQuantity();
    } else {
      this.carItems.push(cartItem);
    }
  }

  hasExistingCartItem(cartItem: CartItem): boolean {
    return this.carItems.includes(cartItem);
  }

  computeCartTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.carItems.forEach(item => {
      totalPriceValue += item.getQuantity() * item.getUnitPrice();
      totalQuantityValue += item.getQuantity();
    });

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  
}
