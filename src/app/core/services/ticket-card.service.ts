import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketCard } from '../models/ticket-card.model';
import { Ticket } from '../models/ticket.model';
import { TrancheAge } from '../models/tranche-age.model';

// Assuming Ticketcard is already defined in your Angular app


@Injectable({
  providedIn: 'root'
})
export class TicketCardService {
  private baseUrl = 'http://localhost:8085/TicketCard'; // Update this with your actual backend URL

  constructor(private http: HttpClient) { }

  getAllTicketCards(): Observable<TicketCard[]> {
    return this.http.get<TicketCard[]>(`${this.baseUrl}/GetAllTicketCard`);
  }

  getTicketCardByUserIdAndCompetitionAndDate(userId: number, competitionId: number): Observable<TicketCard> {
    return this.http.get<TicketCard>(`${this.baseUrl}/getTicketCardByUserIdAndDateAndCompteition/${userId}/${competitionId}`);
  }

  addTicketCard(ticketcard: TicketCard): Observable<TicketCard> {
    return this.http.post<TicketCard>(`${this.baseUrl}/AddTicketcard`, ticketcard);
  }

  modifyTicketCard(ticketcard: TicketCard): Observable<TicketCard> {
    return this.http.put<TicketCard>(`${this.baseUrl}/ModifyTicketCard`, ticketcard);
  }

  deleteTicketCard(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeletTicketCard/${id}`);
  }
  createTicketCardForUser(userId: number): Observable<TicketCard> {
    return this.http.post<TicketCard>(`${this.baseUrl}/createticketCard/${userId}`, {});
  }
  
 applyDiscountToMostRecentTicketCard(userId: number, discountCode: string): Observable<TicketCard> {
   
    return this.http.put<TicketCard>(`${this.baseUrl}/applyDiscountIfValid/${userId}`,discountCode);
  }


  getLastTicketCardDetails(userId: number): Observable<TicketCard> {
    return this.http.get(`${this.baseUrl}/getLastTicketCardDetails/${userId}`);
  }

}
