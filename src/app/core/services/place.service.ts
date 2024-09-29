import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Place } from '../models/Place.model';
import { SeatNumbersByRow } from '../models/seat-numbers-by-row';
import { PlaceStatistics } from '../models/PlaceStatistics.model';
import { SeatStatusDTO } from '../models/SeatStatusDTO';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private baseUrl = 'http://localhost:8085/Places'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.baseUrl}/GetAllPlaces`);
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.baseUrl}/GetPlaces/${id}`);
  }

  addPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(`${this.baseUrl}/AddPlace`, place);
  }

  modifyPlace(place: Place): Observable<Place> {
    // Assurez-vous que 'idPlace' est défini pour 'place'
    if (!place.idPlace) {
      throw new Error('Place id is required to update the place.');
    }

    return this.http.put<Place>(`${this.baseUrl}/updatePlace/${place.idPlace}`, place);
  }
  getPlaceBySeatAndRow(seatNumber: string, row: string, venuePlanId: number): Observable<Place> {
    // Assurez-vous que l'URL correspond à votre endpoint backend
    return this.http.get<Place>(`${this.baseUrl}/findPlace?seatNumber=${seatNumber}&row=${row}&venuePlanId=${venuePlanId}`);
  }
  deletePlace(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeletPlaces/${id}`);
  }
  getSeatsByRow(): Observable<Map<string, Place[]>> {
    return this.http.get<Place[]>(`${this.baseUrl}/GetAllPlaces`).pipe(
      map(places => {
        const rowsMap = new Map<string, Place[]>();
        places.forEach(place => {
          const row = place.row || '';
          if (!rowsMap.has(row)) {
            rowsMap.set(row, []);
          }
          rowsMap.get(row)!.push(place);
        });
  
        // Sorting by row first, then by seat number
        rowsMap.forEach((places, row) => {
          places.sort((a, b) => {
            if (a.seatNumber && b.seatNumber) {
              const seatNumberA = parseFloat(a.seatNumber);
              const seatNumberB = parseFloat(b.seatNumber);
              if (!isNaN(seatNumberA) && !isNaN(seatNumberB)) {
                return seatNumberA - seatNumberB;
              }
            }
            return 0;
          });
        
        });
  
        return rowsMap;
      }),
      catchError(error => {
        console.error('Error fetching seats:', error);
        throw error;
      })
    );
  }
  getSeatNumbersByRow(planId: number): Observable<SeatNumbersByRow> {
    return this.http.get<SeatNumbersByRow>(`${this.baseUrl}/seatNumbers/${planId}`);
  }

  


  confirmPlaces(venuePlanId: number,userid:number,ids: number[]): Observable<Place[]> {
    return this.http.put<Place[]>(`${this.baseUrl}/confirmPlaces/${userid}?venuePlanId=${venuePlanId}`, ids);
  }


  
  
  
  
  togglePlaceSelection(place: Place): Observable<Place> {
    // Assurez-vous que 'idPlace' est défini pour 'place'
    if (!place.idPlace) {
      throw new Error('Place id is required to update the place.');
    }

    return this.http.put<Place>(`${this.baseUrl}/togglePlaceSelection/${place.idPlace}`, place);
  }

  getSeatStatuses(venuePlanId: number): Observable<SeatStatusDTO[]> {
    return this.http.get<SeatStatusDTO[]>(`${this.baseUrl}/statistics/${venuePlanId}`);
  }
}
