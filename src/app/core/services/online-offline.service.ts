// online-offline.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {
  private online: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.online = new BehaviorSubject<boolean>(navigator.onLine);

    // Ajoute des écouteurs d'événements pour détecter les changements d'état en ligne/hors ligne
    window.addEventListener('online', () => this.setOnline());
    window.addEventListener('offline', () => this.setOffline());
  }

  // Méthode pour récupérer l'état en ligne/hors ligne actuel sous forme d'observable
  getOnlineStatus(): Observable<boolean> {
    return this.online.asObservable();
  }

  // Méthode privée pour mettre à jour l'état en ligne
  private setOnline(): void {
    this.online.next(true);
  }

  // Méthode privée pour mettre à jour l'état hors ligne
  private setOffline(): void {
    this.online.next(false);
  }


  checkServerOnline(): Observable<boolean> {
    return this.http.get('http://localhost:8085/auth/login').pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
