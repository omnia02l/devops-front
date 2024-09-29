import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Assuming Ticket is already defined in your Angular app
import { Ticket } from '../models/ticket.model';
import { TicketCountByMonthDTO } from '../models/TicketCountByMonthDTO';
import { TicketStatisticsDTO } from '../models/TicketStatisticsDTO';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8085/Ticket'; // Update with your actual backend URL

  constructor(private http: HttpClient) { }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/GetAllTickets`);
  }

  getTicket(ref: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/GetTicket/${ref}`);
  }

  generateTicket(): Observable<Ticket> {
    // Assuming GenerateTicket should be a POST request with no body, adjust as needed
    return this.http.post<Ticket>(`${this.baseUrl}/GenerateTicket`, null);
  }

  modifyTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/ModifyTicket`, ticket);
  }

  deleteTicket(id: number): Observable<Ticket> {
    return this.http.delete(`${this.baseUrl}/DeletTicket/${id}`);
  }
  updateTicketAgeGroup(ticketId: number, trancheAge: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/updateTicketAgeGroup/${ticketId}/${trancheAge}`,{});
  }

// in your ticket.service.ts
processTicket(refTicket: string): Observable<Ticket> {
  return this.http.post<Ticket>(`${this.baseUrl}/process/${refTicket}`, null);
}

getTicketCountsByStyleAndYearRange(styleName: string, startYear: number, endYear: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/ticketsByStyleAndYear`, { params: { styleName, startYear, endYear } });
}


getAllStylesTicketCountsByYear(year: number): Observable<{ [key: number]: { [styleName: string]: TicketCountByMonthDTO[] } }> {
  return this.http.get<{ [key: number]: { [styleName: string]: TicketCountByMonthDTO[] } }>(`${this.baseUrl}/ticketCountsForAllStyles/${year}`);
}
getTicketStatistics(competitionId: number): Observable<TicketStatisticsDTO[]> {
  return this.http.get<TicketStatisticsDTO[]>(`${this.baseUrl}/statistics?competitionId=${competitionId}`);
}



getTotalTicketsSold(competitionId: number): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/total-sold/${competitionId}`);
}

getTotalRevenue(competitionId: number): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/total-revenue/${competitionId}`);
}

getOccupancyRate(competitionId: number): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/occupancy-rate/${competitionId}`);
}
}
