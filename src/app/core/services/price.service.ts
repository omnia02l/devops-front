import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Price } from '../models/price.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private baseUrl = 'http://localhost:8085/Price';

  constructor(private http: HttpClient) { }

  getAllPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(`${this.baseUrl}/GetAllPrice`);
  }

  getPrice(typeTicket: string, trancheAge: string): Observable<Price> {
    return this.http.get<Price>(`${this.baseUrl}/GetPrice/${typeTicket}/${trancheAge}`);
  }
  getPriceById(id: number): Observable<Price> {
    return this.http.get<Price>(`${this.baseUrl}/GetPriceById/${id}`);
  }

  addPrice(price: Price): Observable<Price> {
    return this.http.post<Price>(`${this.baseUrl}/AddPrice`, price);
  }

  modifyPrice(price: Price): Observable<Price> {
    return this.http.put<Price>(`${this.baseUrl}/ModifyPrice`, price);
  }

  deletePrice(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeletPrice/${id}`);
  }
}
