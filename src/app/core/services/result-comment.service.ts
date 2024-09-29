import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ResultComment} from "../models/ResultComment";

@Injectable({
  providedIn: 'root'
})
export class ResultCommentService {
  private baseUrl = 'http://localhost:8085/result-comments'; // À adapter en fonction de votre URL d'API

  constructor(private http: HttpClient) { }

  getAllResultComments(): Observable<ResultComment[]> {
    return this.http.get<ResultComment[]>(`${this.baseUrl}/AllRc`)

  }

  // Récupérer un commentaire de résultat par ID
  getResultCommentById(id: number): Observable<ResultComment | undefined> {
    return this.http.get<ResultComment | undefined >(`${this.baseUrl}/getRbyC/${id}`)

  }

  addCommentToResult(resultId: number, userId: number, comment: ResultComment): Observable<ResultComment> {
    return this.http.post<ResultComment>(`${this.baseUrl}/AddCommenttoR/${resultId}/${userId}`, comment);
  }


  // Mettre à jour un commentaire de résultat
  updateResultComment(id: number, comment: ResultComment): Observable<ResultComment> {
    return this.http.put<ResultComment>(`${this.baseUrl}/update/${id}`, comment)

  }

  // Supprimer un commentaire de résultat
  deleteResultComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteCR/${id}`)

  }
}
