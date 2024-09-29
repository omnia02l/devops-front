import { Product } from "./Product.model";


export class CartItem {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    product?: Product; // Include property for product

    constructor(productId: number, productName: string, price: number, quantity: number, product?: Product) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.product = product; // Assign product to the property
    }

    // Optionally, you can calculate the total price within the CartItem class
    /*get totalPrice(): number {
        return this.price * this.quantity;
    }*/
}
