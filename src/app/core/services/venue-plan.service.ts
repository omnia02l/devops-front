import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VenuePlan } from '../models/venue-plan.model'; // Assurez-vous que le chemin d'accès est correct

@Injectable({
  providedIn: 'root'
})
export class VenuePlanService {
  private baseUrl = 'http://localhost:8085/VenuePlan'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllVenuePlans(): Observable<VenuePlan[]> {
    return this.http.get<VenuePlan[]>(`${this.baseUrl}/GetAllTheathrePlan`);
  }

  getVenuePlan(id: number): Observable<VenuePlan> {
    return this.http.get<VenuePlan>(`${this.baseUrl}/GetTheathrePlan/${id}`);
  }

  addVenuePlan(venuePlan: VenuePlan, venueId: number): Observable<VenuePlan> {
    return this.http.post<VenuePlan>(`${this.baseUrl}/AddTheatrePlan?venueId=${venueId}`, venuePlan);
  }

  modifyVenuePlan(venuePlan: VenuePlan): Observable<VenuePlan> {
    return this.http.put<VenuePlan>(`${this.baseUrl}/ModifyTheatrePlan`, venuePlan);
  }

  deleteVenuePlan(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeletTheatrePlan/${id}`);
  }
}
