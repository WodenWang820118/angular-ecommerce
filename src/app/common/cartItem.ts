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

    increaseQuantity(): void {
        this.quantity++;
    }

    decreaseQuantity(): void {
        this.quantity--;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getUnitPrice(): number {
        return this.unitPrice;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getImageUrl(): string {
        return this.imageUrl;
    }
}