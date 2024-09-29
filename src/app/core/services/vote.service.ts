import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from "../models/Vote";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private baseUrl = 'http://localhost:8085/votes';

  constructor(private http: HttpClient) {}

  addVote(performanceId: number |undefined,  userId: number, vote: Vote): Observable<Vote> {
    return this.http.post<Vote>(`${this.baseUrl}/AddV/${performanceId}/${userId}`, vote);
  }
  getAllVotesByUser(userId: number): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.baseUrl}/user/${userId}`);
  }
  getAllVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.baseUrl}/getAll`);
  }
  getVotesByPerformance(performanceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/votes/calendrier/${performanceId}`);
  }
  getVoteById(id: number): Observable<Vote> {
    return this.http.get<Vote>(`${this.baseUrl}/${id}`);
  }


  getVoteStatistics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/statistics`);
  }
  deleteVote(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

}

/*


  constructor(private http: HttpClient, private onlineOfflineService: OnlineOfflineService) {}

  addVote(performanceId: number | undefined, userId: number, vote: Vote): Observable<Vote> {
    return this.onlineOfflineService.checkServerOnline().pipe(
      switchMap(online => {
        if (online) {
          return this.http.post<Vote>(`${this.baseUrl}/AddV/${performanceId}/${userId}`, vote);
        } else {
          return throwError('Server is offline');
        }
      })
    );
  }

  getAllVotesByUser(userId: number): Observable<Vote[]> {
    return this.onlineOfflineService.checkServerOnline().pipe(
      switchMap(online => {
        if (online) {
          return this.http.get<Vote[]>(`${this.baseUrl}/user/${userId}`);
        } else {
          return throwError('Server is offline');
        }
      })
    );
  }

  getAllVotes(): Observable<Vote[]> {
    return this.onlineOfflineService.checkServerOnline().pipe(
      switchMap(online => {
        if (online) {
          return this.http.get<Vote[]>(`${this.baseUrl}/getAll`);
        } else {
          return throwError('Server is offline');
        }
      })
    );
  }

  getVotesByPerformance(performanceId: number): Observable<any[]> {
    return this.onlineOfflineService.checkServerOnline().pipe(
      switchMap(online => {
        if (online) {
          return this.http.get<any[]>(`${this.baseUrl}/votes/calendrier/${performanceId}`);
        } else {
          return throwError('Server is offline');
        }
      })
    );
  }

  getVoteById(id: number): Observable<Vote> {
    return this.onlineOfflineService.checkServerOnline().pipe(
      switchMap(online => {
        if (online) {
          return this.http.get<Vote>(`${this.baseUrl}/${id}`);
        } else {
          return throwError('Server is offline');
        }
      })
    );
  }

  getVoteStatistics(): Observable<any> {
    return this.onlineOfflineService.checkServerOnline().pipe(
      switchMap(online => {
        if (online) {
          return this.http.get(`${this.baseUrl}/statistics`);
        } else {
          return throwError('Server is offline');
        }
      })
    );
  }

  deleteVote(id: number): Observable<any> {
    return this.onlineOfflineService.checkServerOnline().pipe(
      switchMap(online => {
        if (online) {
          return this.http.delete(`${this.baseUrl}/delete/${id}`);
        } else {
          return throwError('Server is offline');
        }
      })
    );
  }
}
*/
