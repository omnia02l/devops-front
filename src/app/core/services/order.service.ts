import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../models/Orders.model';
import { OrderDTO } from '../models/order-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8085/api'; // Update with your backend API endpoint

  constructor(private http: HttpClient) { }

  getOrderDetails(orderId: number): Observable<Orders> {
    const url = `${this.apiUrl}/getOrder/${orderId}`;
    return this.http.get<Orders>(url);
  }
  getOrderHistoryByEmail(email: string): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`http://localhost:8085/order/historyByEmail/${email}`);
  }
}
