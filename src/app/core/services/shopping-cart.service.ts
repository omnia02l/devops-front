import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from 'src/app/core/models/cart-item';
import { ResponseOrderDTO } from '../models/response-order-dto';
import { OrderDTO } from '../models/order-dto';
import { Orders } from '../models/Orders.model';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItems: CartItem[] = [];
  private totalCartPrice: number = 0;
  private totalCartPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  private CART_STORAGE_KEY = 'shopping_cart';
 private apiUrl = 'http://localhost:8085/api'; // Update with your backend API endpoint

  
 constructor(private http: HttpClient) {
  // Initialize cart items from local storage on service initialization
  this.loadCartItemsFromStorage();
  this.loadTotalCartPriceFromStorage();
}


  placeOrder(orderDTO: OrderDTO): Observable<ResponseOrderDTO> {
    return this.http.post<ResponseOrderDTO>('http://localhost:8085/api/placeOrder', orderDTO);
  }
  getOrder(orderId: number): Observable<Orders> {
    return this.http.get<Orders>(`${this.apiUrl}/getOrder/${orderId}`);
  }
  addToCart(productId: number, title: string, price: number, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = new CartItem(productId, title, price, quantity);
      this.cartItems.push(newItem);
    }
    
    this.updateTotalCartPrice();
    this.updateCartItemsInStorage();
  
    // Update cart items subject
    this.cartItemsSubject.next(this.cartItems);
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems));

  }
  
  removeFromCart(item: CartItem): void {
    const index = this.cartItems.findIndex(i => i.productId === item.productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateTotalCartPrice();
      this.updateCartItemsInStorage(); // Update local storage
      this.cartItemsSubject.next(this.cartItems); // Notify subscribers about the change
    }
  }
  
  
  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.updateTotalCartPrice();
      this.updateCartItemsInStorage();
  
      // Update cart items subject
      this.cartItemsSubject.next(this.cartItems);
    }
  }
  
 /* updateTotalCartPrice(): void {
    this.totalCartPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    this.totalCartPriceSubject.next(this.totalCartPrice);
  }
*/
  getTotalCartPrice(): Observable<number> {
    return this.totalCartPriceSubject.asObservable();
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  private loadCartItemsFromStorage(): void {
    const storedCartItems = localStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemsSubject.next(this.cartItems);
      this.updateTotalCartPrice();
      this.cartItemsSubject.next(this.cartItems);

    }
  }
  private loadTotalCartPriceFromStorage(): void {
    const storedTotalPrice = localStorage.getItem('total_cart_price');
    if (storedTotalPrice) {
      this.totalCartPrice = parseFloat(storedTotalPrice);
      this.totalCartPriceSubject.next(this.totalCartPrice);
    }
  }

  private updateTotalCartPrice(): void {
    this.totalCartPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    this.totalCartPriceSubject.next(this.totalCartPrice);
    // Save total cart price to local storage
    localStorage.setItem('total_cart_price', this.totalCartPrice.toString());
  }

  private updateCartItemsInStorage(): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems));
  }
 /* getRecommendedItems(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8085/api/placeOrder');
  }*/

}
