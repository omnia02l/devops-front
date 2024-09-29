import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
interface SearchCriteria {
  title: string;
  inStock: boolean;
  minPrice: number | null;
  maxPrice: number | null;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; // Initialize with an empty array
  searchCriteria: SearchCriteria = { title: '', inStock: false, minPrice: null, maxPrice: null };
  filteredProducts: Product[] = []; // Array to hold filtered products
  showNotificationFlag: boolean = false; // Rename the property to avoid conflict
  notificationMessage: string = '';
  notificationType: string = 'success';  items: MenuItem[];

  constructor(private sanitizer: DomSanitizer, private productService: ProductService) { 
    this.items = [
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
    ];
  }

getSanitizedUrl(url: string) {
  return this.sanitizer.bypassSecurityTrustUrl(url);
}
ngOnInit(): void {
  this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.loadProducts();

      this.logImageUrls(); // Log image URLs after fetching products

    },
    (error) => {
      console.error('Failed to fetch products', error);
    }
  );
}
logImageUrls(): void {
  this.products.forEach(product => {
    console.log('Product:', product); // Log the entire product object
    console.log('Image URL for product', product.productId + ':', product.image?.imageUrl);
  });
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
 loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = [...this.products]; // Load all products initially
        this.searchProducts(); // Apply initial search (if any)
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }
}
