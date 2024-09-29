import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamdancersService {

  private baseUrl = 'http://localhost:8085/team'; // Mettez votre URL de base ici

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve_all_teams`);
  }

  addDancerToTeam(team: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add_dancer`, team);
  }

  updateTeam(id: number, team: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update_team/${id}`, team);
  }

  getTeamById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve_team/${id}`);
  }

  removeTeam(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove_team/${id}`);
  }

  countMaleDancersInTeam(teamId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/countMaleDancers/${teamId}`);
  }

  countFemaleDancersInTeam(teamId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/countFemaleDancers/${teamId}`);
  }
//////////////

getCompetitionsWithTeams(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/competitions-with-teams`);
}

getTeamsWithDancers(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/teams-with-dancers`);
}
////
getTeamsByCompetitionId(competitionId: number): Observable<Team[]> {
  const url = `${this.baseUrl}/by-competition/${competitionId}`;
  return this.http.get<Team[]>(url);
}




}
