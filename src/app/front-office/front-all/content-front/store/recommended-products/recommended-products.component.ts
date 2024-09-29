import { Component, OnInit, QueryList, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { trigger, transition, style, animate } from '@angular/animations'; // Import animation symbols

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.css'],
  animations: [
    trigger('swipeAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(0)' }),
        animate('1500ms', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('hoverAnimation', [
      transition(':enter', [
        style({ transform: 'scale(1)' }),
        animate('800ms', style({ transform: 'scale(1.05)' }))
      ]),
      transition(':leave', [
        animate('1000ms', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class RecommendedProductsComponent implements OnInit {
  topSellingProducts: any[] = [];
  recommendedProducts: any[] = []; // Define an array to hold recommended products
  currentIndex = 0;
  @ViewChild('productCards') productCards: any;

  constructor(private router: Router , private productService: ProductService) { }

  ngOnInit(): void {
    // Fetch recommended products and populate the array
    this.fetchRecommendedProducts();
    this.fetchTopSellingProducts();

  }
 /* fetchRecommendedProducts() {
    this.productService.getWeeklyTopSellingProducts().subscribe(
      (data: any[]) => {
        this.recommendedProducts = data;
        // Update the currentIndex based on the number of recommended products
        setInterval(() => {
          this.currentIndex = (this.currentIndex + 1) % this.recommendedProducts.length;
        }, 5000); // Change every 5 seconds (adjust as needed)
      },
      (error) => {
        console.error('Error fetching recommended products:', error);
      }
    );
  }
*/
fetchRecommendedProducts() {
  this.productService.getWeeklyTopSellingProducts().subscribe(
    (data: any[]) => {
      this.recommendedProducts = data;
      // Start auto-swiping
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.recommendedProducts.length;
      }, 5000); // Change every 5 seconds (adjust as needed)
    },
    (error) => {
      console.error('Error fetching recommended products:', error);
    }
  );
}

  viewProductDetails(product: any) {
    // Navigate to the product details page for the selected product
  }



  redirectToRecommendedProductsPage() {
    // Redirect to the page displaying all recommended products
    this.router.navigate(['/recommended']);
  }
  fetchTopSellingProducts() {
    this.productService.getWeeklyTopSellingProducts().subscribe(
      (data: any[]) => {
        this.topSellingProducts = data;
      },
      (error) => {
        console.error('Error fetching top-selling products:', error);
      }
    );
  }
  animateCards() {
    // Set timer to animate each card
    setInterval(() => {
      // Get product cards
      const cards = this.productCards.toArray();
      // Remove animation from previous card
      if (cards[this.currentIndex - 1]) {
        cards[this.currentIndex - 1].nativeElement.style.transition = 'none';
        cards[this.currentIndex - 1].nativeElement.style.transform = 'translateX(0)';
      }
      // Apply animation to current card
      cards[this.currentIndex].nativeElement.style.transition = 'transform 0.5s ease';
      cards[this.currentIndex].nativeElement.style.transform = 'translateX(-100%)';
      // Update current index
      this.currentIndex = (this.currentIndex + 1) % this.recommendedProducts.length;
    }, 5000); // Change every 5 seconds (adjust as needed)
  }
}
