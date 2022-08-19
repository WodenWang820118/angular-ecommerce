import { CartItem } from "./cartItem";

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: string;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.getImageUrl();
        this.unitPrice = cartItem.getUnitPrice();
        this.quantity = cartItem.getQuantity();
        this.productId = cartItem.getId();
    }
}