import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TheatrePlan } from '../models/theatre-plan.model'; // Assurez-vous de créer ce modèle
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheatrePlanService {

  private baseUrl = 'http://localhost:8085/VenuePlan';

  constructor(private http: HttpClient) { }

  
  getAllTheatrePlans(): Observable<TheatrePlan[]> {
    return this.http.get<TheatrePlan[]>(`${this.baseUrl}/GetAllTheathrePlan`);
  }

  addTheatrePlan(plan: TheatrePlan): Observable<TheatrePlan> {
    return this.http.post<TheatrePlan>(`${this.baseUrl}/AddTheatrePlan`, plan);
  }

  updateTheatrePlan(plan: TheatrePlan): Observable<TheatrePlan> {
    return this.http.post<TheatrePlan>(`${this.baseUrl}/ModifyTheatrePlan`, plan);
  }


  deleteTheatrePlan(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeletTheatrePlan/${id}`);
  }
  
  
}
