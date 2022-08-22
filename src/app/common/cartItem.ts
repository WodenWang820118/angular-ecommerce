import { Product } from "./product";

export class CartItem {

    private id: string;
    public name: string;
    public imageUrl: string;
    public unitPrice: number;
    public quantity: number;

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