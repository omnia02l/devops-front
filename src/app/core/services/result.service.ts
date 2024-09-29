import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from "../models/Result";
import { formatDate } from "@angular/common";
import { LikesDislikesDTO } from "../models/LikesDislikesDTO";
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private baseUrl = 'http://localhost:8085/results';

  constructor(private http: HttpClient, private onlineOfflineService: OnlineOfflineService) {}

  getAllResults(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.baseUrl}/getAll`);
  }

  updateResult(resultId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${resultId}/update`, {});
  }

  getResultByperf(id: number): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}/byPerformance/${id}`);
  }

  getLikesAndDislikesById(id: number): Observable<LikesDislikesDTO> {
    return this.http.get<LikesDislikesDTO>(`${this.baseUrl}/likes-dislikes/${id}`);
  }

  likeResult(resultId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/like/${resultId}`, {});
  }

  dislikeResult(resultId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/dislike/${resultId}`, {});
  }

  getResultById(id: number): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}/getby/${id}`);
  }

  saveOrUpdateResult(result: Result): Observable<Result> {
    return this.http.post<Result>(this.baseUrl, result);
  }

  deleteResult(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }

  getResultsBetweenDates(startDate: Date, endDate: Date): Observable<Result[]> {
    const startParam = formatDate(startDate, 'yyyy-MM-dd', 'en');
    const endParam = formatDate(endDate, 'yyyy-MM-dd', 'en');
    return this.http.get<Result[]>(`${this.baseUrl}/between?start=${startParam}&end=${endParam}`);
  }

  getVoteStatistics(resultId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${resultId}/statistics`);
  }

}
