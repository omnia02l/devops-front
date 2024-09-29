import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8085/category';

  constructor(private http: HttpClient) { }

  // Fetch all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fetch a single category by ID
  getCategory(id: number): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new category
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:8085/category/add-category', category)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing category
  updateCategory(categoryId: number, category: Category): Observable<Category> {
    const url = `http://localhost:8085/category/update/${categoryId}`;
    return this.http.put<Category>(url, category)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a category
  deleteCategory(categoryId: number): Observable<void> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  // Error handling
  private handleError(error: any) {
    console.error('API Error: ', error);
    return throwError('An error occurred. Please try again later.');
  }
  
  // Get a category by ID
  getCategoryById(categoryId: number): Observable<Category> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.get<Category>(url);
  }
}
