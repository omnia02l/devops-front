import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitionPerformanceDTO } from '../models/CompetitionPerformanceDTO';
import { Performance } from '../models/Performance';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private baseUrl = 'http://localhost:8085/perf';

  constructor(private http: HttpClient) { }

  addPerformanceToTeamInCompetition(competitionId: number, teamId: number, performance: Performance): Observable<Performance> {
    const url = `${this.baseUrl}/add/${competitionId}/${teamId}`;
    return this.http.post<Performance>(url, performance);
  }
  getPerformancesByCompetition(): Observable<CompetitionPerformanceDTO[]> {
    const url = `${this.baseUrl}/performances`;
    return this.http.get<CompetitionPerformanceDTO[]>(url);
  }
  getPerformanceById(id: number): Observable<Performance> {
    const url = `${this.baseUrl}/performance/${id}`;
    return this.http.get<Performance>(url);
  }

}
