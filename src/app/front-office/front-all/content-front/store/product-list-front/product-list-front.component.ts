import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/Product.model';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { CartItem } from 'src/app/core/models/cart-item';
import { MenuItem } from 'primeng/api';
interface SearchCriteria {
  title: string;
  inStock: boolean;
  minPrice: number | null;
  maxPrice: number | null;
}
@Component({
  selector: 'app-product-list-front',
  templateUrl: './product-list-front.component.html',
  styleUrls: ['./product-list-front.component.css']
})
export class ProductListFrontComponent implements OnInit {
  products: Product[] = [];
  cartItems: CartItem[] = [];
  totalCartPrice: number = 0;
  searchCriteria: SearchCriteria = { title: '', inStock: false, minPrice: null, maxPrice: null };
  filteredProducts: Product[] = []; // Array to hold filtered products
  showNotificationFlag: boolean = false; // Rename the property to avoid conflict
  notificationMessage: string = '';
  notificationType: string = 'success'; // Default to success
  //items: MenuItem[];
  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService) {
    /*this.items = [
    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home']},
    { label: 'My-events', icon: 'pi pi-fw pi-calendar', routerLink: ['/my-events']},
    { label: 'Training', icon: 'pi pi-fw pi-pencil',  routerLink: ['/training']},
    { label: 'My Post', icon: 'pi pi-fw pi-file', routerLink: ['/post'] },
    { label: 'All posts', icon: 'pi pi-fw pi-cog', routerLink: ['/all-post'] },
    { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: ['/profile'] },
    { label: 'Store', icon: 'pi pi-credit-card', routerLink: ['/produits'] },
    { label: 'Cart Item', icon: 'pi pi-shopping-cart', routerLink: ['/shopcart'] },
    { label: 'Payement', icon: 'pi pi-fw pi-cog', routerLink: ['/payment'] },
    { label: 'My Orders', icon: 'pi pi-shopping-bag', routerLink: ['/myorders'] },
  ]; */
}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.loadProducts();

    });
  }
/* */
addToCart(product: Product): void {
  console.log('Adding to cart:', product);
  if (product && product.productId && product.title && product.price) {
    const productName = product.title;
    const productImage = product.image ? product.image : 'default-image-url';
    this.shoppingCartService.addToCart(product.productId, productName, product.price, 1);
    this.displayNotification('Item added to cart successfully', 'success');
  } else {
    console.error('Invalid product data:', product);
  }
}


  displayNotification(message: string, type: string = 'success'): void { // Rename the method
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotificationFlag = true; // Update the property name here
    setTimeout(() => {
      this.hideNotification();
    }, 3000);
  }


  // Method to hide notification
  hideNotification(): void {
    this.showNotificationFlag = false;
    this.notificationMessage = '';
    this.notificationType = 'success'; // Reset notification type to default
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.searchProducts(); // Call searchProducts after loading products

      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  searchProducts(): void {
    // Implement search logic based on the search criteria
    this.filteredProducts = this.products.filter(product => {
      // Filter by title
      const titleMatch = this.searchCriteria.title ? product.title.toLowerCase().includes(this.searchCriteria.title.toLowerCase()) : true;
  
      // Filter by inStock
      const inStockMatch = this.searchCriteria.inStock ? (product.quantity !== undefined && product.quantity > 0) : true;
  
      // Filter by price range
      const minPriceMatch = this.searchCriteria.minPrice !== null ? product.price >= this.searchCriteria.minPrice : true;
      const maxPriceMatch = this.searchCriteria.maxPrice !== null ? product.price <= this.searchCriteria.maxPrice : true;
  
      return titleMatch && inStockMatch && minPriceMatch && maxPriceMatch;
    });
  }
  
  

}
