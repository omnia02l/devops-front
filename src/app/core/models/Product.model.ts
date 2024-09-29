import { Category } from "./Category.model";
import { ImageStore } from "./ImageStore";
import { Review } from "./Review.model";
import { ShoppingCart } from "./ShoppingCart.model";
import { SizeType } from "./SizeType.model";

export class Product {
    productId?: number;
    title!: string;
    description!: string;
    price!: number;
    size?: SizeType;
    quantity?: number;
    status!: string;
    discountPercentage?: number;
    discountPrice?: number;
    image?: ImageStore;
    shoppingCart?: ShoppingCart;
    category?: Category;
    reviews?: Review[];
    totalRevenue?: number;
    totalSalesQuantity?: number;
    [key: string]: any;
    
}
