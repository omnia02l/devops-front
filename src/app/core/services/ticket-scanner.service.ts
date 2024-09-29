import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Assuming TicketScanner is already defined in your Angular app
import { TicketScanner } from '../models/ticket-scanner.model';

@Injectable({
  providedIn: 'root'
})
export class TicketScannerService {
  private baseUrl = 'http://localhost:8085/TicketScanner'; // Update with your actual backend URL

  constructor(private http: HttpClient) { }

  getAllTicketScanners(): Observable<TicketScanner[]> {
    return this.http.get<TicketScanner[]>(`${this.baseUrl}/GetAllTicketScanner`);
  }

  getTicketScanner(name: string): Observable<TicketScanner> {
    return this.http.get<TicketScanner>(`${this.baseUrl}/GetTicketScanner/${name}`);
  }

  addTicketScanner(ticketScanner: TicketScanner): Observable<TicketScanner> {
    return this.http.post<TicketScanner>(`${this.baseUrl}/AddTicketScanner`, ticketScanner);
  }

  modifyTicketScanner(ticketScanner: TicketScanner): Observable<TicketScanner> {
    return this.http.put<TicketScanner>(`${this.baseUrl}/ModifyTicketScanner`, ticketScanner);
  }

  deleteTicketScanner(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeletTicketScanner/${id}`);
  }
}
