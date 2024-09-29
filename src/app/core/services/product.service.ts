import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/Product.model';
import { Orders } from '../models/Orders.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8085/products';

  constructor(private http: HttpClient) { }

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fetch a single product by ID
  getProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new product
  createProductt(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8085/products/add-Product', product)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  createProduct(product: Product, categoryId: number): Observable<Product> {
    const url = `http://localhost:8085/products/add`;
    const params = new HttpParams().set('categoryId', categoryId.toString()); // Add categoryId as a request parameter
    return this.http.post<Product>(url, product, { params })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getTop5SaleProductsByCategory(categoryId: number): Observable<Product[]> {
    const url = `http://localhost:8085/products/top5sale/${categoryId}`;
    return this.http.get<Product[]>(url);
  }
  getTopSellingProducts(): Observable<Product[]> {
    // Implement logic to fetch top-selling products from the backend
    const url = `http://localhost:8085/products/top5sale`;
    return this.http.get<Product[]>(url);
  }

  getTotalSales(): Observable<Map<number, number>> {
    // Implement logic to fetch total sales of each product from the backend
    const url = `http://localhost:8085/products/total-sales`;
    return this.http.get<Map<number, number>>(url);
  }

// Update an existing product
updateProduct(productId: number, product: Product): Observable<Product> {
  const url = `http://localhost:8085/products/update/${productId}`;
  return this.http.put<Product>(url, product)
    .pipe(
      catchError(this.handleError)
    );
}

deleteProduct(productId: number): Observable<void> {
  const url = `${this.apiUrl}/${productId}`;
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
  
  getMostSoldProducts(month: number, year: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8085/order/most-sold-products?month=${month}&year=${year}`);
  }
  getProductById(productId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }
  getProductPrice(productId: number): Observable<number> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`).pipe(
      map((product: Product) => product.price)
    );
  }
  getOrdersBetweenDates(startDate: Date, endDate: Date): Observable<Orders[]> {
    const params = {
      start: startDate.toISOString(), // Convert date to ISO string format
      end: endDate.toISOString()
    };
    return this.http.get<Orders[]>(`http://localhost:8085/order/between`, { params });
  }

  getMostSoldProductsByMonthAndYear(month: number, year: number): Observable<Object[]> {
    const params = { month: month.toString(), year: year.toString() };
    return this.http.get<Object[]>(`http://localhost:8085/order/mostsoldproducts`, { params });
  }
  

  getWeeklyTopSellingProducts(): Observable<any[]> {
    // Make HTTP GET request to fetch weekly top-selling products
    return this.http.get<any[]>(`http://localhost:8085/products/weekly-top-selling`);
  }


/*
  uploadImage(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', file);

    return this.http.post<any>(`http://localhost:8085/products/upload`, formData).pipe(
      map((response: any) => {
        return response.imageUrl; // Assuming the response contains the URL of the uploaded image
      }),
      catchError(error => {
        console.error('Error uploading image:', error);
        throw 'An error occurred while uploading the image.';
      })
    );
  }
*/
/*uploadImage(file: any): Observable<string> {
  const formData: FormData = new FormData();
  formData.append('file', file);

  // You need to send the file to Uploadcare's REST API for uploading
  // Replace 'YOUR_UPLOADCARE_PUBLIC_KEY' with your Uploadcare public key
  return this.http.post<any>(`https://upload.uploadcare.com/base/`, formData, {
    params: {
      UPLOADCARE_PUB_KEY: '746cd19532409c0e9930'
    }
  }).pipe(
    map((response: any) => {
      // Assuming Uploadcare returns the URL of the uploaded image in the response
      return response.file; // Adjust this according to the response structure
    })
  );
}*/
uploadImage(file: any): Observable<string> {
  const formData: FormData = new FormData();
  formData.append('file', file);

  // Replace 'YOUR_UPLOADCARE_PUBLIC_KEY' with your Uploadcare public key
  return this.http.post<any>('https://upload.uploadcare.com/base/', formData, {
    params: {
      UPLOADCARE_PUB_KEY: '746cd19532409c0e9930'
    }
  }).pipe(
    map((response: any) => {
      // Assuming Uploadcare returns the URL of the uploaded image in the response
      return response.file; // Adjust this according to the response structure
    })
  );
}


}

