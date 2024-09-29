import { Injectable } from '@angular/core';
import { Competition } from '../models/Competition';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenderstatDTO } from '../models/GenderstatDTO';
import { TicketKpiDTO } from '../models/TicketKpiDTO';


@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private baseUrl = 'http://localhost:8085/competition';

  constructor(private http: HttpClient) { }

  getAllCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${this.baseUrl}/retrieve_all_comps`);
  }

  getCompetitionById(id: number): Observable<Competition> {
    return this.http.get<Competition>(`${this.baseUrl}/retrieve_comp/${id}`);
  }



  updateCompetition(id: number, competition: Competition): Observable<Competition> {
    return this.http.put<Competition>(`${this.baseUrl}/update_comp/${id}`, competition);
  }

  deleteCompetition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove_comp/${id}`);
  }
  addCompetitionWithCategoryAndStyle(competition: Competition, categoryId: number, styleId: number, venueId: number): Observable<Competition> {
    return this.http.post<Competition>(`${this.baseUrl}/addcompetition/${categoryId}/${styleId}/${venueId}`, competition);
  }

  updateCompetitionWithCategoryAndStyle(id: number, competition: Competition, categoryId: number, styleId: number, venueId: number): Observable<Competition> {
    // Construire l'URL avec les paramètres d'URL
    const url = `${this.baseUrl}/updatecomp/${id}/${categoryId}/${styleId}/${venueId}`;

    // Effectuer la requête PUT avec les données de la compétition
    return this.http.put<Competition>(url, competition);
  }

  GenderStatsForCompetition(competitionId: number): Observable<GenderstatDTO> {
    const url = `${this.baseUrl}/GenderStatsForCompetition/${competitionId}`;
    return this.http.put<GenderstatDTO>(url, {});
  }



   getVenuePlanIdByCompetitionId(competitionId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/venue-plan-id/${competitionId}`);
  }

  getCompetitionCountByDanceStyle(): Observable<Map<string, number>> {
    const url = `${this.baseUrl}/statcountByDanceStyle`;
    return this.http.get<Map<string, number>>(url);
  }

  getNumberOfParticipantsPerCompetition(): Observable<Map<string, number>> {
    const url = `${this.baseUrl}/statparticipants`;
    return this.http.get<Map<string, number>>(url);
  }
  
  getAllCompetitionStats(): Observable<TicketKpiDTO[]> {
    return this.http.get<TicketKpiDTO[]>(`${this.baseUrl}/statsKpiTicket`);
  }
  getCompetitionCountdown(competitionId: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/countdown/${competitionId}`);
  }
}
