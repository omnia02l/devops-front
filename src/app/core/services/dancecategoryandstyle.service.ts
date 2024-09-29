import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dancestyle } from '../models/Dancestyle';
import { Dancecategory } from '../models/Dancecategory';

@Injectable({
  providedIn: 'root'
})
export class DancecategoryandstyleService {
  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) { }

 getAllDancecategories(): Observable<Dancecategory[]> {
    return this.http.get<Dancecategory[]>(`${this.apiUrl}/dancecateg/retrieve_all_categs`);
  }

  addDanceCategory(dancecategory: Dancecategory): Observable<Dancecategory> {
    return this.http.post<Dancecategory>(`${this.apiUrl}/dancecateg/add_categ`, dancecategory);
  }

  updateDancecategory(id: number, dancecategory: Dancecategory): Observable<Dancecategory> {
    return this.http.put<Dancecategory>(`${this.apiUrl}/dancecateg/update_categ/${id}`, dancecategory);
  }

  getDancecategory(id: number): Observable<Dancecategory> {
    return this.http.get<Dancecategory>(`${this.apiUrl}/dancecateg/retrieve_categ/${id}`);
  }

  deleteDancecategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/dancecateg/remove_categ/${id}`);
  }



  addDanceStyleToCategory(id: number, dancestyle: Dancestyle): Observable<Dancecategory> {
    return this.http.put<Dancecategory>(`${this.apiUrl}/dancecateg/dancecategories/${id}/dancestyles`, dancestyle);
  }
  removeDanceStyleFromCategory(categoryId: number, styleId: number): Observable<Dancecategory> {
    return this.http.delete<Dancecategory>(`${this.apiUrl}/dancecateg/${categoryId}/styles/${styleId}`);
  }
  getStylesByCategoryId(categoryId: number): Observable<Dancestyle[]> {
    return this.http.get<Dancestyle[]>(`${this.apiUrl}/dancestyle/dancestyles/category/${categoryId}`);
  }

  getAllDanceStyle(): Observable<Dancestyle[]> {
    return this.http.get<Dancestyle[]>(`${this.apiUrl}/dancestyle/retrieve_all_styles`);
  }

  getDistinctStyledNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/dancestyle/distinctStyledNames`);
  }














}
