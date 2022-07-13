import { Product } from "./product";

export class CartItem {

    private id: string;
    private name: string;
    private imageUrl: string;
    private unitPrice: number;
    private quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;
        this.quantity = 1;
    }

    increaseQuantity() {
        this.quantity++;
    }

    decreaseQuantity() {
        this.quantity--;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getUnitPrice() {
        return this.unitPrice;
    }

    getQuantity() {
        return this.quantity;
    }


}