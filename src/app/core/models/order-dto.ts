import { ShoppingCart } from "./ShoppingCart.model";

export interface OrderDTO {
    orderDescription: string;
    cartItems: ShoppingCart[];
    customerEmail: string;
    customerName: string;
    totalAmount?: number;
    dateCreation?: Date;
    orderId?: number;
}
