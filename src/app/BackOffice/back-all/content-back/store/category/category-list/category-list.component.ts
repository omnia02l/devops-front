import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/Category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = []; // Initialize with an empty array

  constructor(private categoryService: CategoryService , private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  deleteCategory(categoryId: number | undefined): void {
    if (categoryId === undefined) {
      console.error('Category ID is undefined.');
      return;
    }
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId)
        .subscribe(() => {
          console.log('Category deleted successfully');
          // Reload the current route to reflect changes
          window.location.reload();
        });
    }
  }
  
  redirectToUpdate(categoryId: number | undefined): void {
    if (categoryId !== undefined) {
        this.router.navigate(['/admin/category/update', categoryId]);
    }
}
onUpdateProduct(productId: number | undefined) {
  if (productId !== undefined) {
    this.router.navigate(['/admin/products/update-product', productId]);
  } else {
    console.error('Product ID is undefined');
  }
}

}
