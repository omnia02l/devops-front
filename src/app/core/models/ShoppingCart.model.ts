import { Orders } from "./Orders.model";
import { Product } from "./Product.model";

export class ShoppingCart {
    cartId?: number;
    totalPrice?: number;
    products?: Product[]; 
    order?: Orders; 
  
    constructor(cartId: number, totalPrice: number, products: Product[], order: Orders) {
      this.cartId = cartId;
      this.totalPrice = totalPrice;
      this.products = products;
      this.order = order;
    }
    [key: string]: any;

  }
  